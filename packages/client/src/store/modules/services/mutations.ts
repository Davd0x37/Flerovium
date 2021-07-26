/* eslint-disable no-param-reassign */
// import builtinServices from '@/common/builtinServices';
import { copyObject } from '@/common/functions';
import { ACTIONS } from '@/store/names';
import { v4 as uuidv4 } from 'uuid';
import { MutationTree } from 'vuex';
import { Service, ServiceState } from './types';

const mutationsBase: MutationTree<ServiceState> = {
	[ACTIONS.ADD_SERVICE](state, service: Service) {
		const normalizedService = {
			...service,
			$id: uuidv4(),
		};

		state.list = {
			...state.list,
			[service.name]: normalizedService,
		};
	},

	[ACTIONS.DELETE_SERVICE](state, name: string) {
		const temp = Object.entries(state.list)
			.filter(([key, _]) => key !== name)
			.reduce(
				(acc, [key, val]) => ({
					...acc,
					[key]: val,
				}),
				{},
			);

		state.list = temp;
	},

	[ACTIONS.UPDATE_SERVICE](state, service: Service) {
		const temp = {
			...copyObject(state.list[service.name]),
			...service,
		};

		state.list = {
			...state.list,
			[service.name]: temp,
		};
	},

	[ACTIONS.RESTORE_SERVICES](state, services: ServiceState['list']) {
		state.list = {
			...services,
		};
	},

	[ACTIONS.UPDATE_TOKENS](
		state,
		{
			serviceName,
			tokens,
		}: { serviceName: string; tokens: Service['auth']['tokens'] },
	) {
		const { tokens: tokensArray } = state.list[serviceName].auth;
		state.list[serviceName].auth.tokens = {
			...tokensArray,
			...tokens,
		};
	},

	[ACTIONS.TOGGLE_REQUESTED_TOKENS](state, serviceName: string) {
		const { hasRequestedTokens } = state.list[serviceName].auth;
		state.list[serviceName].auth.hasRequestedTokens = !hasRequestedTokens;
	},

	// [ACTIONS.RESET_STORE_SERVICES](state) {
	// 	state.list = builtinServices;
	// },
};

export default mutationsBase;
