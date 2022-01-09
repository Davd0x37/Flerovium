/**
 * Get random values with specified length
 *
 * @param {number} length
 * @return {*}  {Uint8Array}
 */
export const getRandomValues = (length: number): Uint8Array => {
  const arr = new Uint8Array(length);
  return window.crypto.getRandomValues(arr);
};

export const generateRandomString = (length: number): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
