import Vuex from 'vuex';
import Vue from 'vue/dist/vue';

import {
  biz
} from "@/components/biz.js";
import current from "@/components/current.js";
import gridarea from "@/components/gridarea.js";
import {
  gridmember
} from "@/components/gridmember.js";
import {
  template
} from "@/components/template.js";


Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    biz,
    current,
    gridarea,
    gridmember,
    template
  }
});

export default store;