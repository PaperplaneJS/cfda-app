import axios from 'axios';

const emptyStaff = () => ({
  name: "",
  sex: 1,
  state: 1,
  job: "",
  lastLogin: "",
  dep: null
});

async function staff(staffOpt) {
  if (!staffOpt) {
    return await axios.get('/staff');

  } else if (typeof(staffOpt) === 'string') {
    return await axios.get(`/staff/${staffOpt}`);

  } else if (typeof(staffOpt) === 'object') {
    const isNew = !staffOpt._id || staffOpt._id.length === 0;

    const url = isNew ? '/staff' : `/staff/${staffOpt._id}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, staffOpt);
  }

  return void 0;
}

async function staffByDep(depId, isUnder) {
  const underParam = isUnder ? `under=1` : ``;
  const url = `/staff?dep=${depId}&${underParam}`;
  return await axios.get(url);
}

async function del(staffId) {
  return await axios.delete(`/staff/${staffId}`);
}

export {
  staff,
  staffByDep,
  del,
  emptyStaff
};