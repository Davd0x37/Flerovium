import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import checkAuth from '@/middlewares/checkAuth';
import services from './services';
import welcome from './welcome';
import GlobalStore from '@/views/Store.vue';
import Authorize from '@/views/Authorize.vue';

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
    path: '/store',
    name: 'GlobalStore',
    component: GlobalStore,
    meta: {
      inSidebar: true,
      icon: 'las la-memory',
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
  ...services,
  ...welcome,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  checkAuth(to, from, next);
});

export default router;
