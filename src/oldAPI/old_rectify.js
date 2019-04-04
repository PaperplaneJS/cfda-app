let rectify = [{
  id: "r1",
  taskid: "p4d2t1r2",
  planid: "4",
  bizid: "2212780685b9f5c91e61663035320420",
  suggest: "于3个月内进行整改，重点在卫生方面、安全制度方面",
  date: "2018-05-25 15:30"
}];

import {
  copy
} from "@/utils/utils.js";

function getRectifys() {
  return copy(rectify);
}

function getRectifyByID(id) {
  return copy(rectify).find(t => t.id === id);
}

export {
  getRectifys,
  getRectifyByID
}

export default {
  getRectifys,
  getRectifyByID
}