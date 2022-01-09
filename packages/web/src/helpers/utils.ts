export const isBrowser = typeof window !== 'undefined';
export const isNode = typeof process === 'object';

export const GET_REDIRECT_URI = (name: string): string => `${window.location.origin}/authorize/${name}`;

// export const createBasicToken = (clientId: string, clientSecret: string) => {
// 	const concatenatedToken = `${clientId}:${clientSecret}`;

// 	if (isNode) {
// 		return `Basic ${Buffer.from(concatenatedToken).toString('base64')}`;
// 	}

// 	const token = btoa(concatenatedToken);
// 	return `Basic ${token}`;
// };

export function copyObject<T>(obj: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return JSON.parse(JSON.stringify(obj));
}

const timerAsync = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const sleep = async (time: number): Promise<void> => {
  await timerAsync(time);
};

export const dateExpired = (previousDate: Date, expiresIn: number): boolean => {
  const now: Date = new Date();
  const prev: Date = previousDate;
  prev.setSeconds(expiresIn);
  return prev.getTime() - now.getTime() <= 0;
};

export const toHex = (buffer: Uint8Array): string =>
  buffer.reduce((mem, val) => mem + `00${val.toString(16)}`.slice(-2), '');

export const base64urlencode = (input: ArrayBuffer): string =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(input) as any))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
// Buffer.from(input).toString('base64url');
