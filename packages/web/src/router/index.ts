import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import checkAuth from '@/middlewares/checkAuth';
import profile from './profile';
import services from './services';
import welcome from './welcome';

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
    component: () => import('@/pages/Authorize.vue'),
    children: [
      {
        path: ':name',
        name: 'ServiceAuth',
        component: () => import('@/pages/Authorize.vue'),
      },
    ],
  },
  ...profile,
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