/* eslint-disable import/extensions */
import { expect } from '@esm-bundle/chai';

import { Buffer } from 'buffer';
import { encrypt, decrypt } from '../src/crypto';

const CONTENT = 'secret content, secret content';
const CONTENT_BUFF = Buffer.from(CONTENT, 'utf-8');
const MASTER_PASSWORD = 'pa$$w0rd';

describe('test encryption/decryption', () => {
  it('ENCRYPT: should return Uint8Array type', async () => {
    const encrypted = await encrypt(CONTENT_BUFF, MASTER_PASSWORD);
    expect(encrypted).to.be.a('Uint8Array');
  });
  it('ENCRYPT: encrypted content should not match original content', async () => {
    const encrypted = await encrypt(CONTENT_BUFF, MASTER_PASSWORD);
    expect(encrypted).to.not.equal(CONTENT);
  });

  it('DECRYPT: should return Uint8Array type', async () => {
    const encrypted = await encrypt(CONTENT_BUFF, MASTER_PASSWORD);

    const decrypted = await decrypt(encrypted, MASTER_PASSWORD);
    expect(decrypted).to.be.a('Uint8Array');
  });
  it('DECRYPT: decrypted content should match original content', async () => {
    const encrypted = await encrypt(CONTENT_BUFF, MASTER_PASSWORD);

    const decryptRaw = await decrypt(encrypted, MASTER_PASSWORD);
    const decrypted = Buffer.from(decryptRaw).toString('utf-8');
    expect(decrypted).to.be.equal(CONTENT);
  });
});
