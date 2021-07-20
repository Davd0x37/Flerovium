/**
 * 1. Import key from raw input (Uint - TextEncoder and encode string into array).
 *    Hash raw input using PBKDF2
 *    Converts Uint array to CryptoKey object.
 * 2. Derive key from CryptoKey object containing imported key.
 * From MozillaDeveloper
 * ```
 *    baseKey is a CryptoKey representing the input to the derivation algorithm.
 *    If algorithm is ECDH, then this will be the ECDH private key.
 *    Otherwise it will be the initial key material for the derivation function:
 *    for example, for PBKDF2 it might be a password, imported as
 *    a CryptoKey using SubtleCrypto.importKey().
 * ```
 * 3. Encrypt
 */

import {
	str2ab,
	ab2str,
	getRandomValues,
	importKey,
	deriveKey,
} from './helpers';
import { IV_LEN } from './consts';

/**
 * Encrypt content
 * @TODO: Maybe change `content` string type to typed array?
 *
 * @export
 * @param {string} content Everything can be passed, just convert it to string
 * @param {string} password
 * @return {*}  {Promise<Uint8Array>} Encrypted content
 */
export async function encrypt(
	content: string,
	password: string,
): Promise<Uint8Array> {
	// Generate IV and salt
	const iv = getRandomValues(IV_LEN);
	const salt = getRandomValues(IV_LEN);

	// Convert content to Uint8Array
	const data = str2ab(content);

	// Get CryptoKey from password
	const importedKey = await importKey(password);
	// Generate secret key from imported key
	const derivedKey = await deriveKey(importedKey, salt);
	// Returns ArrayBuffer
	const arrayBuffer = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		derivedKey,
		data,
	);

	// Convert arraybuffer to Uint8Array
	const encrypted = new Uint8Array(arrayBuffer);
	const abIVData = new Uint8Array(
		new ArrayBuffer(IV_LEN * 2 + encrypted.length),
	);
	abIVData.set(iv);
	abIVData.set(salt, IV_LEN);
	abIVData.set(encrypted, IV_LEN * 2);
	return abIVData;
}

/**
 * Decrypt content using master password
 *
 * @export
 * @param {Uint8Array} encrypted Encrypted content, saved in Uint8Array
 * @param {string} password
 * @return {*}  {Promise<string>} Decrypted content
 */
export async function decrypt(
	encrypted: Uint8Array,
	password: string,
): Promise<string> {
	const [iv, salt, data] = [
		encrypted.slice(0, IV_LEN),
		encrypted.slice(IV_LEN, IV_LEN * 2),
		encrypted.slice(IV_LEN * 2),
	];
	const importedKey = await importKey(password);
	const derivedKey = await deriveKey(importedKey, salt);
	const arrayBuffer = await window.crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		derivedKey,
		data,
	);

	const decrypted = new Uint8Array(arrayBuffer);

	return ab2str(decrypted);
}
