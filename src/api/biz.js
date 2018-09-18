import axios from 'axios';
import qs from 'qs';

async function getAllBizs() {
  let res = await axios.post("/v1/company/list.json", qs.stringify({
    pagesize: 9999
  }));

  return res.data.data;
}

async function getBizByID(id) {
  let res = await axios.get(`/v1/company.json/${id}`);

  return res.data.data;
}

export {
  getAllBizs,
  getBizByID
};

export default {
  getAllBizs,
  getBizByID
};