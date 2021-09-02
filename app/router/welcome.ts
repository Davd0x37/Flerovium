import { RouteRecordRaw } from 'vue-router';

import WelcomeDefault from '@/views/Welcome/Default.vue';
import WelcomeOpen from '@/views/Welcome/Open.vue';
import WelcomeCreate from '@/views/Welcome/Create.vue';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'WelcomeDefault',
    path: '/welcome',
    component: WelcomeDefault,
    meta: {
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
