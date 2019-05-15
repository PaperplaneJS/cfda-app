import axios from 'axios';

const bizKind = (kind) => {
  const allKinds = ['食品经营', '食品小作坊', '网上商家', '餐饮服务']
  if (kind) {
    return ['未知', ...allKinds][kind];
  }

  return allKinds;
}

const bizCategory = (category) => {
  const allCategory = ['餐馆', '快餐店', '小吃店', '饮品店', '食堂'];
  if (category) {
    return ['未知', ...allCategory][category];
  }

  return allCategory;
}

const bizState = (state) => {
  const allStates = ['关闭', '正常'];
  if (state !== undefined) {
    return allStates[state];
  }
  allStates.reverse;
  return allStates;
}

const emptyBiz = () => ({
  name: '',
  state: 1,
  kind: 1,
  category: bizCategory()[0],
  area: '',
  address: '',
  contact: '',
  phone: '',
  tel: '',
  gps: [null, null],
  lic: null
})

const emptyLic = () => ({
  code: '',
  biz: '',
  lawer: '',
  socialnum: '',
  dep: null,
  staff: null,
  send: null,
  bizaddr: '',
  logaddr: '',
  date: '',
  daterange: ['', '']
})

const biz = async (bizOpt, ...props) => {
  if (!bizOpt) {
    return await axios.get(`/biz?${props.join('&')}`);

  } else if (typeof(bizOpt) === 'string') {
    return await axios.get(`/biz/${bizOpt}?${props.join('&')}`);

  } else if (typeof(bizOpt) === 'object') {
    const isNew = !bizOpt._id || bizOpt._id.length === 0;

    const url = isNew ? `/biz?${props.join('&')}` : `/biz/${bizOpt._id}?${props.join('&')}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, bizOpt);
  }

  return void 0;
}

const del = async (bizId) => {
  return await axios.delete(`/biz/${bizId}`);
}

export { biz, del, bizKind, bizCategory, bizState, emptyBiz, emptyLic };