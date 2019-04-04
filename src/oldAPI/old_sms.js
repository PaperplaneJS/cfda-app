let sms = [{
    id: "1",
    title: "关于餐饮行业加强检查工作的通知",
    department: "虞山分局",
    staff: "顾小华",
    date: "2018-08-01 13:00",
    read: false,
    content: "消息正文 (测试用)"
  },
  {
    id: "2",
    title: "关于新的法律法规下发工作的通知",
    department: "虞山分局",
    staff: "顾小华",
    date: "2018-08-01 13:00",
    read: true,
    content: "消息正文 (测试用)"
  }
];

import {
  copy
} from "@/utils/utils.js";

function getAllSMS() {
  return copy(sms);
}

function getSMSByID(id) {
  return copy(sms).find(t => t.id === id);
}

export {
  getAllSMS,
  getSMSByID
}

export default {
  getAllSMS,
  getSMSByID
}