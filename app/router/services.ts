import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/services',
    name: 'ServicesDefault',
    component: () => import('@/pages/Services/Default.vue'),
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
        component: () => import('@/pages/Services/View.vue'),
      },
      {
        name: 'ServicesEdit',
        path: 'edit/:name?',
        component: () => import('@/pages/Services/Edit.vue'),
      },
    ],
  },
];

export default routes;
