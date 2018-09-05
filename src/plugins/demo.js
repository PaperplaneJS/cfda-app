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
import {
  law
} from "@/components/law.js";
import {
  sms
} from "@/components/sms.js";
import {
  plan
} from "@/components/plan.js";

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    biz,
    current,
    gridarea,
    gridmember,
    template,
    law,
    sms,
    plan
  }
});

export default store;