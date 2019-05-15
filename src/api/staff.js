import axios from 'axios';

const emptyStaff = () => ({
  name: "",
  sex: 1,
  state: 1,
  job: "",
  lastLogin: "",
  dep: null
});

const staffSex = (sex) => {
  const allSexs = ['男', '女'];
  if (sex !== undefined) {
    return ['未知', ...allSexs][sex];
  }
  return allSexs;
}

const staffState = (state) => {
  const allStates = ['停用', '激活'];
  if (state !== undefined) {
    return allStates[state];
  }
  allStates.reverse;
  return allStates;
}

async function staff(staffOpt, ...props) {
  if (!staffOpt) {
    return await axios.get(`/staff?${props.join('&')}`);

  } else if (typeof(staffOpt) === 'string') {
    return await axios.get(`/staff/${staffOpt}?${props.join('&')}`);

  } else if (typeof(staffOpt) === 'object') {
    const isNew = !staffOpt._id || staffOpt._id.length === 0;

    const url = isNew ? `/staff?${props.join('&')}` : `/staff/${staffOpt._id}?${props.join('&')}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, staffOpt);
  }

  return void 0;
}

const del = async (staffId) => {
  return await axios.delete(`/staff/${staffId}`);
}

export {
  staff,
  staffState,
  staffSex,
  del,
  emptyStaff
};