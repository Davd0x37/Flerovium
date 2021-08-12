import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/welcome',
    name: 'WelcomeDefault',
    component: () => import('@/pages/Welcome/Default.vue'),
    meta: {
      layout: 'WelcomeLayout',
      isAuth: true,
    },
    children: [
      {
        name: 'WelcomeOpen',
        path: 'open',
        component: () => import('@/pages/Welcome/Open.vue'),
        meta: {
          isAuth: true,
        },
      },
      {
        name: 'WelcomeCreate',
        path: 'create',
        component: () => import('@/pages/Welcome/Create.vue'),
        meta: {
          isAuth: true,
        },
      },
    ],
  },
];

export default routes;
