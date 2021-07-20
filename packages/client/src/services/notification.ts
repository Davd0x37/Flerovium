import store from '@/store';
import { Notification } from '@/store/modules/notification/types';
import { ACTIONS } from '@/store/names';

export const $notification = {
	show(options: Notification) {
		store.dispatch(ACTIONS.SHOW_NOTIFICATION, options);
	},
};
