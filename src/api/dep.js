import axios from 'axios';

const depState = (state) => {
  const allStates = ['停用', '正常'];
  if (state !== undefined) {
    return allStates[state];
  }
  allStates.reverse;
  return allStates;
}

const emptyDep = () => ({
  code: '',
  name: '',
  state: 1,
  _rel: []
})

const dep = async (depOpt, ...props) => {
  if (!depOpt) {
    return await axios.get(`/dep?${props.join('&')}`);

  } else if (typeof(depOpt) === 'string') {
    return await axios.get(`/dep/${depOpt}?${props.join('&')}`);

  } else if (typeof(depOpt) === 'object') {
    const isNew = !depOpt._id || depOpt._id.length === 0;
    const method = isNew ? 'post' : 'put';
    let url = isNew ? `/dep?${props.join('&')}` : `/dep/${depOpt._id}?${props.join('&')}`;

    return await axios[method](url, depOpt);
  }

  return void 0;
}

const del = async (depId) => {
  return await axios.delete(`/dep/${depId}`);
}

export {
  dep,
  del,
  depState,
  emptyDep
};