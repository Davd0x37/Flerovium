import { expect } from '@esm-bundle/chai';
import faker from 'faker';
import qs from 'qs';
import {
  generateAuthenticationURI,
  generateCodeChallenge,
  generateCodeVerifier,
} from '../../src/api/auth';
import { ResponseTypeEnum } from '../../src/types';

const TEST_CONFIG = {
  authorizeUri: faker.internet.url(),
  AuthArgs: {
    client_id: faker.datatype.string(50),
    code_challenge: faker.datatype.string(50),
    code_challenge_method: 'S256',
    redirect_uri: faker.internet.url(),
    response_type: ResponseTypeEnum.CODE,
    scope: 'user groups',
    state: faker.datatype.string(25),
  },
  CodeVerifier: {
    min: 43,
    max: 128,
  },
};

describe('test generating authorization codes', () => {
  it('generates authentication uri', () => {
    const generatedAuthUri = generateAuthenticationURI(
      TEST_CONFIG.authorizeUri,
      TEST_CONFIG.AuthArgs,
    );
    const [authUri, parameters] = generatedAuthUri.split('?');
    const parsedQS = qs.parse(parameters);

    expect(authUri).to.equal(TEST_CONFIG.authorizeUri);
    expect(parsedQS).to.deep.equal(TEST_CONFIG.AuthArgs);
  });

  it('should generate code verifier with different lengths', () => {
    const { min, max } = TEST_CONFIG.CodeVerifier;
    const code = generateCodeVerifier(min, max);

    // Uint8array can have values from 0 to 255
    // 0-9 will have one char
    // 255 will have 2 chars
    // so we check if max length is twice of max
    expect(code).length.lessThanOrEqual(max * 2);
    expect(code).length.greaterThanOrEqual(min);
  });

  it('should generate code challenge using code verifier', async () => {
    const { min, max } = TEST_CONFIG.CodeVerifier;
    const code = generateCodeVerifier(min, max);
    const challenge = await generateCodeChallenge(code);
    const challengeTwo = await generateCodeChallenge(code);

    expect(challenge).to.be.equal(challengeTwo);
  });
});
