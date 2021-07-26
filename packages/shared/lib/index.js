import argon2browser from 'argon2-browser/dist/argon2-bundled.min.js';
import { Buffer } from 'buffer';

const getRandomValues = (length) => {
  const arr = new Uint8Array(length);
  return window.crypto.getRandomValues(arr);
};
const toHex = (buffer) => {
  return buffer.reduce((mem, val) => mem + ("00" + val.toString(16)).slice(-2), "");
};
const generateRandomString = (length) => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const base64urlencode = (a) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const base64url = (buffer) => {
  let str = "";
  const newBuffer = new Uint8Array(buffer);
  const len = newBuffer.byteLength;
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(newBuffer[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const str2ab = (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};
const ab2str = (ab, encoding = "utf-8") => {
  return new TextDecoder(encoding).decode(ab);
};
const importKey = (key) => {
  const baseKey = str2ab(key);
  return window.crypto.subtle.importKey("raw", baseKey, "PBKDF2", false, [
    "deriveKey"
  ]);
};
const deriveKey = (key, salt) => {
  return window.crypto.subtle.deriveKey({
    name: "PBKDF2",
    salt,
    iterations: 1e4,
    hash: {
      name: "SHA-512"
    }
  }, key, {
    name: "AES-GCM",
    length: 256
  }, false, ["encrypt", "decrypt"]);
};

const IV_LEN = 16;

async function encrypt(content, password) {
  const iv = getRandomValues(IV_LEN);
  const salt = getRandomValues(IV_LEN);
  const importedKey = await importKey(password);
  const derivedKey = await deriveKey(importedKey, salt);
  const arrayBuffer = await window.crypto.subtle.encrypt({
    name: "AES-GCM",
    iv
  }, derivedKey, content);
  const encrypted = new Uint8Array(arrayBuffer);
  const abIVData = new Uint8Array(new ArrayBuffer(IV_LEN * 2 + encrypted.length));
  abIVData.set(iv);
  abIVData.set(salt, IV_LEN);
  abIVData.set(encrypted, IV_LEN * 2);
  return abIVData;
}
async function decrypt(encrypted, password) {
  const [iv, salt, data] = [
    encrypted.slice(0, IV_LEN),
    encrypted.slice(IV_LEN, IV_LEN * 2),
    encrypted.slice(IV_LEN * 2)
  ];
  const importedKey = await importKey(password);
  const derivedKey = await deriveKey(importedKey, salt);
  const arrayBuffer = await window.crypto.subtle.decrypt({
    name: "AES-GCM",
    iv
  }, derivedKey, data);
  const decrypted = new Uint8Array(arrayBuffer);
  return decrypted;
}

const functions = {
  SHA: {
    async hash(input, algorithm = "SHA-256") {
      if (typeof input === "string") {
        const arrayBuffer = str2ab(input);
        return window.crypto.subtle.digest(algorithm, arrayBuffer);
      }
      return window.crypto.subtle.digest(algorithm, input);
    }
  },
  SHA256: {
    async hash(input) {
      return functions.SHA.hash(input, "SHA-256");
    }
  },
  SHA384: {
    async hash(input) {
      return functions.SHA.hash(input, "SHA-384");
    }
  },
  SHA512: {
    async hash(input) {
      return functions.SHA.hash(input, "SHA-512");
    }
  },
  Argon2: {
    async hash(input, saltNew) {
      try {
        const salt = saltNew || Buffer.from(getRandomValues(IV_LEN)).toString("hex");
        const req = await argon2browser.hash({
          pass: input,
          salt,
          time: 3,
          mem: 14777,
          type: argon2browser.ArgonType.Argon2id
        });
        return {
          hash: req.hash,
          hashHex: req.hashHex,
          encoded: req.encoded,
          salt
        };
      } catch (error) {
        throw new Error(`[CRYPTO_HASH] Hashing error #${error.code}: ${error.message}`);
      }
    },
    async verify(input, encodedHash) {
      try {
        const req = await argon2browser.verify({
          pass: input,
          encoded: encodedHash,
          type: argon2browser.ArgonType.Argon2id
        });
        return !!req;
      } catch (error) {
        throw new Error(`[CRYPTO_HASH] Hash verifying error #${error.code}: ${error.message}`);
      }
    }
  }
};

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	encrypt: encrypt,
	decrypt: decrypt,
	IV_LEN: IV_LEN,
	getRandomValues: getRandomValues,
	toHex: toHex,
	generateRandomString: generateRandomString,
	base64urlencode: base64urlencode,
	base64url: base64url,
	str2ab: str2ab,
	ab2str: ab2str,
	importKey: importKey,
	deriveKey: deriveKey,
	functions: functions
});

export { index as web };
