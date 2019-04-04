import axios from 'axios';

const templateState = (state) => {
  const allStates = ['停用', '正常'];
  if (state !== undefined) {
    return allStates[state];
  }
  allStates.reverse;
  return allStates;
}
const templateKind = (kind) => {
  const kinds = {
    "daily": "常规模板",
    "risk": "风险量化模板"
  }
  if (state !== undefined) {
    return allStates[kind];
  }
  return kinds;
}
const emptyTemplate = () => ({
  state: 1,
  kind: '',
  name: '',
  dep: '',
  staff: '',
  date: '',
  tips: '',
  content: ''
})

async function template(templateOpt) {
  if (!templateOpt) {
    return await axios.get('/template');

  } else if (typeof(templateOpt) === 'string') {
    return await axios.get(`/template/${templateOpt}`);

  } else if (typeof(templateOpt) === 'object') {
    const isNew = !templateOpt._id || templateOpt._id.length === 0;

    const url = isNew ? '/template' : `/template/${templateOpt._id}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, templateOpt);
  }

  return void 0;
}

async function del(lawId) {
  return await axios.delete(`/template/${lawId}`);
}

export {
  templateState,
  templateKind,
  emptyTemplate,
  template,
  del
}