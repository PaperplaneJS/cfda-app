import Vue from 'vue';

import cfda_template from "@/component/cfda-template.vue";
import cfda_risk_template from "@/component/cfda-risk-template.vue";
import cfda_record_report from "@/component/cfda-record-report.vue";
import cfda_record_template from "@/component/cfda-record-template.vue";
import cfda_record_risk_template from "@/component/cfda-record-risk-template.vue";

Vue.component(cfda_template.name, cfda_template);
Vue.component(cfda_risk_template.name, cfda_risk_template);
Vue.component(cfda_record_report.name, cfda_record_report);
Vue.component(cfda_record_template.name, cfda_record_template);
Vue.component(cfda_record_risk_template.name, cfda_record_risk_template);