import Vue from 'vue/dist/vue';
import store from '@/api/state.js';
import { Auth } from '@/api/action';
import router from './router';
import axios from 'axios';
import Cookies from 'js-cookie';
import '@/plugins/element.js';
import '@/assets/style/public.scss';


Vue.config.productionTip = process.env.NODE_ENV !== 'development';

axios.defaults.baseURL = 'http://127.0.0.1:9000';
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.currentUser) {
    if (!store.state.currentUser && Cookies.get('cfdaId')) {
      Auth().then(data => {
        store.state.currentUser = data.data;
        next();
      }, () => { next('/login') })
    }
  } else if (to.path === '/login' && store.state.currentUser) {
    next(false);
  } else {
    next();
  }
});

new Vue({
  router,
  store
}).$mount('#app');