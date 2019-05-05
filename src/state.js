import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentUser: null,
    notice: []
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
    },

    addNotice(notice) {
      state.notice.push(notice);
    }
  }
});

export default store;