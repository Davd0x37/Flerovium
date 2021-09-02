import { defineStore } from 'pinia';

import { RootState, ServiceState } from '@/types/store';
import builtinServices from '@/common/builtinServices';
import { useServiceStore } from './service';

export const useStore = defineStore('main', {
  persists: {
    key: 'mainStore',
  },
  state: () =>
    ({
      name: 'vault',
      isAuth: false,
      lang: 'en',
      darkMode: true,
      searchBox: '',
      encryption: {
        passwordHash: '',
        salt: '',
      },
    } as RootState),

  getters: {
    vaultName: state => state.name,
    isAuthenticated: state => state.isAuth,
    isDarkMode: state => state.darkMode,
    search: state => state.searchBox,
    language: state => state.lang,
    vault: state => state,
  },

  actions: {
    setAuthenticated(init: boolean) {
      this.isAuth = init;
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },

    changeLanguage(lang: string) {
      this.lang = lang;
    },

    setSearch(val: string) {
      this.searchBox = val;
    },

    createVault(
      payload: Pick<RootState, 'name' | 'encryption'> &
        Partial<{
          services: ServiceState;
          useBuiltin: boolean;
        }>,
    ) {
      this.name = payload.name;
      this.encryption = payload.encryption;
      this.setAuthenticated(true);

      const service = useServiceStore();

      if (payload.services !== undefined) {
        service.restoreServices(payload.services.list);
      }

      if (payload.useBuiltin) {
        service.restoreServices(builtinServices);
      }
    },
  },
});
