import { expect } from '@esm-bundle/chai';

import { Argon2 } from '../../app/helpers/hash';

const MASTER_PASSWORD = 'pa$$w0rd';

describe('test hashing', () => {
  it('HASH: should return encoded hash as string type', async () => {
    const hashed = await Argon2.hash(MASTER_PASSWORD);

    expect(hashed).to.instanceOf(Object);
  });
});
