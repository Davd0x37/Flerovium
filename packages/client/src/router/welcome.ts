import { RouteRecordRaw } from 'vue-router';
import WelcomeDefault from '@/pages/Welcome/Default.vue';
import WelcomeOpen from '@/pages/Welcome/Open.vue';
import WelcomeCreate from '@/pages/Welcome/Create.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/welcome',
		name: 'WelcomeDefault',
		component: WelcomeDefault,
		meta: {
			layout: 'WelcomeLayout',
			isAuth: true,
		},
		children: [
			{
				name: 'WelcomeOpen',
				path: 'open',
				component: WelcomeOpen,
				meta: {
					isAuth: true,
				},
			},
			{
				name: 'WelcomeCreate',
				path: 'create',
				component: WelcomeCreate,
				meta: {
					isAuth: true,
				},
			},
		],
	},
];

export default routes;
