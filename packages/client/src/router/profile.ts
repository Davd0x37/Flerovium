import { RouteRecordRaw } from 'vue-router';
// import ProfileDefault from '@/pages/Profile/Default.vue';
// import ProfileSettings from '@/pages/Profile/Settings.vue';
// import ProfileData from '@/pages/Profile/Data.vue';
// import ProfileStore from '@/pages/Profile/Store.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/profile',
		name: 'ProfileDefault',
		// component: ProfileDefault,
		component: () => import('@/pages/Profile/Default.vue'),
		meta: {
			icon: 'las la-user',
			inSidebar: true,
			includeChildren: true,
		},
		children: [
			{
				name: 'ProfileData',
				path: 'data/',
				// component: ProfileData,
				component: () => import('@/pages/Profile/Settings.vue'),
				meta: {
					icon: 'las la-sliders-h',
					include: true,
				},
			},
			{
				name: 'ProfileStore',
				path: 'store/',
				// component: ProfileStore,
				component: () => import('@/pages/Profile/Data.vue'),
				meta: {
					icon: 'las la-memory',
					include: true,
				},
			},
			{
				name: 'ProfileSettings',
				path: 'settings/',
				// component: ProfileSettings,
				component: () => import('@/pages/Profile/Store.vue'),
				meta: {
					icon: 'las la-cogs',
					include: true,
				},
			},
		],
	},
];

export default routes;
