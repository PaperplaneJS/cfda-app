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
    'daily': '常规模板',
    'risk': '风险量化模板'
  }
  if (kind !== undefined) {
    return kinds[kind];
  }
  return kinds;
}

const emptyTemplate = (kind = 'daily') => ({
  name: '',
  state: 1,
  kind,
  dep: '',
  staff: '',
  date: '',
  tips: '',
  content: []
})

const emptyMainItem = () => ({
  title: '',
  remark: '',
  detail: []
})

const emptySubItem = (kind = 'daily') => ({
  content: '',
  required: false,
  importent: false,
  type: 1,
  val: kind === 'daily' ? null : [0, 0, 0, 0]
})

const template = async (templateOpt, ...props) => {
  if (!templateOpt) {
    return await axios.get(`/template?${props.join('&')}`);

  } else if (typeof(templateOpt) === 'string') {
    return await axios.get(`/template/${templateOpt}?${props.join('&')}`);

  } else if (typeof(templateOpt) === 'object') {
    const isNew = !templateOpt._id || templateOpt._id.length === 0;

    const url = isNew ? `/template?${props.join('&')}` : `/template/${templateOpt._id}?${props.join('&')}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, templateOpt);
  }

  return void 0;
}

const del = async (lawId) => {
  return await axios.delete(`/template/${lawId}`);
}

export {
  templateState,
  templateKind,
  emptyTemplate,
  emptyMainItem,
  emptySubItem,
  template,
  del
}