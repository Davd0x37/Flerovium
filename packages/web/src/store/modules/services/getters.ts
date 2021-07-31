/* eslint-disable no-param-reassign */
import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { GETTERS } from '@/store/names';
import { Service, ServiceState } from './types';

const gettersBase: GetterTree<ServiceState, RootState> = {
  [GETTERS.SERVICES]:
    state =>
    (copy = false) => {
      if (copy) {
        return JSON.parse(JSON.stringify(state.list));
      }
      return state.list;
    },

  [GETTERS.SERVICES_LIST]:
    (_, getters) =>
    (copy = false) =>
      Object.values(getters[GETTERS.SERVICES](copy)),

  [GETTERS.GET_SERVICE]:
    state =>
    (name: string, copy = false): Service =>
      copy ? JSON.parse(JSON.stringify(state.list[name])) : state.list[name],

  [GETTERS.GET_TOKENS]:
    (_, getters) =>
    (serviceName: string, copy = false) => {
      const {
        auth: { tokens },
      } = getters[GETTERS.GET_SERVICE](serviceName, copy);

      return tokens;
    },
};

export default gettersBase;
