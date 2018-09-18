let plan = [{
  id: "1",
  title: "虞山镇2018年食品安全检查计划",
  department: "2",
  staff: "3",
  template: "1",
  kind: "daily",
  date: "2017-11-01 12:00",
  limit: ["2018-01-01", "2018-12-01"],
  state: 1,
  remark: "虞山镇2018年食品安全检查计划，请按照法律法规开展检查",
  post: null
}, {
  id: "2",
  title: "常熟市2018年下半年巡检计划",
  department: "1",
  staff: "1",
  template: "1",
  kind: "daily",
  date: "2018-06-01 12:00",
  limit: ["2018-06-01", "2018-12-01"],
  state: 3,
  post: {
    date: "2018-05-01 13:00",
    postdetail: ["2", "3", "4", "5", "6"],
    remark: "常熟市2018年下半年巡检计划，请按照法律法规开展检查"
  }
}, {
  id: "3",
  title: "常熟市2018年餐饮业检查计划",
  department: "1",
  staff: "1",
  template: "1",
  kind: "daily",
  date: "2018-03-01 12:00",
  limit: ["2018-01-01", "2018-10-01"],
  state: 2,
  post: {
    date: "2018-05-01 13:00",
    postdetail: ["2", "3", "10"],
    remark: "本次检查计划请按照法律法规开展检查",
  }
}, {
  id: "4",
  title: "东南街道办2018年餐饮服务行业专项检查计划",
  department: "12",
  staff: "8",
  template: "1",
  kind: "special",
  special: "本次专项检查结果上报到市局",
  date: "2018-05-01 12:00",
  limit: ["2018-10-15", "2018-11-01"],
  state: 3,
  post: {
    date: "2018-05-01 13:00",
    postdetail: ["2", "3", "10"],
    remark: "请按照法律法规开展检查"
  }
}, {
  id: "5",
  title: "虞山分局2018年食品经营行业检查",
  department: "2",
  staff: "3",
  template: "1",
  kind: "daily",
  special: "本次专项检查结果上报到市局",
  date: "2018-03-01 12:00",
  limit: ["2018-05-15", "2018-11-01"],
  state: 3,
  post: {
    date: "2018-04-01 13:00",
    postdetail: ["2", "3", "10"],
    remark: "请按照法律法规开展检查"
  }
}, {
  id: "6",
  title: "东南街道办2017年餐饮服务行业专项检查计划",
  department: "12",
  staff: "8",
  kind: "special",
  special: "本次专项检查结果上报到市局",
  date: "2017-05-01 12:00",
  limit: ["2017-10-15", "2017-11-01"],
  complete: "2017-10-28 10:00",
  state: 5,
  post: null
}];

/**
 * state   1-待分发  2-已分发(未分派) 3-执行中(分派了) 4-已完成 5-已归档
 * kind    daily-日常检查  special-专项检查  risk-全量检查
 * 
 * 根据state自动区分是否已归档
 */

import {
  copy
} from "@/utils/utils.js";

function getPlanByID(id) {
  return copy(plan).find(t => t.id == id && t.state !== 5);
}

function getPlans(state = null) {
  let plans = copy(plan).filter(t => t.state !== 5);

  if (state) {
    if (Array.isArray(state)) {
      plans = plans.filter(t => state.includes[t.state]);
    } else if (Number.isInteger(state)) {
      plans = plans.filter(t => t.state === state);
    }
  }

  return plans;
}

function getArchives() {
  return copy(plan).filter(t => t.state === 5);
}

export {
  getPlanByID,
  getPlans,
  getArchives
}

export default {
  getPlanByID,
  getPlans
}