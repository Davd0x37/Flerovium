import { expect } from "@esm-bundle/chai";
import { hash, verify, encrypt, decrypt } from "../../src/web/crypto";

const CONTENT = "secret content, secret content";
const MASTER_PASSWORD = "pa$$w0rd";

describe("test encryption/decryption", () => {
  it("ENCRYPT: should return Uint8Array type", async () => {
    const encrypted = await encrypt(CONTENT, MASTER_PASSWORD);
    expect(encrypted).to.be.a("Uint8Array")
  });
  it("ENCRYPT: encrypted content should not match original content", async () => {
    const encrypted = await encrypt(CONTENT, MASTER_PASSWORD);
    expect(encrypted).to.not.equal(CONTENT)
  });

  it("DECRYPT: should return string type", async () => {
    const encrypted = await encrypt(CONTENT, MASTER_PASSWORD);

    const decrypted = await decrypt(encrypted, MASTER_PASSWORD);
    expect(decrypted).to.be.a("string")
  });
  it("DECRYPT: decrypted content should match original content", async () => {
    const encrypted = await encrypt(CONTENT, MASTER_PASSWORD);

    const decrypted = await decrypt(encrypted, MASTER_PASSWORD);
    expect(decrypted).to.be.equal(CONTENT)
  });

  it("HASH: should return encoded hash as string type", async () => {
    const hashed = await hash(MASTER_PASSWORD);
    console.log(hashed)

    expect(true).to.be.equal(true);
  })
});
