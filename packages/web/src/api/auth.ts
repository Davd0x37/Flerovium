import {
  generateRandomString,
  functions,
  base64urlencode,
} from '@flerovium/crypto';
import qs from 'qs';

export const generateAuthenticationURI = (
  authorizeUri: string,
  parameters: {},
) => {
  const queryString = qs.stringify(parameters);

  return `${authorizeUri}?${queryString}`;
};

export const generateCodeVerifier = (min: number = 43, max: number = 128) => {
  const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
  const array = generateRandomString(randomLength);

  return array;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const hash = await functions.SHA.hash(codeVerifier);
  const encoded = base64urlencode(hash);

  return encoded;
};
