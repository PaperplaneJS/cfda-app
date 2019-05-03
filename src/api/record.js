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

const record = async (recordOpt) => {

}

export { recordResult, recordHandle, emptyRecord, record }