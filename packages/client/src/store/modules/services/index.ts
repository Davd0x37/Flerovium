import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { ServiceState } from './types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

const store: Module<ServiceState, RootState> = {
	// namespaced: true,
	state,
	getters,
	mutations,
	actions,
};

export default store;
