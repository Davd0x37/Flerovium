import { Buffer } from 'buffer';
import { Service } from '@/store/modules/services/types';
import { $tc } from '@/plugins/i18n';
import { $notification } from '@/services';
import store from '@/store';
import { ACTIONS } from '@/store/names';
import { GrantTypeEnum, URLDownload } from '@/types';
import { GET_REDIRECT_URI, isTokenExpired } from '@/common/helpers';
import { RootState } from '@/store/types';
import { web } from '@flerovium/shared';
import { $api } from './index';
import { generateDownloadUrl } from './fs';

function tokensExpired(receivedTokensTime: string, expiresIn: string) {
	if (receivedTokensTime) {
		const rTT = new Date(receivedTokensTime);
		const expiresInNum = Number(expiresIn);
		return isTokenExpired(rTT, expiresInNum);
	}

	return false;
}

function hasTokens(tokens: Service['auth']['tokens']) {
	let has = false;
	has = tokens.accessToken !== null;
	has = tokens.tokenType !== null;
	has = tokens.expiresIn !== null;
	has = tokens.refreshToken !== null;
	has = tokens.receivedTokensTime !== null;

	return has;
}

// @TODO: Maybe move this to $api?

export async function runAuthenticateService(service: Service) {
	try {
		const {
			name,
			auth: { credentials },
		} = service;

		const redirectUri = GET_REDIRECT_URI(name);

		const { codeVerifier, codeChallenge, authorizationUri } =
			await $api.authenticate({
				authorizationUri: credentials.authorizationUri,
				clientId: credentials.clientId,
				scope: credentials.scope,
				redirectUri,
			});

		await store.dispatch(ACTIONS.UPDATE_TOKENS, {
			serviceName: name,
			tokens: {
				codeVerifier,
				codeChallenge,
			},
		});

		window.location.replace(authorizationUri);
	} catch (error) {
		$notification.show({
			mode: 'error',
			title: $tc('popup.authenticateUri.title'),
			message: $tc('popup.authenticateUri.errorNamed', { name: service.name }),
		});
	}
}
export async function runRequestTokens(service: Service) {
	try {
		if (!hasTokens(service.auth.tokens)) {
			throw new Error("Couldn't find tokens!");
		}

		const {
			name,
			auth: { tokens, credentials, hasRequestedTokens },
		} = service;

		const { refreshToken, code, codeVerifier } = tokens;

		const exists =
			hasRequestedTokens &&
			tokensExpired(tokens.receivedTokensTime!, tokens.expiresIn!);
		const redirectUri = GET_REDIRECT_URI(name);

		const params: {} = exists
			? {
					client_id: credentials.clientId,
					redirect_uri: redirectUri,
					grant_type: GrantTypeEnum.REFRESH_TOKEN,
					refresh_token: refreshToken!,
			  }
			: {
					client_id: credentials.clientId,
					redirect_uri: redirectUri,
					code: code!,
					code_verifier: codeVerifier,
					grant_type: GrantTypeEnum.AUTHORIZATION,
			  };

		const req = await $api.requestTokens(credentials.tokenEndpointUri, params);

		$notification.show({
			mode: 'success',
			title: $tc('popup.requestTokens.title'),
			message: $tc('popup.requestTokens.success'),
		});

		await store.dispatch(ACTIONS.UPDATE_TOKENS, {
			serviceName: name,
			tokens: {
				codeVerifier: null,
				codeChallenge: null,
				code: null,
				...req,
			},
		});

		await store.dispatch(ACTIONS.TOGGLE_REQUESTED_TOKENS, name);
	} catch (error) {
		$notification.show({
			mode: 'error',
			title: $tc('popup.requestTokens.title'),
			message: $tc('popup.requestTokens.errorNamed', { name: service.name }),
		});
	}
}

export async function runRequestData(service: Service) {
	try {
		const {
			name,
			auth: { hasRequestedTokens, tokens },
		} = service;
		if (!hasRequestedTokens) {
			$notification.show({
				mode: 'warning',
				title: $tc('popup.findTokens.title'),
				message: $tc('popup.findTokens.errorNamed', { name: service.name }),
			});

			return;
		}

		if (tokensExpired(tokens.receivedTokensTime!, tokens.expiresIn!)) {
			await runRequestTokens(service);
		}

		const data = await $api.requestData(service);

		$notification.show({
			mode: 'success',
			title: $tc('popup.receivedData.title'),
			message: $tc('popup.receivedData.success'),
		});

		await store.dispatch(ACTIONS.UPDATE_SERVICE, {
			name,
			data,
		});
	} catch (error) {
		$notification.show({
			mode: 'error',
			title: $tc('popup.receivedData.title'),
			message: $tc('popup.receivedData.errorNamed', { name: service.name }),
		});
	}
}

export const downloadVault = async (vault: RootState): Promise<URLDownload> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { isAuthenticated, ...rest } = vault;

		// First step: convert object to JSON and save it as Buffer/UInt8Array
		// We use Buffer because converting JSONObject to utf-8 using TextEncoder is bad
		// Values above 128 and below 255 creates additional random values
		// which leads to data corruption and in return we get not exact data we didn't saved
		const restAB = Buffer.from(JSON.stringify(rest));
		// Second step: encrypt converted buffer
		const restABEncrypted = await web.encrypt(
			restAB,
			rest.encryption.passwordHash,
		);
		// Third step: convert arraybuffer to hex
		const restAsHex = Buffer.from(restABEncrypted).toString('hex');

		// Fourth step: salt doesn't have to be secret, so it doesn't need to be encrypted
		// We need salt to generate a new hash used to decrypt the vault
		const contentRaw = {
			encryption: {
				salt: rest.encryption.salt,
			},
			data: restAsHex,
		};

		// Fifth step: save configuration and encrypted data in buffer then convert it to hex
		const encryptedContent = Buffer.from(JSON.stringify(contentRaw)).toString(
			'hex',
		);

		// Finally, generate a download url from our encrypted data
		const url = generateDownloadUrl(encryptedContent);

		return {
			name: vault.name,
			url,
		};
	} catch (error) {
		throw new Error(error);
	}
};

export const openVault = async (
	payload: string,
	rawPassword: string,
): Promise<RootState> => {
	try {
		// These steps are complicated
		// 1: Convert saved vault as hex to utf-8
		const encryptedStringified = Buffer.from(payload, 'hex').toString('utf-8');
		// 2: Configuration and encrypted data must be parsed as JSON
		const encryptedParsed = JSON.parse(encryptedStringified);
		// 3: We get the encryption configuration and our encrypted data
		const { encryption, data } = encryptedParsed;

		// 4: Create new hash using raw password and old salt
		const passwordHash = await web.functions.Argon2.hash(
			rawPassword,
			encryption.salt,
		);

		// 5: Convert encrypted data from hex to UInt8Array
		const dataFromHex = Buffer.from(data, 'hex');
		// 6: Decrypt with newly generated hash
		const decryptedAB = await web.decrypt(dataFromHex, passwordHash?.encoded!);
		// 7: Convert from UInt8Array to utf-8
		const decrypted = Buffer.from(decryptedAB).toString('utf-8');

		// Finally, we can parse decrypted data as its format is known
		const vault: RootState = JSON.parse(decrypted);

		return vault;
	} catch (error) {
		throw new Error(error);
	}
};
