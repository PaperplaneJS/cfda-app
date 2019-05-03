import axios from "axios";

const taskState = (state) => {
  const allStates = ['已派发', '执行中', '完成', '已终止'];
  if (state) {
    return ['未知', ...allStates][state];
  }

  return allStates;
}

const emptyTask = () => ({
  _plan: '',
  desc: '',
  limit: [],
  state: 1,
  date: '',
  staff: '',
  taskstaff: [],
  taskbiz: [],
  progress: []
})

const task = async (taskOpt) => {
  if (typeof(taskOpt) === 'string') {
    return await axios.get(`/plan/${taskOpt}/task`);

  } else if (typeof(taskOpt) === 'object') {
    const isNew = !taskOpt._id || taskOpt._id.length === 0;

    const url = isNew ? `/plan/${taskOpt._plan}/task` : `/plan/${taskOpt._plan}/task/${taskOpt._id}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, taskOpt);
  }

  return void 0;
}

export { emptyTask, taskState, task }