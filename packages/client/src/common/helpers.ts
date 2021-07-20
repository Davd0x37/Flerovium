import { APP_URL } from './constants';

export const isBrowser = typeof window !== 'undefined';
export const isNode = typeof process === 'object';

export const GET_REDIRECT_URI = (name: string) =>
	`${APP_URL}/authorize/${name}`;

// export const createBasicToken = (clientId: string, clientSecret: string) => {
// 	const concatenatedToken = `${clientId}:${clientSecret}`;

// 	if (isNode) {
// 		return `Basic ${Buffer.from(concatenatedToken).toString('base64')}`;
// 	}

// 	const token = btoa(concatenatedToken);
// 	return `Basic ${token}`;
// };

export const isTokenExpired = (
	previousDate: Date,
	expiresIn: number,
): boolean => {
	const now: Date = new Date();
	const prev: Date = previousDate;
	prev.setSeconds(expiresIn);
	return prev.getTime() - now.getTime() <= 0;
};
