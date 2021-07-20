import { web } from '@flerovium/shared';
import qs from 'qs';

export const generateAuthenticationURI = (
	authorizeUri: string,
	parameters: {},
) => {
	const queryString = qs.stringify(parameters);

	return `${authorizeUri}?${queryString}`;
};

export const generateCodeVerifier = (min: number = 43, max: number = 128) => {
	const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
	const array = web.generateRandomString(randomLength);

	return array;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
	const hash = await web.functions.SHA.hash(codeVerifier);
	const encoded = web.base64urlencode(hash);

	return encoded;
};
