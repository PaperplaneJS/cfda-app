import axios from "axios";

const recordResult = (result) => {
  const allResults = ['合格', '基本合格', '不合格'];
  if (result) {
    return ['未知', ...allResults][result];
  }

  return allResults;
}

const recordHandle = (handle) => {
  const allHandles = ['通过', '责令整改', '停业整顿'];
  if (handle) {
    return ['未知', ...allHandles][handle];
  }

  return allHandles;
}

const emptyRecord = () => ({
  _task: '',
  _biz: '',
  staff1: '',
  staff2: '',
  date: '',
  result: 1,
  handle: 1,
  detail: [],
  report: null
});

const emptyRecordReport = () => ({
  remark: "",
  num: "",
  count: 0,
  bizopinion: "",
  laweropinion: ""
})

const record = async (recordOpt, ...props) => {
  if (Array.isArray(recordOpt)) {
    return await axios.get(`/task/${recordOpt[0]}/record/${recordOpt[1]}?${props.join('&')}`);

  } else if (typeof(recordOpt) === 'string') {
    return await axios.get(`/record/${recordOpt}?${props.join('&')}`);

  } else if (typeof(recordOpt) === 'object') {
    return await axios.post(`/record?${props.join('&')}`, recordOpt);
  }
}

const list = async (taskId) => {
  return await axios(`/task/${taskId}/record`);
}

export { recordResult, recordHandle, emptyRecord, emptyRecordReport, record, list }