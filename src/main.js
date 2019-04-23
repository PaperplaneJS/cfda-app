import Vue from 'vue/dist/vue';
import store from './state.js';
import router from './router';
import axios from 'axios';
import '@/assets/style/public.scss';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

import cfdatemplate from "@/component/cfda-template";
Vue.component('cfda-template', cfdatemplate);

Vue.config.productionTip = process.env.NODE_ENV !== 'development';

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
axios.defaults.withCredentials = true;

new Vue({
  router,
  store
}).$mount('#app');