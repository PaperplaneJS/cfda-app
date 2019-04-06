import Vuex from 'vuex';
import Vue from 'vue/dist/vue';

import {
  notice
} from "@/oldAPI/old_notice.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentUser: null,
    notice
  }
});

export default store;