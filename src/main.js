import Vue from 'vue/dist/vue';
import router from './router';
import './plugins/element.js';
import Vuex from 'vuex';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  router
}).$mount('#app');