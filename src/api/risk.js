import axios from 'axios';

const riskKind = (kind) => {
  const allKinds = ['特大、大型餐饮单位', '中、小、微型餐饮单位', '集体用餐配送、中央厨房', '单位食堂']
  if (kind) {
    return ['未知', ...allKinds][kind];
  }

  return allKinds;
}

const riskLv = (lv) => {
  const allLvs = ['优秀 (90+)', '良好 (75+)', '一般 (60+)', '不合格']
  if (lv) {
    return ['未知', ...allLvs][lv];
  }

  return allLvs;
}

const emptyRisk = () => ({
  year: (new Date()).getFullYear(),
  _plan: '',
  _biz: '',
  staff: '',
  date: '',
  kind: 1,
  detail: [],
  point: null,
  level: null
})

const risk = async (riskOpt, ...props) => {
  if (!riskOpt) {
    return await axios.get(`/risk?${props.join('&')}`);

  } else if (typeof(riskOpt) === 'string') {
    return await axios.get(`/risk/${riskOpt}?${props.join('&')}`);

  } else if (typeof(riskOpt) === 'object') {
    return await axios.post(`/risk?${props.join('&')}`, riskOpt);

  }

  return void 0;
}

export { risk, emptyRisk, riskKind, riskLv };