/* eslint-disable no-param-reassign */
import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import { ACTIONS } from '@/store/names';
import { Service, ServiceState } from './types';

const actionsBase: ActionTree<ServiceState, RootState> = {
	[ACTIONS.ADD_SERVICE]({ commit }, data: Service) {
		commit(ACTIONS.ADD_SERVICE, data);
	},
	[ACTIONS.DELETE_SERVICE]({ commit }, name: string) {
		commit(ACTIONS.DELETE_SERVICE, name);
	},
	[ACTIONS.UPDATE_SERVICE]({ commit }, data: Service) {
		commit(ACTIONS.UPDATE_SERVICE, data);
	},
	[ACTIONS.UPDATE_TOKENS](
		{ commit },
		data: { serviceName: string; tokens: Service['auth']['tokens'] },
	) {
		commit(ACTIONS.UPDATE_TOKENS, data);
	},
	[ACTIONS.TOGGLE_REQUESTED_TOKENS]({ commit }, serviceName: string) {
		commit(ACTIONS.TOGGLE_REQUESTED_TOKENS, serviceName);
	},

	[ACTIONS.RESET_STORE_SERVICES]({ commit }) {
		commit(ACTIONS.RESET_STORE_SERVICES);
	},
};

export default actionsBase;
