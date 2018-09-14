let area = [{
  id: "1",
  code: "1",
  name: "常熟市市局",
  state: 1,
  children: [{
    id: "2",
    code: "1-1",
    name: "虞山镇分局",
    state: 1,
    children: [{
      id: "12",
      code: "1-1-1",
      state: 1,
      name: "东南街道办"
    }, {
      id: "13",
      code: "1-1-2",
      state: 1,
      name: "虞山街道办"
    }, {
      id: "14",
      code: "1-1-3",
      state: 1,
      name: "琴川街道办"
    }, {
      id: "15",
      code: "1-1-4",
      state: 1,
      name: "莫城街道办"
    }, {
      id: "16",
      code: "1-1-5",
      state: 1,
      name: "常福街道办"
    }]
  }, {
    id: "3",
    code: "1-2",
    state: 1,
    name: "梅李镇分局",
    children: [{
      id: "17",
      code: "1-2-1",
      state: 1,
      name: "梅李食药监局"
    }]
  }, {
    id: "4",
    code: "1-3",
    state: 1,
    name: "海虞镇分局",
    children: [{
      id: "18",
      code: "1-3-1",
      state: 1,
      name: "海虞食药监局"
    }]
  }, {
    id: "5",
    code: "1-4",
    state: 1,
    name: "碧溪新区",
    children: [{
      id: "19",
      code: "1-4-1",
      state: 1,
      name: "碧溪街道办"
    }]
  }, {
    id: "6",
    code: "1-5",
    state: 1,
    name: "古里镇分局",
    children: [{
      id: "20",
      code: "1-5-1",
      state: 1,
      name: "古里食药监局"
    }]
  }, {
    id: "7",
    code: "1-6",
    state: 1,
    name: "沙家浜镇分局",
    children: [{
      id: "21",
      code: "1-6-1",
      state: 1,
      name: "沙家浜食药监局"
    }]
  }, {
    id: "8",
    code: "1-7",
    state: 1,
    name: "支塘镇分局",
    children: [{
      id: "22",
      code: "1-7-1",
      state: 1,
      name: "支塘食药监局"
    }]
  }, {
    id: "9",
    code: "1-8",
    state: 1,
    name: "董浜镇分局",
    children: [{
      id: "23",
      code: "1-8-1",
      state: 1,
      name: "董浜食药监局"
    }]
  }, {
    id: "10",
    code: "1-9",
    state: 1,
    name: "尚湖镇分局",
    children: [{
      id: "25",
      code: "1-9-1",
      state: 1,
      name: "尚湖食药监局"
    }]
  }, {
    id: "11",
    code: "1-10",
    state: 1,
    name: "辛庄镇分局",
    children: [{
      id: "26",
      code: "1-10-1",
      state: 1,
      name: "辛庄食药监局"
    }]
  }]
}];

function getAreaByID(id) {
  let result = null;
  let find = function (item) {
    if (item.id == id) {
      result = item;
    }
    if (item.children) {
      item.children.forEach(t => find(t));
    }
  };

  area.forEach(t => find(t));
  return result;
}

function getAreaIDArray(id) {
  let result = null;
  let find = function (item, arr) {
    let temp = arr.slice(0);
    temp.push(item.id);

    if (item.id == id) {
      result = temp;
    }
    if (item.children) {
      item.children.forEach(t => find(t, temp));
    }
  };

  area.forEach(t => find(t, []));

  return result;
}

function getArea() {
  return area;
}

function getAllAreas() {
  let result = [];
  let find = function (item) {
    result.push(item);
    if (item.children) {
      item.children.forEach(t => find(t));
    }
  };

  area.forEach(t => find(t));
  return result;
}

export default {
  getAreaByID,
  getAreaIDArray,
  getArea,
  getAllAreas
}

export {
  getAreaByID,
  getAreaIDArray,
  getArea,
  getAllAreas
}