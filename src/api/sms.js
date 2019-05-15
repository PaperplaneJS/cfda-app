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

const sms = async (smsOpt, ...props) => {
  if (!smsOpt) {
    return await axios.get(`/sms?${props.join('&')}`);

  } else if (typeof(smsOpt) === 'string') {
    return await axios.get(`/sms/${smsOpt}?${props.join('&')}`);

  } else if (typeof(smsOpt) === 'object') {
    return await axios.post(`/sms?${props.join('&')}`, smsOpt);
  }

  return void 0;
}

export { sms, emptySms };