import axios from 'axios';

async function Biz(bizId) {
  const url = bizId ? `/biz/${bizId}` : '/biz';
  return await axios.get(url);
}
export {
  Biz
};