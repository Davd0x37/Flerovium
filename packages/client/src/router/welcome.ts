import { RouteRecordRaw } from 'vue-router';
// import WelcomeDefault from '@/pages/Welcome/Default.vue';
// import WelcomeOpen from '@/pages/Welcome/Open.vue';
// import WelcomeCreate from '@/pages/Welcome/Create.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/welcome',
		name: 'WelcomeDefault',
		// component: WelcomeDefault,
		component: () => import('@/pages/Welcome/Default.vue'),
		meta: {
			layout: 'WelcomeLayout',
			isAuth: true,
		},
		children: [
			{
				name: 'WelcomeOpen',
				path: 'open',
				// component: WelcomeOpen,
				component: () => import('@/pages/Welcome/Open.vue'),
				meta: {
					isAuth: true,
				},
			},
			{
				name: 'WelcomeCreate',
				path: 'create',
				// component: WelcomeCreate,
				component: () => import('@/pages/Welcome/Create.vue'),
				meta: {
					isAuth: true,
				},
			},
		],
	},
];

export default routes;
