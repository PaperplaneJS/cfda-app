import Vuex from 'vuex';
import Vue from 'vue/dist/vue';

import {
  notice
} from "@/api/old_notice.js";

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    currentUser: null,
    notice
  }
});

export default store;