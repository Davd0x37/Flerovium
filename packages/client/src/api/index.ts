import { DataPath, Service } from '@/store/modules/services/types';
import {
	AuthParameters,
	AuthURIGen,
	POST,
	ResponseTypeEnum,
	TokenParameters,
} from '@/types';
import {
	generateAuthenticationURI,
	generateCodeChallenge,
	generateCodeVerifier,
} from './auth';
import { selectData, sendForm, sendGet } from './request';

export const $api = {
	async authenticate(
		parameters: Pick<
			AuthParameters,
			'authorizationUri' | 'clientId' | 'scope' | 'redirectUri'
		>,
	): Promise<AuthURIGen> {
		const { authorizationUri, clientId, scope, redirectUri } = parameters;

		const codeVerifier = generateCodeVerifier();
		const codeChallenge = await generateCodeChallenge(codeVerifier);
		const authenticationUri = generateAuthenticationURI(authorizationUri, {
			client_id: clientId,
			scope,
			redirect_uri: redirectUri,
			code_challenge: codeChallenge,
			code_challenge_method: 'S256',
			response_type: ResponseTypeEnum.CODE,
			// @TODO: Add state parameter
			// state
		});

		return {
			codeVerifier,
			codeChallenge,
			authorizationUri: authenticationUri,
		};
	},

	async requestTokens(
		endpoint: string,
		parameters: POST,
	): Promise<TokenParameters & Pick<AuthParameters, 'scope'>> {
		try {
			const receivedTokens = await sendForm(endpoint, parameters);

			const receivedTokensTime = Date.now();

			return {
				accessToken: receivedTokens.access_token,
				tokenType: receivedTokens.token_type,
				scope: receivedTokens.scope,
				expiresIn: receivedTokens.expires_in,
				refreshToken: receivedTokens.refresh_token,
				receivedTokensTime,
			};
		} catch (error) {
			throw new Error(error);
		}
	},

	async requestData(service: Service): Promise<any> {
		try {
			const {
				auth: { tokens },
				dataPaths,
			} = service;

			if (!Array.isArray(dataPaths)) {
				throw new Error('Data paths must be array');
			}

			// @FIXME: don't use ! - fix this
			const accessToken = tokens.accessToken!;
			const tokenType = tokens.tokenType!;

			const temp: any = [];

			const run = async (path: DataPath) => {
				const obj = await sendGet(path.path, {
					accessToken,
					tokenType,
				});

				const data = await selectData(obj, path.select);

				return data;
			};

			dataPaths.forEach((path: DataPath) => {
				temp.push(run(path));
			});

			const dataArrays = await Promise.all(temp);
			const concat = dataArrays.reduce(
				(acc: any[], curr: any) => [...acc, ...curr],
				[],
			);

			return concat;
		} catch (error) {
			throw new Error(error);
		}
	},
};
