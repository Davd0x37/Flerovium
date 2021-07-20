import { Store } from 'vuex';
import { RootState } from '@/store/types';
import { $api } from '@/api';
import { $notification } from '@/services';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store<RootState>;
		$api: typeof $api;
		$notification: typeof $notification;
	}
}
