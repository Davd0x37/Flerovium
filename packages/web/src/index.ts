import { createApp } from 'vue';

import App from './App.vue';
import './App.css';

import mixins from './plugins/mixins';
import i18n from './plugins/i18n';
import router from './router';
import store from './store';

const app = createApp(App);

app.mixin(mixins);
app.use(store);
app.use(router);
app.use(i18n);

app.mount('#app');
