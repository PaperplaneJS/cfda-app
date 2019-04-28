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


async function dep(depOpt, isUnder, isCascade) {
  const param = [];
  if (isUnder) {
    param.push('under=1');
  }
  if (isCascade) {
    param.push('cascade=1')
  }
  const query = param.join('&');

  if (!depOpt) {
    let url = `/dep?${query}`;
    return await axios.get(url);

  } else if (typeof(depOpt) === 'string') {
    let url = `/dep/${depOpt}?${query}`;
    return await axios.get(url);

  } else if (typeof(depOpt) === 'object') {
    const isNew = !depOpt._id || depOpt._id.length === 0;
    const method = isNew ? 'post' : 'put';
    let url = isNew ? '/dep' : `/dep/${depOpt._id}`;

    return await axios[method](url, depOpt);
  }

  return void 0;
}

async function del(depId) {
  return await axios.delete(`/dep/${depId}`);
}

export {
  dep,
  del,
  depState,
  emptyDep
};