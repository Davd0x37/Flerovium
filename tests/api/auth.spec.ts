import { expect } from '@esm-bundle/chai';
import faker from 'faker';
import qs from 'qs';
import { ResponseTypeEnum } from '../../app/types/auth';
import { OAuthStrategy } from '../../app/services/auth/oauth.strategy';

const TEST_CONFIG: Record<string, string> = {
  authorizeUri: faker.internet.url(),
  client_id: faker.datatype.string(50),
  code_challenge: faker.datatype.string(50),
  code_challenge_method: 'S256',
  redirect_uri: faker.internet.url(),
  response_type: ResponseTypeEnum.CODE,
  scope: 'user groups',
  state: faker.datatype.string(25),
};
const CodeVerifierMin = 43;
const CodeVerifierMax = 128;

// FIX THIS
const oAuthStrategy = new OAuthStrategy();

before(() => {
  oAuthStrategy.setCredentials({
    authorizeUri: TEST_CONFIG.authorizeUri,
    clientId: TEST_CONFIG.client_id,
    scope: TEST_CONFIG.scope,
    redirectUri: TEST_CONFIG.redirect_uri,
  });
});

describe('test generating authorization codes', () => {
  it('generates authentication uri', () => {
    const generatedAuthUri = oAuthStrategy.generateAuthenticationURI(
      TEST_CONFIG.authorizeUri,
      {
        authorizeUri: TEST_CONFIG.authorizeUri,
        clientId: TEST_CONFIG.client_id,
        scope: TEST_CONFIG.scope,
        redirectUri: TEST_CONFIG.redirect_uri,
      },
    );
    const [authUri, parameters] = generatedAuthUri.split('?');
    const parsedQS = qs.parse(parameters);

    expect(authUri).to.equal(TEST_CONFIG.authorizeUri);
    expect(parsedQS).to.deep.equal(TEST_CONFIG.AuthArgs);
  });

  it('should generate code verifier with different lengths', () => {
    const code = oAuthStrategy.generateCodeVerifier(
      CodeVerifierMin,
      CodeVerifierMax,
    );

    // Uint8array can have values from 0 to 255
    // 0-9 will have one char
    // 255 will have 2 chars
    // so we check if max length is twice of max
    expect(code).length.lessThanOrEqual(CodeVerifierMax * 2);
    expect(code).length.greaterThanOrEqual(CodeVerifierMin);
  });

  it('should generate code challenge using code verifier', async () => {
    const code = oAuthStrategy.generateCodeVerifier(
      CodeVerifierMin,
      CodeVerifierMax,
    );
    const challenge = await oAuthStrategy.generateCodeChallenge(code);
    const challengeTwo = await oAuthStrategy.generateCodeChallenge(code);

    expect(challenge).to.be.equal(challengeTwo);
  });
});
