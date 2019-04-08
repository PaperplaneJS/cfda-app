import Vue from 'vue/dist/vue';
import store from '@/api/state.js';
import { auth } from '@/api/action';
import router from './router';
import axios from 'axios';
import Cookies from 'js-cookie';
import '@/plugins/element.js';
import '@/assets/style/public.scss';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);

Vue.config.productionTip = process.env.NODE_ENV !== 'development';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.currentUser) {
    if (Cookies.get('cfdaId')) {
      auth().then(data => {
        store.state.currentUser = data.data;
        next();
      }).catch(() => {
        store.state.currentUser = null;
        next('/login');
      });
    } else {
      next('/login');
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