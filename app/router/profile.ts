import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'ProfileDefault',
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
        component: () => import('@/pages/Profile/Data.vue'),
        meta: {
          icon: 'las la-sliders-h',
          include: true,
        },
      },
      {
        name: 'ProfileStore',
        path: 'store/',
        component: () => import('@/pages/Profile/Store.vue'),
        meta: {
          icon: 'las la-memory',
          include: true,
        },
      },
      {
        name: 'ProfileSettings',
        path: 'settings/',
        component: () => import('@/pages/Profile/Settings.vue'),
        meta: {
          icon: 'las la-cogs',
          include: true,
        },
      },
    ],
  },
];

export default routes;
