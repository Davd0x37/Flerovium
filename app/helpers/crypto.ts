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

import { Buffer } from 'buffer';
import { getRandomValues } from './random';
import { IV_LEN } from '@/common/constants';

/**
 * Get CryptoKey from password string
 *
 * @param {string} key MasterPassword
 * @return {*}  {Promise<CryptoKey>}
 */
export const importKey = (key: string): Promise<CryptoKey> => {
  const baseKey: Uint8Array = Buffer.from(key);
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
): Promise<CryptoKey> =>
  window.crypto.subtle.deriveKey(
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
      length: 256,
    },
    false,
    ['encrypt', 'decrypt'],
  );

/**
 * Encrypt content
 *
 * @export
 * @param {Uint8Array} content Everything can be passed, just convert it to Uint8Array
 * @param {string} password
 * @return {*}  {Promise<Uint8Array>} Encrypted content
 */
export async function encrypt(
  content: Uint8Array,
  password: string,
): Promise<Uint8Array> {
  // Generate IV and salt
  const iv = getRandomValues(IV_LEN);
  const salt = getRandomValues(IV_LEN);

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
    content,
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
 * @return {*}  {Promise<Uint8Array>} Decrypted content
 */
export async function decrypt(
  encrypted: Uint8Array,
  password: string,
): Promise<Uint8Array> {
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

  return decrypted;
}
