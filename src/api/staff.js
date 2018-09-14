let staff = [{
  id: "1",
  area: "1",
  name: "顾小华",
  sex: 1,
  state: 1,
  job: "副局长"
}, {
  id: "2",
  area: "1",
  name: "张小强",
  sex: 1,
  state: 1,
  job: "局长"
}, {
  id: "3",
  area: "2",
  name: "李小明",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "4",
  area: "3",
  name: "陈小刚",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "5",
  area: "4",
  name: "王小刚",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "6",
  area: "5",
  name: "王小红",
  sex: 2,
  state: 1,
  job: "科员"
}, {
  id: "7",
  area: "12",
  name: "张小芳",
  sex: 2,
  state: 1,
  job: "科长"
}, {
  id: "8",
  area: "12",
  name: "吴小明",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "9",
  area: "12",
  name: "刘小华",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "10",
  area: "12",
  name: "李小红",
  sex: 2,
  state: 1,
  job: "科员"
}, {
  id: "11",
  area: "13",
  name: "周小强",
  sex: 1,
  state: 1,
  job: "科长"
}, {
  id: "12",
  area: "13",
  name: "赵小明",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "13",
  area: "14",
  name: "刘小强",
  sex: 1,
  state: 1,
  job: "科员"
}, {
  id: "14",
  area: "17",
  name: "周小红",
  sex: 2,
  state: 1,
  job: "科员"
}, {
  id: "15",
  area: "18",
  name: "顾小强",
  sex: 1,
  state: 1,
  job: "副局长"
}];

function getStaffs() {
  return staff;
}

function getStaffByID(id) {
  return staff.find(t => t.id === id);
}

function getStaffsByArea(area) {
  return staff.filter(t => t.area === area);
}

export {
  getStaffs,
  getStaffByID,
  getStaffsByArea
}

export default {
  getStaffs,
  getStaffByID,
  getStaffsByArea
}