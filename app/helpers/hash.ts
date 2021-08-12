/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// eslint-disable-next-line import/extensions
import argon2browser from 'argon2-browser/dist/argon2-bundled.min.js';
// import {ArgonType, hash as ArgonHash, verify as ArgonVerify} from "argon2-browser"
import { Buffer } from 'buffer';
import debug from 'debug';
import { IV_LEN } from '@/common/constants';
import { getRandomValues } from './random';
import { str2ab } from './utils';

/**
 * Hash input using (default) SHA-256
 *
 * @param {(string | ArrayBuffer)} input
 * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} [algorithm='SHA-256']
 * @return {*}  {Promise<ArrayBuffer>}
 */
export async function hash(
  input: string | ArrayBuffer,
  algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256',
): Promise<ArrayBuffer> {
  if (typeof input === 'string') {
    const arrayBuffer = str2ab(input);
    return window.crypto.subtle.digest(algorithm, arrayBuffer);
  }

  return window.crypto.subtle.digest(algorithm, input);
}

export const Argon2 = {
  /**
   * Hash input and return
   *
   * @export
   * @param {string} input
   * @param {string} [saltNew]
   * @return {*}  {Promise<[string, string]>} [salt, encoded]
   */
  async hash(input: string, saltNew?: string): Promise<[string, string]> {
    try {
      const salt =
        saltNew || Buffer.from(getRandomValues(IV_LEN)).toString('hex');

      const { encoded } = await argon2browser.hash({
        pass: input,
        salt,
        time: 3, // Number of iterations
        mem: 14777, // In KiB
        type: argon2browser.ArgonType.Argon2id,
      });

      return [salt, encoded];
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      debug('[HASH]')(`Hashing error: ${error}`);

      throw new Error(`[HASH] Hash error. Check debug log.`);
    }
  },

  /**
   * Compare input with encoded hash
   *
   * @export
   * @param {string} input
   * @param {(string | Uint8Array)} encoded
   * @return {*}  {(Promise<boolean>)}
   */
  async verify(input: string, encoded: string | Uint8Array): Promise<boolean> {
    try {
      const req = await argon2browser.verify({
        pass: input,
        encoded,
        type: argon2browser.ArgonType.Argon2id,
      });

      return !!req;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      debug('[HASH]')(`Hash verifying error: ${error}`);

      throw new Error(`[HASH] Verify error. Check debug log.`);
    }
  },
};
