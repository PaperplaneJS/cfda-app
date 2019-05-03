import axios from 'axios';

const emptySms = () => ({
  title: '',
  date: '',
  staff: '',
  dep: '',
  content: '',
  post: [],
  recive: []
})

const sms = async (smsOpt) => {
  if (!smsOpt) {
    return await axios.get('/sms');

  } else if (typeof(smsOpt) === 'string') {
    return await axios.get(`/sms/${smsOpt}`);

  } else if (typeof(smsOpt) === 'object') {
    return await axios.post(`/sms`, smsOpt);
  }

  return void 0;
}


export { sms, emptySms };