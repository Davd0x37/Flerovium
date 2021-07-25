/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import vuexPersist from '@/plugins/vuexPersist';
import modules from './modules';
import { RootState } from './types';
import { ACTIONS, GETTERS } from './names';
import { ServiceState } from './modules/services/types';

export default createStore<RootState>({
	modules,
	plugins: [vuexPersist.plugin],

	state() {
		return {
			name: 'vault',
			isAuthenticated: false,
			lang: 'en',
			darkMode: true,
			passwordHash: '',
		};
	},

	getters: {
		[GETTERS.VAULT_NAME](state): string {
			return state.name;
		},
		[GETTERS.IS_AUTHENTICATED](state): boolean {
			return state.isAuthenticated;
		},
		[GETTERS.DARK_MODE](state): boolean {
			return state.darkMode;
		},
		[GETTERS.VAULT](state): {} {
			return state;
		},
		[GETTERS.LANGUAGE](state): string {
			return state.lang;
		},
	},

	mutations: {
		[ACTIONS.SET_AUTHENTICATED](state, init: boolean) {
			state.isAuthenticated = init;
		},
		[ACTIONS.TOGGLE_DARK_MODE](state) {
			state.darkMode = !state.darkMode;
		},
		[ACTIONS.CHANGE_LANGUAGE](state, lang: string) {
			state.lang = lang;
		},
		[ACTIONS.RESET_STORE](state) {
			state.name = 'Haven';
			state.isAuthenticated = false;
			state.lang = 'pl';
			state.darkMode = true;
			state.passwordHash = '';
		},
		[ACTIONS.CREATE_VAULT](
			state,
			payload: Pick<RootState, 'name' | 'lang' | 'darkMode' | 'passwordHash'>,
		) {
			state.name = payload.name || state.name;
			state.lang = payload.lang || state.lang;
			state.darkMode = payload.darkMode || state.darkMode;
			state.passwordHash = payload.passwordHash || state.passwordHash;
		},
	},

	actions: {
		[ACTIONS.SET_AUTHENTICATED]({ commit }, data: boolean) {
			commit(ACTIONS.SET_AUTHENTICATED, data);
		},
		[ACTIONS.TOGGLE_DARK_MODE]({ commit }) {
			commit(ACTIONS.TOGGLE_DARK_MODE);
		},
		[ACTIONS.CHANGE_LANGUAGE]({ commit }, lang: string) {
			commit(ACTIONS.CHANGE_LANGUAGE, lang);
		},
		[ACTIONS.RESET_STORE]({ commit }) {
			commit(ACTIONS.RESET_STORE);
			commit(ACTIONS.RESET_STORE_SERVICES);
			commit(ACTIONS.RESET_STORE_NOTIFICATION);
		},
		[ACTIONS.CREATE_VAULT](
			{ commit },
			payload: Pick<RootState, 'name' | 'lang' | 'darkMode' | 'passwordHash'> & {
				services: ServiceState;
			},
		) {
			commit(ACTIONS.CREATE_VAULT, payload);
			commit(ACTIONS.SET_AUTHENTICATED, true);
			if (payload.services !== undefined) {
				commit(ACTIONS.RESTORE_SERVICES, payload.services.list);
			}
		},
	},
});
