import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Authorize from '@/pages/Authorize.vue';
import checkAuth from '@/middlewares/checkAuth';
import profile from './profile';
import services from './services';

const isAuthenticated = true;

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			inSidebar: true,
			icon: 'las la-id-card',
		},
	},
	{
		path: '/authorize',
		name: 'ServiceAuthorize',
		component: Authorize,
		children: [
			{
				path: ':name',
				name: 'ServiceAuth',
				component: Authorize,
			},
		],
	},
	...profile,
	...services,
];

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	checkAuth(next, isAuthenticated);

	// if (to.meta.isPlaceholder) {
	// 	console.log(to, from);
	// 	next(false);
	// } else {
	// 	next(false);
	// }
});

// router.beforeEach((to, from, next) => {
// 	if (to.matched.some((record) => record.meta.conditionalRoute)) {
// 		// this route requires condition/permission to be accessed
// 		if (!checkCondition) {
// 			//check condition is false
// 			next({ path: '/' });
// 		} else {
// 			//check condition is true
// 			next();
// 		}
// 	} else {
// 		next(); // Don't forget next
// 	}
// });

export default router;
