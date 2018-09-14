let law = [{
  id: "1",
  num: "常市监检字[2017]号",
  name: "关于印发常熟市市场监督管理局行政执法文书格式文本的通知",
  department: "常熟市食药监局",
  date: "2017-05-24 13:15",
  state: 1
}];

function getLawByID(id) {
  return law.find(t => t.id === id);
}

function getLaws() {
  return law;
}

export {
  getLawByID,
  getLaws
}

export default {
  getLawByID,
  getLaws
}