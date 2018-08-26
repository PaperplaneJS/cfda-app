import Vue from 'vue/dist/vue';
import router from './router';
import './plugins/element.js';

Vue.config.productionTip = false;

new Vue({
  router
}).$mount('#app');
