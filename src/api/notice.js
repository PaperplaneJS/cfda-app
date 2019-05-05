const notice = async (noticeOpt) => {
  return {
    data: [{
      id: "1",
      type: "info",
      title: "有新的法律文书下发",
      content: "市局下发了新的法律文书[关于印发常熟市市场监督管理局行政执法文书格式文本的通知]，请您及时查看"
    }, {
      id: "2",
      type: "warning",
      title: "请及时完成检查任务",
      content: "距离检查任务完成期限不足15天，请及时完成检查任务"
    }]
  }
}

export { notice }