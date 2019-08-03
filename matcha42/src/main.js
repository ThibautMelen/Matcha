import Vue from 'vue'
// import axios from 'axios';
import App from './App.vue';
import VueRouter from 'vue-router';

import { routes } from './routes';

// Vue.prototype.$http = axios;
Vue.use(VueRouter);

const router = new VueRouter ({
  mode: 'history',
  routes
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
