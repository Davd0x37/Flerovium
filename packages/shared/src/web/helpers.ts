/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
/* eslint-disable arrow-body-style */

/**
 * Get random values with specified length
 *
 * @param {number} length
 * @return {*}  {Uint8Array}
 */
export const getRandomValues = (length: number): Uint8Array => {
	const arr = new Uint8Array(length);
	return window.crypto.getRandomValues(arr);
};

export const toHex = (buffer: Uint8Array): string => {
	return buffer.reduce(
		(mem, val) => mem + ('00' + val.toString(16)).slice(-2),
		'',
	);
};

export const generateRandomString = (length: number) => {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

// https://stackoverflow.com/questions/59911194/how-to-calculate-pckes-code-verifier/59913241#59913241
export const base64urlencode = (a: ArrayBuffer) => {
	// Convert the ArrayBuffer to string using Uint8 array.
	// btoa takes chars from 0-255 and base64 encodes.
	// Then convert the base64 encoded to base64url encoded.
	// (replace + with -, replace / with _, trim trailing =)
	return btoa(String.fromCharCode.apply(null, new Uint8Array(a) as any))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
};

// https://example-app.com/pkce
// https://auth0.com/docs/flows/call-your-api-using-the-authorization-code-flow-with-pkce#javascript-sample
export const base64url = (buffer: ArrayBuffer): string => {
	let str = '';
	const newBuffer = new Uint8Array(buffer);
	const len = newBuffer.byteLength;

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < len; i++) {
		str += String.fromCharCode(newBuffer[i]);
	}

	// https://datatracker.ietf.org/doc/html/rfc4648#section-3.4
	return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// // eslint-disable-next-line @typescript-eslint/naming-convention
// const LUT_HEX_4b = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
// // eslint-disable-next-line @typescript-eslint/naming-convention
// const LUT_HEX_8b = new Array(0x100);
// // eslint-disable-next-line no-plusplus
// for (let n = 0; n < 0x100; n++) {
//   LUT_HEX_8b[n] = `${LUT_HEX_4b[(n >>> 4) & 0xF]}${LUT_HEX_4b[n & 0xF]}`;
// }

// // End Pre-Init
// export const toHex = (buffer: Uint8Array) => {
//   let out = '';
//   // eslint-disable-next-line no-plusplus
//   for (let idx = 0, edx = buffer.length; idx < edx; idx++) {
//     out += LUT_HEX_8b[buffer[idx]];
//   }
//   return out;
// }

/**
 * Return string input as ArrayBuffer
 *
 * @param {string} str String to encode
 * @return {*}  {ArrayBuffer} Encoded string
 */
export const str2ab = (str: string): ArrayBuffer => {
	return new TextEncoder().encode(str);
};

/**
 * Decode ArrayBuffer as string
 *
 * @param {ArrayBuffer} ab
 * @return {*}  {string} Decoded array
 */
export const ab2str = (ab: ArrayBuffer): string => {
	return new TextDecoder('utf-8').decode(ab);
};

/**
 * Get CryptoKey from password string
 *
 * @param {string} key MasterPassword
 * @return {*}  {Promise<CryptoKey>}
 */
export const importKey = (key: string): Promise<CryptoKey> => {
	const baseKey = str2ab(key);
	return window.crypto.subtle.importKey('raw', baseKey, 'PBKDF2', false, [
		'deriveKey',
	]);
};

/**
 * Get secret key from master key
 *
 * @param {CryptoKey} key CryptoKey obtained from importKey function
 * @param {Uint8Array} salt
 * @return {*}  {Promise<CryptoKey>}
 */
export const deriveKey = (
	key: CryptoKey,
	salt: Uint8Array,
): Promise<CryptoKey> => {
	return window.crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 10000,
			hash: {
				name: 'SHA-512',
			},
		},
		key,
		{
			name: 'AES-GCM',
			length: 128,
		},
		true,
		['encrypt', 'decrypt'],
	);
};
