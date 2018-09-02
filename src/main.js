import Vue from 'vue/dist/vue';
import router from './router';
import './plugins/element.js';
import Vuex from 'vuex';
import demoData from './demo.js';
import "@/assets/style/public.scss";

Vue.config.productionTip = false;

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    demoData
  }
});

new Vue({
  router,
  store
}).$mount('#app');