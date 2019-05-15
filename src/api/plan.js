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
  postdate: '',
  recive: []
}, kind === 'special' ? { special: '' } : {})

const plan = async (planOpt, ...props) => {
  if (!planOpt) {
    return await axios.get(`/plan?${props.join('&')}`);

  } else if (typeof(planOpt) === 'string') {
    return await axios.get(`/plan/${planOpt}?${props.join('&')}`);

  } else if (typeof(planOpt) === 'object') {
    const isNew = !planOpt._id || planOpt._id.length === 0;

    const url = isNew ? `/plan?${props.join('&')}` : `/plan/${planOpt._id}?${props.join('&')}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, planOpt);
  }

  return void 0;
}

const del = async (planId) => {
  return await axios.delete(`/plan/${planId}`);
}

export { planKind, planState, emptyPlan, plan, del }