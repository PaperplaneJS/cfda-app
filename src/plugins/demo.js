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
import {
  archives
} from "@/components/archives.js";
import {
  task
} from "@/components/task.js";
import {
  risk
} from "@/components/risk.js";

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
    plan,
    archives,
    task,
    risk
  }
});

export default store;