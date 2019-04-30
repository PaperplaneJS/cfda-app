import axios from "axios";

const planKind = (kind) => {
  const allKinds = {
    'daily': '常规检查',
    'special': '专项检查',
    'risk': '风险量化评级'
  }
  if (kind !== undefined) {
    return allKinds[kind];
  }
  return allKinds;
}
const planState = (state) => {
  const allStates = ['待分发', '未开始', '执行中', '已完成', '已终止'];
  if (state) {
    return ['未知', ...allStates][state];
  }

  return allStates;
}
const emptyPlan = (kind = 'daily') => Object.assign({
  title: '',
  kind,
  state: 1,
  dep: '',
  staff: '',
  template: '',
  remark: '',
  date: '',
  limit: [],
  post: [],
  recive: []
}, kind === 'special' ? { special: '' } : {})

async function plan(planOpt) {
  if (!planOpt) {
    return await axios.get('/plan');

  } else if (typeof(planOpt) === 'string') {
    return await axios.get(`/plan/${planOpt}`);

  } else if (typeof(planOpt) === 'object') {
    const isNew = !planOpt._id || planOpt._id.length === 0;

    const url = isNew ? '/plan' : `/plan/${planOpt._id}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, planOpt);
  }

  return void 0;
}

async function del(planId) {
  return await axios.delete(`/plan/${planId}`);
}

export { planKind, planState, emptyPlan, plan, del }