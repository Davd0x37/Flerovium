import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './App.css';

import i18n from './plugins/i18n';
import storePersist from './plugins/store.persist';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(storePersist);

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount('#app');

localStorage.debug = '*';
