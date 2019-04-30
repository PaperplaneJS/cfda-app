import Vue from 'vue';
import axios from 'axios';
import store from '@/state.js';
import router from '@/router.js';

import '@/assets/style/public.scss';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

import '@/component.js';

Vue.config.productionTip = process.env.NODE_ENV !== 'development';

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.withCredentials = true;

new Vue({
  el: '#app',
  router,
  store
});