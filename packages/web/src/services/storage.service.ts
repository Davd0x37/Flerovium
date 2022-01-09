/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Buffer } from 'buffer';
import { debug } from 'debug';
import init, { DerivKey, decrypt, encrypt } from 'cryfler';
import { generateDownloadUrl } from '@/helpers/fs';
import { useStore } from '@/store/main';
import { FileSchema, URLDownload } from '@/types/fs';
import { ConvertedStore, RootState } from '@/types/store';
import { Argon2 } from '@/helpers/hash';
import { useServiceStore } from '@/store/service';

export class StorageService {
  static async downloadVault(vault: RootState): Promise<URLDownload> {
    try {
      // @FIXME: change to single store
      const store = useStore();
      const serviceStore = useServiceStore();

      const {
        encryption: { passwordHash },
      } = store.vault;

      const convertedStore = {
        store: store.$state,
        serviceStore: serviceStore.$state,
      };

      const key = DerivKey.derive_key(passwordHash);
      const hash = key.get_hash();
      const salt = key.get_salt();

      const restAB = JSON.stringify(convertedStore);
      // encrypt converted buffer
      const data = encrypt(restAB, hash);

      // salt doesn't have to be secret, so it doesn't need to be encrypted
      // We need salt to generate a new hash used to decrypt the vault
      const contentRaw: FileSchema = {
        encryption: { salt },
        data,
      };

      // save configuration and encrypted data in buffer then convert it to hex
      const encryptedContent = Buffer.from(JSON.stringify(contentRaw)).toString(
        'hex',
      );

      // Finally, generate a download url from our encrypted data
      const url = generateDownloadUrl(encryptedContent);

      return {
        name: vault.name,
        url,
      };
    } catch (error) {
      // if (error instanceof Error) {
      debug('[StorageService]')(`DownloadVault: ${error}`);
      // }
      console.error(error);
      throw new Error('[StorageService] DownloadVault');
    }
  }

  static async openVault(payload: string, rawPassword: string): Promise<void> {
    try {
      const store = useStore();

      // These steps are complicated
      // 1: Convert saved vault as hex to utf-8
      const encryptedStringified = Buffer.from(payload, 'hex').toString(
        'utf-8',
      );
      // 2: Configuration and encrypted data must be parsed as JSON
      const encryptedParsed = JSON.parse(encryptedStringified) as FileSchema;
      // 3: We get the encryption configuration and our encrypted data
      const { encryption, data } = encryptedParsed;

      // 4: Create new hash using raw password and old salt
      const [_, encoded] = await Argon2.hash(rawPassword, encryption.salt);

      // 5: Decrypt with newly generated hash
      const decryptedAB = await decrypt(data, encoded);
      // 6: Convert from UInt8Array to utf-8
      const decrypted = Buffer.from(decryptedAB).toString('utf-8');

      // we can parse decrypted data as its format is known
      const vault = JSON.parse(decrypted) as ConvertedStore;

      const convertedStore = {
        ...vault.store,
        services: vault.serviceStore,
      };

      store.createVault(convertedStore);
    } catch (error) {
      // if (error instanceof Error) {
      debug('[StorageService]')(`OpenVault: ${error}`);
      // }
      throw new Error('[StorageService] OpenVault');
    }
  }
}
