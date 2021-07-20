import { hash as argonHash, verify as argonVerify, argon2id } from 'argon2'

/**
 * Hash password with argon2
 * @param {string} pass Password to hash
 * @returns {Promise<string>} Hashed password
 */
export const hash = (pass: string): Promise<string> =>
	argonHash(pass, {
		timeCost: 16,
		memoryCost: 2 ** 15,
		parallelism: 2,
		type: argon2id,
	})

/**
 * Compare hashed text with plain one
 * @param {string} hashedPass
 * @param {string} plainPass
 * @returns {Promise<boolean>}
 */
export const verify = (hashed: string, plain: string): Promise<boolean> =>
	argonVerify(hashed, plain)
