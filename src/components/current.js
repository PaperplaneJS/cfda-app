let staff = {
  id: 1,
  name: "顾小华",
  department: "虞山街道办"
}

let notice = [{
    id: 1,
    title: "有新的计划待接收",
    type: "info",
    content: "有新检查计划[2018年下半年全市食品加工单位检查通知]已放入[计划接收]列表内"
  },
  {
    id: 2,
    title: "请在12月15日前进行风险评级",
    type: "warning",
    content: "当前区域内还有12家单位没有进行年度风险评级/检查，请于12月15日前完成"
  },
  {
    id: 3,
    title: "新的法律法规已印发",
    type: "warning",
    content: "新的法律法规已经印发，请前往法律法规菜单内进行查看"
  }
]

export default {
  staff,
  notice
}