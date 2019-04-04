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
  const underParam = isUnder ? 'under=1' : '';
  const cascadeParam = isCascade ? '&cascade=1' : '';

  if (!depOpt) {
    let url = `/dep?${underParam}&${cascadeParam}`;
    return await axios.get(url);

  } else if (typeof(depOpt) === 'string') {
    let url = `/dep/${depOpt}?${underParam}&${cascadeParam}`;
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