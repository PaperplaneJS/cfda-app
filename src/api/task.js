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
  completebiz: [],
  progress: []
})

const task = async (taskOpt, ...props) => {
  if (typeof(taskOpt) === 'string') {
    return await axios.get(`/task/${taskOpt}?${props.join('&')}`);

  } else if (typeof(taskOpt) === 'object') {
    const isNew = !taskOpt._id || taskOpt._id.length === 0;
    const url = isNew ? `/plan/${taskOpt._plan}/task?${props.join('&')}` : `/task/${taskOpt._id}?${props.join('&')}`;
    const method = isNew ? 'post' : 'put';

    return await axios[method](url, taskOpt);
  }

  return void 0;
}

const list = async (planId) => {
  return await axios.get(`/plan/${planId}/task`);
}

export { emptyTask, taskState, task, list }