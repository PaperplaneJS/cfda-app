let menu = [{
    label: "首页",
    url: "index",
    icon: "el-icon-star-off",
    promission: [1, 2]
  },
  {
    label: "基础信息",
    url: "base",
    icon: "el-icon-tickets",
    promission: [1, 2],
    group: [{
      label: "食品企业",
      url: "biz",
      promission: [1, 2]
    }, {
      label: "食品小作坊",
      url: "workshop",
      promission: [1, 2]
    }, {
      label: "网上商家",
      url: "netshop",
      promission: [1, 2]
    }, {
      label: "模板管理",
      url: "template",
      promission: [1, 2]
    }, {
      label: "法律法规管理",
      url: "law",
      promission: [1, 2]
    }, {
      label: "信息管理",
      url: "import",
      promission: [1]
    }]
  },
  {
    label: "网格化管理",
    url: "grid",
    icon: "el-icon-menu",
    promission: [2],
    group: [{
        label: "网格区域管理",
        url: "area",
        promission: [2]
      },
      {
        label: "网格人员管理",
        url: "member",
        promission: [2]
      }
    ]
  },
  {
    label: "消息管理",
    url: "sms",
    icon: "el-icon-message",
    promission: [1, 2],
    group: [{
        label: "消息列表",
        url: "",
        promission: [1, 2]
      },
      {
        label: "消息发布",
        url: "post",
        promission: [1, 2]
      }
    ]
  },
  {
    label: "计划管理",
    url: "plan",
    icon: "el-icon-document",
    promission: [1, 2],
    group: [{
        label: "查看制定",
        url: "list",
        promission: [2]
      },
      {
        label: "计划分发",
        url: "post",
        promission: [2]
      },
      {
        label: "计划接收",
        url: "recive",
        promission: [1]
      },
      {
        label: "计划归档",
        url: "archives",
        promission: [1, 2]
      }
    ]
  },
  {
    label: "日常检查",
    url: "daily",
    icon: "el-icon-date",
    promission: [1, 2],
    group: [{
        label: "任务分派",
        url: "post",
        promission: [1]
      },
      {
        label: "任务监管",
        url: "monitor",
        promission: [1, 2]
      }
      // ,
      // {
      //   label: "检查报告",
      //   url: "report",
      //   promission: [1, 2]
      // }
    ]
  },
  {
    label: "专项检查",
    url: "special",
    icon: "el-icon-star-on",
    promission: [1, 2],
    group: [{
        label: "任务分派",
        url: "post",
        promission: [1]
      },
      {
        label: "任务监管",
        url: "monitor",
        promission: [1, 2]
      }
      // ,
      // {
      //   label: "检查报告",
      //   url: "report",
      //   promission: [1, 2]
      // }
    ]
  },
  {
    label: "量化评级",
    url: "risk",
    icon: "el-icon-sort",
    promission: [1, 2]
  },
  {
    label: "数据监控",
    url: "datamonitor",
    icon: "el-icon-refresh",
    promission: [2]
  },
  {
    label: "行政处罚",
    url: "rectify",
    icon: "el-icon-bell",
    promission: [1, 2]
  },
  {
    label: "跟踪监督",
    url: "trace",
    icon: "el-icon-view",
    promission: [2]
  },
  {
    label: "统计分析",
    url: "count",
    icon: "el-icon-edit-outline",
    promission: [2]
  },
  {
    label: "系统管理",
    url: "option",
    icon: "el-icon-setting",
    promission: [1, 2]
  }
];

function getMenu() {
  return menu;
}

import {
  copy,
  uuid
} from "@/utils/utils.js";

function getMenuWithPath(promission = null) {
  let m = copy(menu);
  let genPath = function (menuItem, index, fatherItem, basePath, basePathArray) {

    if (promission && !menuItem.promission.includes(promission)) {
      delete fatherItem[index];
      return;
    }

    menuItem.id = uuid(6, 16);

    if (menuItem.url.trim().length > 0) {
      menuItem.path = `${basePath}/${menuItem.url}`;
      menuItem.pathArray = [...basePathArray, menuItem.url];
    } else {
      menuItem.path = `${basePath}`;
      menuItem.pathArray = [...basePathArray];
    }

    if (menuItem.group) {
      menuItem.group.forEach((t, index, array) => genPath(t, index, array, menuItem.path, menuItem.pathArray));
    }
  };

  m.forEach((t, index, array) => genPath(t, index, array, "", []));
  return m;
}

export {
  getMenuWithPath,
  getMenu
}

export default {
  getMenuWithPath,
  getMenu
}