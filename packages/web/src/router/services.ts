import { RouteRecordRaw } from 'vue-router';
import ServicesDefault from '@/views/Services/Default.vue';
import ServicesView from '@/views/Services/View.vue';
import ServicesEdit from '@/views/Services/Edit.vue';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'ServicesDefault',
    path: '/services',
    component: ServicesDefault,
    meta: {
      icon: 'fa fa-scroll',
      inSidebar: true,
      listServices: true,
      plusAction: {
        icon: 'fa fa-plus',
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
