import Vue from 'vue/dist/vue';
import store from '@/api/state.js';
import router from './router';
import '@/plugins/element.js';

import "@/assets/style/public.scss";

Vue.config.productionTip = process.env.NODE_ENV !== "development";

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("currentUser") && !store.state.currentUser) {
    store.state.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  }

  if (to.path !== "/login" && !store.state.currentUser) {
    next("/login");
  } else if (to.path === "/login" && store.state.currentUser) {
    next(false);
  } else {
    next();
  }
});

new Vue({
  router,
  store
}).$mount('#app');