import { encrypt, decrypt, verify, hash } from '../src/node/index'
import { random, lorem, datatype } from 'faker'

describe('Encrypt/decrypt data', () => {
	const masterKey = datatype.uuid()
	const password = random.word()
	const data = lorem.text(1)

	it('Should encrypt/decrypt data with default encoding', async () => {
		const enc = await encrypt(data, masterKey)
		expect(typeof enc).toBe('string')

		const dec = await decrypt(enc, masterKey)
		expect(dec).toBe(data)
	})

	it('Should encrypt/decrypt data with hex encoding', async () => {
		const encoding = 'hex'
		const enc = await encrypt(data, masterKey, encoding)
		expect(typeof enc).toBe('string')

		const dec = await decrypt(enc, masterKey, encoding)
		expect(dec).toBe(data)
	})

	it('Should hash and verify text', async () => {
		const hashed = await hash(password)
		expect(typeof hashed).toBe('string')

		const verified = await verify(hashed, password)
		expect(verified).toBeTruthy()
	})
})
