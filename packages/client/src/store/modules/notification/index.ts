/* eslint-disable no-param-reassign */
import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { ACTIONS, GETTERS } from '@/store/names';
import { sleep } from '@/common/functions';
import { NOTIFICATION_TIME } from '@/common/config';
import { NotificationState, Notification } from './types';

const store: Module<NotificationState, RootState> = {
	// namespaced: true,
	state: {
		list: [],
	},
	getters: {
		[GETTERS.NOTIFICATIONS](state): Notification[] {
			return state.list;
		},
	},
	mutations: {
		[ACTIONS.SHOW_NOTIFICATION](state, notification: Notification) {
			state.list.push(notification);
		},

		[ACTIONS.REMOVE_NOTIFICATION](state) {
			const notifications = [...state.list];
			notifications.shift();
			state.list = [...notifications];
		},

		[ACTIONS.RESET_STORE_NOTIFICATION](state) {
			state.list = [];
		},
	},
	actions: {
		async [ACTIONS.SHOW_NOTIFICATION]({ commit }, notification: Notification) {
			commit(ACTIONS.SHOW_NOTIFICATION, notification);

			await sleep(NOTIFICATION_TIME);

			commit(ACTIONS.REMOVE_NOTIFICATION);
		},

		[ACTIONS.REMOVE_NOTIFICATION]({ commit }) {
			commit(ACTIONS.REMOVE_NOTIFICATION);
		},

		[ACTIONS.RESET_STORE_NOTIFICATION]({ commit }) {
			commit(ACTIONS.RESET_STORE_NOTIFICATION);
		},
	},
};

export default store;
