// import 'es6-promise/auto';

import { createApp } from 'vue';

import App from './App.vue';
import './App.css';
// import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
// import 'line-awesome'

// import '@fontsource/roboto';

import mixins from './plugins/mixins';
import i18n from './plugins/i18n';
import router from './router';
import store from './store';

const app = createApp(App);

app.mixin(mixins);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');

// if (import.meta.hot) {
// 	import.meta.hot.accept();
// 	import.meta.hot.dispose(() => {
// 		app.unmount();
// 	});
// }
