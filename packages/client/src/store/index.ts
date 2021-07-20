/* eslint-disable no-param-reassign */
import { createStore } from 'vuex';

import vuexPersist from '@/plugins/vuexPersist';
import modules from './modules';
import { RootState } from './types';
import { ACTIONS, GETTERS } from './names';

export default createStore<RootState>({
	modules,
	plugins: [vuexPersist.plugin],

	state() {
		return {
			vaultName: 'Haven',
			isInitialized: false,
			lang: 'pl',
			darkMode: true,
		};
	},

	getters: {
		[GETTERS.VAULT_NAME](state): string {
			return state.vaultName;
		},
		[GETTERS.IS_INITIALIZED](state): boolean {
			return state.isInitialized;
		},
		[GETTERS.DARK_MODE](state): boolean {
			return state.darkMode;
		},
		[GETTERS.VAULT](state): RootState {
			return state;
		},
		[GETTERS.LANGUAGE](state): string {
			return state.lang;
		},
	},

	mutations: {
		[ACTIONS.SET_INITIALIZED](state, init: boolean) {
			state.isInitialized = init;
		},
		[ACTIONS.TOGGLE_DARK_MODE](state) {
			state.darkMode = !state.darkMode;
		},
		[ACTIONS.CHANGE_LANGUAGE](state, lang: string) {
			state.lang = lang;
		},
		[ACTIONS.RESET_STORE](state) {
			state.vaultName = 'Haven';
			state.isInitialized = false;
			state.lang = 'pl';
			state.darkMode = true;
		},
	},

	actions: {
		[ACTIONS.SET_INITIALIZED]({ commit }, data: boolean) {
			commit(ACTIONS.SET_INITIALIZED, data);
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
	},
});
