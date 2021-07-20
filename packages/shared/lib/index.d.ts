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
/**
 * Encrypt content
 * @TODO: Maybe change `content` string type to typed array?
 *
 * @export
 * @param {string} content Everything can be passed, just convert it to string
 * @param {string} password
 * @return {*}  {Promise<Uint8Array>} Encrypted content
 */
declare function encrypt(content: string, password: string): Promise<Uint8Array>;
/**
 * Decrypt content using master password
 *
 * @export
 * @param {Uint8Array} encrypted Encrypted content, saved in Uint8Array
 * @param {string} password
 * @return {*}  {Promise<string>} Decrypted content
 */
declare function decrypt(encrypted: Uint8Array, password: string): Promise<string>;

/**
 * Initialization vector length
 */
declare const IV_LEN = 16;

/**
 * Get random values with specified length
 *
 * @param {number} length
 * @return {*}  {Uint8Array}
 */
declare const getRandomValues: (length: number) => Uint8Array;
declare const toHex: (buffer: Uint8Array) => string;
declare const generateRandomString: (length: number) => string;
declare const base64urlencode: (a: ArrayBuffer) => string;
declare const base64url: (buffer: ArrayBuffer) => string;
/**
 * Return string input as ArrayBuffer
 *
 * @param {string} str String to encode
 * @return {*}  {ArrayBuffer} Encoded string
 */
declare const str2ab: (str: string) => ArrayBuffer;
/**
 * Decode ArrayBuffer as string
 *
 * @param {ArrayBuffer} ab
 * @return {*}  {string} Decoded array
 */
declare const ab2str: (ab: ArrayBuffer) => string;
/**
 * Get CryptoKey from password string
 *
 * @param {string} key MasterPassword
 * @return {*}  {Promise<CryptoKey>}
 */
declare const importKey: (key: string) => Promise<CryptoKey>;
/**
 * Get secret key from master key
 *
 * @param {CryptoKey} key CryptoKey obtained from importKey function
 * @param {Uint8Array} salt
 * @return {*}  {Promise<CryptoKey>}
 */
declare const deriveKey: (key: CryptoKey, salt: Uint8Array) => Promise<CryptoKey>;

interface Argon2HashResult {
    hash: Uint8Array;
    hashHex: string;
    encoded: string;
}
declare const functions: {
    SHA: {
        /**
         * Hash input using (default) SHA-256
         *
         * @param {(string | ArrayBuffer)} input
         * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} [algorithm='SHA-256']
         * @return {*}  {Promise<ArrayBuffer>}
         */
        hash(input: string | ArrayBuffer, algorithm?: 'SHA-256' | 'SHA-384' | 'SHA-512'): Promise<ArrayBuffer>;
    };
    SHA256: {
        hash(input: string | ArrayBuffer): Promise<ArrayBuffer>;
    };
    SHA384: {
        hash(input: string | ArrayBuffer): Promise<ArrayBuffer>;
    };
    SHA512: {
        hash(input: string | ArrayBuffer): Promise<ArrayBuffer>;
    };
    Argon2: {
        /**
         * Hash input and return
         *
         * @export
         * @param {string} input
         * @return {*}  {(Promise<Argon2HashResult | null>)}
         */
        hash(input: string): Promise<Argon2HashResult | null>;
        /**
         * Compare input with encoded hash
         *
         * @export
         * @param {string} input
         * @param {(string | Uint8Array)} encodedHash
         * @return {*}  {(Promise<boolean | null>)}
         */
        verify(input: string, encodedHash: string | Uint8Array): Promise<boolean | null>;
    };
};

declare const index_encrypt: typeof encrypt;
declare const index_decrypt: typeof decrypt;
declare const index_IV_LEN: typeof IV_LEN;
declare const index_getRandomValues: typeof getRandomValues;
declare const index_toHex: typeof toHex;
declare const index_generateRandomString: typeof generateRandomString;
declare const index_base64urlencode: typeof base64urlencode;
declare const index_base64url: typeof base64url;
declare const index_str2ab: typeof str2ab;
declare const index_ab2str: typeof ab2str;
declare const index_importKey: typeof importKey;
declare const index_deriveKey: typeof deriveKey;
type index_Argon2HashResult = Argon2HashResult;
declare const index_functions: typeof functions;
declare namespace index {
  export {
    index_encrypt as encrypt,
    index_decrypt as decrypt,
    index_IV_LEN as IV_LEN,
    index_getRandomValues as getRandomValues,
    index_toHex as toHex,
    index_generateRandomString as generateRandomString,
    index_base64urlencode as base64urlencode,
    index_base64url as base64url,
    index_str2ab as str2ab,
    index_ab2str as ab2str,
    index_importKey as importKey,
    index_deriveKey as deriveKey,
    index_Argon2HashResult as Argon2HashResult,
    index_functions as functions,
  };
}

export { index as web };
