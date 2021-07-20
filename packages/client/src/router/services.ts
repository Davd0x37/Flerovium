import { RouteRecordRaw } from 'vue-router';
import ServicesDefault from '@/pages/Services/Default.vue';
import ServicesView from '@/pages/Services/View.vue';
import ServicesEdit from '@/pages/Services/Edit.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/services',
		name: 'ServicesDefault',
		component: ServicesDefault,
		meta: {
			icon: 'las la-scroll',
			inSidebar: true,
			listServices: true,
			plusAction: {
				icon: 'las la-plus',
				pathName: 'ServicesEdit',
			},
		},
		children: [
			{
				name: 'ServicesView',
				path: 'view/:name',
				component: ServicesView,
			},
			{
				name: 'ServicesEdit',
				path: 'edit/:name?',
				component: ServicesEdit,
			},
		],
	},
];

export default routes;
