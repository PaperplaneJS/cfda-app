import Vuex from 'vuex';
import Vue from 'vue/dist/vue';

import { notice } from "@/oldAPI/old_notice.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentUser: null,
    notice
  },

  mutations: {
    login(state, staffData) {
      state.currentUser = staffData;
    },

    auth(state, staffData) {
      state.currentUser = staffData;
    },

    logout(state) {
      state.currentUser = null;
    }
  }
});

export default store;