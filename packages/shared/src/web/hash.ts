// @ts-ignore
// eslint-disable-next-line import/extensions
import argon2browser from 'argon2-browser/dist/argon2-bundled.min.js';
import { IV_LEN } from './consts';
import { getRandomValues, str2ab } from './helpers';

export interface Argon2HashResult {
	hash: Uint8Array;
	hashHex: string;
	encoded: string;
}

export const functions = {
	SHA: {
		/**
		 * Hash input using (default) SHA-256
		 *
		 * @param {(string | ArrayBuffer)} input
		 * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} [algorithm='SHA-256']
		 * @return {*}  {Promise<ArrayBuffer>}
		 */
		async hash(
			input: string | ArrayBuffer,
			algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256',
		): Promise<ArrayBuffer> {
			if (typeof input === 'string') {
				const arrayBuffer = str2ab(input);
				return window.crypto.subtle.digest(algorithm, arrayBuffer);
			}

			return window.crypto.subtle.digest(algorithm, input);
		},
	},
	SHA256: {
		async hash(input: string | ArrayBuffer): Promise<ArrayBuffer> {
			return functions.SHA.hash(input, 'SHA-256');
		},
	},
	SHA384: {
		async hash(input: string | ArrayBuffer): Promise<ArrayBuffer> {
			return functions.SHA.hash(input, 'SHA-384');
		},
	},
	SHA512: {
		async hash(input: string | ArrayBuffer): Promise<ArrayBuffer> {
			return functions.SHA.hash(input, 'SHA-512');
		},
	},
	Argon2: {
		/**
		 * Hash input and return
		 *
		 * @export
		 * @param {string} input
		 * @return {*}  {(Promise<Argon2HashResult | null>)}
		 */
		async hash(input: string): Promise<Argon2HashResult | null> {
			try {
				const salt = getRandomValues(IV_LEN);
				const req = await argon2browser.hash({
					pass: input,
					salt,
					time: 3, // Number of iterations
					mem: 14777, // In KiB
					type: argon2browser.ArgonType.Argon2id,
				});

				return {
					hash: req.hash,
					hashHex: req.hashHex,
					encoded: req.encoded,
				};
			} catch (error) {
				console.error(
					`[CRYPTO_HASH] Hashing error #${error.code}: ${error.message}`,
				);

				return null;
			}
		},

		/**
		 * Compare input with encoded hash
		 *
		 * @export
		 * @param {string} input
		 * @param {(string | Uint8Array)} encodedHash
		 * @return {*}  {(Promise<boolean | null>)}
		 */
		async verify(
			input: string,
			encodedHash: string | Uint8Array,
		): Promise<boolean | null> {
			try {
				const req = await argon2browser.verify({
					pass: input,
					encoded: encodedHash,
					type: argon2browser.ArgonType.Argon2id,
				});

				return !!req;
			} catch (error) {
				console.error(
					`[CRYPTO_HASH] Hash verifying error #${error.code}: ${error.message}`,
				);

				return null;
			}
		},
	},
};
