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

    getService:
      state =>
      (name: string): Service =>
        state.list[name],

    getTokens() {
      return (serviceName: string) => {
        const {
          auth: { tokens },
        } = this.getService(serviceName);

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

    updateTokens(serviceName: string, tokens: Service['auth']['tokens']): void {
      const { auth } = this.getService(serviceName);

      auth.tokens = {
        ...auth.tokens,
        ...tokens,
      };
    },

    toggleRequestedTokens(serviceName: string): void {
      const { auth } = this.getService(serviceName);

      auth.hasRequestedTokens = !auth.hasRequestedTokens;
    },
  },
});
