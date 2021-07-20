import { argon2id, hash } from 'argon2'
import {
	createCipheriv,
	createDecipheriv,
	randomBytes,
	BinaryToTextEncoding,
} from 'crypto'

// const decipherMethod = {
//   gcm: "aes-256-gcm",
//   ccm: "chacha20-poly1305",
// };

// @TODO: Change to Chacha20-Poly1305

const createHash = (password: string, salt: Buffer): Promise<Buffer> =>
	hash(password, {
		hashLength: 32,
		salt,
		timeCost: 16,
		memoryCost: 2 ** 15,
		parallelism: 2,
		type: argon2id,
		raw: true,
	})

/**
 * Encrypt data and return buffer as (base64|binary|hex) string
 * Salt from 0 to 64 (not inclusive)
 * Initialization Vector 64-128
 * Authentication tag 128-144
 * Encrypted data 144-x
 * ```
 * const decode = Buffer.from(buffer, "base64");
 * const [salt, initVec, authTag, encrypted] = [
 *  decode.slice(0, 64),
 *  decode.slice(64, 128),
 *  decode.slice(128, 144),
 *  decode.slice(144).toString(),
 * ];
 * ```
 *
 * @param {string} data Data to encrypt
 * @param {string} password Strong password
 * @param {BinaryToTextEncoding} [encoding="base64"] Output encoding
 * @returns {Promise<string>} Encrypted data
 */
export const encrypt = async (
	data: string,
	password: string,
	encoding: BinaryToTextEncoding = 'base64',
): Promise<string> => {
	const salt = randomBytes(64) // Create random salt
	const initVec = randomBytes(64) // Create initialization vector
	// Hash password
	const secretKey = await createHash(password, salt)
	const cipher = createCipheriv('aes-256-gcm', secretKey, initVec, {
		authTagLength: 16,
	})
	const encrypted = Buffer.from(
		cipher.update(data, 'utf8', encoding) + cipher.final(encoding),
	)
	const authTag = cipher.getAuthTag()

	return Buffer.concat([salt, initVec, authTag, encrypted]).toString(encoding)
}

/**
 * Decrypt data from (base64|binary|hex) buffer
 * ```
 * const decrypted = await decrypt("RW5jcnlwdGVkIGRhdGEgaW4gYmFzZTY0", "M4st3rP4ssw0rd")
 * ```
 * @param {string} bufferString Buffer saved in string (from encrypt function)
 * @param {string} password
 * @param {BinaryToTextEncoding} [encoding="base64"]
 * @returns {Promise<string>} Decrypted data
 */
export const decrypt = async (
	bufferString: string,
	password: string,
	encoding: BinaryToTextEncoding = 'base64',
): Promise<string> => {
	const decode = Buffer.from(bufferString, encoding)
	const [salt, initVec, authTag, encrypted] = [
		decode.slice(0, 64),
		decode.slice(64, 128),
		decode.slice(128, 144),
		decode.slice(144).toString(),
	]

	const secretKey = await createHash(password, salt)
	const decipher = createDecipheriv('aes-256-gcm', secretKey, initVec)
	decipher.setAuthTag(authTag)

	return decipher.update(encrypted, encoding, 'utf8') + decipher.final('utf8')
}
