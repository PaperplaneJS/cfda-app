/**
 * state   1-待分发  2-已分发(未分派) 3-执行中(分派了) 4-已完成
 * kind    daily-日常检查  special-专项检查  risk-全量检查
 */

export let plan = [{
  id: "1",
  title: "虞山镇2018年食品安全检查计划",
  department: "虞山镇分局",
  staff: "李小明",
  kind: "daily",
  date: "2017-11-01 12:00",
  limit: ["2018-01-01", "2018-12-01"],
  state: 1,
  remark: "虞山镇2018年食品安全检查计划，请按照法律法规开展检查",
  templateid:"1"
}, {
  id: "2",
  title: "常熟市2018年下半年巡检计划",
  department: "常熟市",
  staff: "顾小华",
  kind: "daily",
  date: "2018-06-01 12:00",
  limit: ["2018-06-01", "2018-12-01"],
  state: 3,
  post: "2018-05-01 13:00",
  postdetail: ["2", "3", "4", "5", "6"],
  remark: "常熟市2018年下半年巡检计划，请按照法律法规开展检查",
  templateid:"1"
}, {
  id: "3",
  title: "常熟市2018年餐饮业检查计划",
  department: "常熟市",
  staff: "顾小华",
  kind: "daily",
  date: "2018-03-01 12:00",
  limit: ["2018-01-01", "2018-10-01"],
  state: 2,
  post: "2018-05-01 13:00",
  postdetail: ["2", "3", "10"],
  remark: "本次检查计划请按照法律法规开展检查",
  templateid:"1"
}, {
  id: "4",
  title: "东南街道办2018年餐饮服务行业专项检查计划",
  department: "东南街道办",
  staff: "吴小明",
  kind: "special",
  special: "本次专项检查结果上报到市局",
  date: "2018-05-01 12:00",
  limit: ["2018-10-15", "2018-11-01"],
  state: 3,
  post: "2018-05-01 13:00",
  postdetail: ["2", "3", "10"],
  remark: "请按照法律法规开展检查",
  templateid:"1"
},{
  id: "5",
  title: "虞山分局2018年食品经营行业检查",
  department: "虞山镇分局",
  staff: "李小明",
  kind: "daily",
  special: "本次专项检查结果上报到市局",
  date: "2018-03-01 12:00",
  limit: ["2018-05-15", "2018-11-01"],
  state: 3,
  post: "2018-04-01 13:00",
  postdetail: ["2", "3", "10"],
  remark: "请按照法律法规开展检查",
  templateid:"1"
}];