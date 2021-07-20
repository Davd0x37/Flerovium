import { Service } from '@/store/modules/services/types';
import { $tc } from '@/plugins/i18n';
import { $notification } from '@/services';
import store from '@/store';
import { ACTIONS } from '@/store/names';
import { GrantTypeEnum } from '@/types';
import { GET_REDIRECT_URI, isTokenExpired } from '@/common/helpers';
import { $api } from './index';

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
