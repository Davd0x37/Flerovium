import { defineStore } from 'pinia';
import { v4 as idv4 } from 'uuid';

import { ServiceState } from '@/types/store';
import { Service } from '@/types/service';
import { copyObject } from '@/helpers/utils';

export const useServiceStore = defineStore('service', {
  persists: {
    key: 'serviceStore',
  },
  state: () =>
    ({
      list: {},
    } as ServiceState),

  getters: {
    services: state => state.list,

    servicesList(): Service[] {
      return Object.values(this.services);
    },

    servicesExist(): boolean {
      return this.servicesList.length > 0;
    },

    hasRequestedTokens() {
      return (name: string) => {
        const {
          auth: { hasRequestedTokens },
        } = this.getService(name);

        return !!hasRequestedTokens;
      };
    },
    hasAccessToken() {
      return (name: string) => {
        const {
          auth: { tokens },
        } = this.getService(name);

        return !!tokens?.accessToken || !!tokens?.code;
      };
    },

    hasCredentials() {
      return (name: string) => {
        const {
          auth: { credentials },
        } = this.getService(name);

        return credentials.clientId && credentials.clientSecret;
      };
    },

    getService:
      state =>
      (name: string): Service =>
        state.list[name],

    getTokens() {
      return (name: string) => {
        const {
          auth: { tokens },
        } = this.getService(name);

        return tokens;
      };
    },
  },

  actions: {
    addService(service: Service): void {
      const normalizedService = {
        ...service,
        $id: idv4(),
      };

      this.list = {
        ...this.list,
        [service.name]: normalizedService,
      };
    },

    deleteService(name: string): void {
      // @TODO: move omit to separate function
      const temp = Object.entries(this.list)
        .filter(([key]) => key !== name)
        .reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key]: val,
          }),
          {},
        );

      this.list = temp;
    },

    updateService(service: Service): void {
      const temp = {
        ...copyObject(this.getService(service.name)),
        ...service,
      };

      this.list = {
        ...this.list,
        [service.name]: temp,
      };
    },

    restoreServices(services: ServiceState['list']): void {
      this.list = {
        ...services,
      };
    },

    updateTokens(name: string, tokens: Service['auth']['tokens']): void {
      const { auth } = this.getService(name);

      auth.tokens = {
        ...auth.tokens,
        ...tokens,
      };
    },

    toggleRequestedTokens(name: string): void {
      const { auth } = this.getService(name);

      auth.hasRequestedTokens = !auth.hasRequestedTokens;
    },
  },
});
