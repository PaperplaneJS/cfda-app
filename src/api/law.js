import axios from 'axios';

const lawState = (state) => {
  const allStates = ['停用', '正常'];
  if (state !== undefined) {
    return allStates[state];
  }
  allStates.reverse;
  return allStates;
}
const emptyLaw = () => ({
  num: '',
  state: 1,
  name: '',
  dep: '',
  staff: '',
  date: '',
  content: ''
})

async function law(lawOpt) {
  if (!lawOpt) {
    return await axios.get('/law');

  } else if (typeof(lawOpt) === 'string') {
    return await axios.get(`/law/${lawOpt}`);

  } else if (typeof(lawOpt) === 'object') {
    const isNew = !lawOpt._id || lawOpt._id.length === 0;

    const url = isNew ? '/law' : `/law/${lawOpt._id}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, lawOpt);
  }

  return void 0;
}

async function del(lawId) {
  return await axios.delete(`/law/${lawId}`);
}

export {
  lawState,
  emptyLaw,
  law,
  del
}