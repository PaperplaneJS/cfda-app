import Vue from 'vue/dist/vue';
import router from './router';
import store from './plugins/demo.js';
import './plugins/element.js';

import "@/assets/style/public.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store
}).$mount('#app');