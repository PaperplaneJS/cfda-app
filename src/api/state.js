import Vuex from 'vuex';
import Vue from 'vue/dist/vue';

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    currentUser: null
  }
});

export default store;