export default {
  gridArea: [{
    id: 1,
    code: "1",
    name: "常熟市",
    state: 1,
    children: [{
      id: 2,
      code: "1-1",
      name: "虞山镇分局",
      state: 1,
      children: [{
        id: 12,
        code: "1-1-1",
        state: 1,
        name: "东南街道办"
      }, {
        id: 13,
        code: "1-1-2",
        state: 1,
        name: "虞山街道办"
      }, {
        id: 14,
        code: "1-1-3",
        state: 1,
        name: "琴川街道办"
      }, {
        id: 15,
        code: "1-1-4",
        state: 1,
        name: "莫城街道办"
      }, {
        id: 16,
        code: "1-1-5",
        state: 1,
        name: "常福街道办"
      }]
    }, {
      id: 3,
      code: "1-2",
      state: 1,
      name: "梅李镇分局",
      children: [{
        id: 17,
        code: "1-2-1",
        state: 1,
        name: "梅李食药监局"
      }]
    }, {
      id: 4,
      code: "1-3",
      state: 1,
      name: "海虞镇分局",
      children: [{
        id: 18,
        code: "1-3-1",
        state: 1,
        name: "海虞食药监局"
      }]
    }, {
      id: 5,
      code: "1-4",
      state: 1,
      name: "碧溪新区",
      children: [{
        id: 19,
        code: "1-4-1",
        state: 1,
        name: "碧溪街道办"
      }]
    }, {
      id: 6,
      code: "1-5",
      state: 1,
      name: "古里镇分局",
      children: [{
        id: 20,
        code: "1-5-1",
        state: 1,
        name: "古里食药监局"
      }]
    }, {
      id: 7,
      code: "1-6",
      state: 1,
      name: "沙家浜镇分局",
      children: [{
        id: 21,
        code: "1-6-1",
        state: 1,
        name: "沙家浜食药监局"
      }]
    }, {
      id: 8,
      code: "1-7",
      state: 1,
      name: "支塘镇分局",
      children: [{
        id: 22,
        code: "1-7-1",
        state: 1,
        name: "支塘食药监局"
      }]
    }, {
      id: 9,
      code: "1-8",
      state: 1,
      name: "董浜镇分局",
      children: [{
        id: 23,
        code: "1-8-1",
        state: 1,
        name: "董浜食药监局"
      }]
    }, {
      id: 10,
      code: "1-9",
      state: 1,
      name: "尚湖镇分局",
      children: [{
        id: 25,
        code: "1-9-1",
        state: 1,
        name: "尚湖食药监局"
      }]
    }, {
      id: 11,
      code: "1-10",
      state: 1,
      name: "辛庄镇分局",
      children: [{
        id: 26,
        code: "1-10-1",
        state: 1,
        name: "辛庄食药监局"
      }]
    }]
  }],

  findArea(id) {
    let result = null;
    let find = function (item) {
      if (item.id == id) {
        result = item;
      }
      if (item.children) {
        item.children.forEach(t => find(t));
      }
    };

    this.gridArea.forEach(t => find(t));
    return result;
  },

  findAreaIDArray(id) {
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

    this.gridArea.forEach(t => find(t, []));
    return result;
  },

  copy(item) {
    return JSON.parse(JSON.stringify(item));
  },

  gridMember: [{
    id: 1,
    area: 1,
    name: "顾小华",
    sex: 1,
    state: 1,
    job: "副局长"
  }, {
    id: 2,
    area: 1,
    name: "张小强",
    sex: 1,
    state: 1,
    job: "局长"
  }, {
    id: 3,
    area: 2,
    name: "李小明",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 4,
    area: 3,
    name: "陈小刚",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 5,
    area: 4,
    name: "王小刚",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 6,
    area: 5,
    name: "王小红",
    sex: 2,
    state: 1,
    job: "科员"
  }, {
    id: 7,
    area: 12,
    name: "张小芳",
    sex: 2,
    state: 1,
    job: "科长"
  }, {
    id: 8,
    area: 12,
    name: "吴小明",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 9,
    area: 12,
    name: "刘小华",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 10,
    area: 12,
    name: "李小红",
    sex: 2,
    state: 1,
    job: "科员"
  }, {
    id: 11,
    area: 13,
    name: "周小强",
    sex: 1,
    state: 1,
    job: "科长"
  }, {
    id: 12,
    area: 13,
    name: "赵小明",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 13,
    area: 14,
    name: "刘小强",
    sex: 1,
    state: 1,
    job: "科员"
  }, {
    id: 14,
    area: 17,
    name: "周小红",
    sex: 2,
    state: 1,
    job: "科员"
  }, {
    id: 15,
    area: 18,
    name: "顾小强",
    sex: 1,
    state: 1,
    job: "副局长"
  }, ],

  bizs: [{
    id: 1,
    name: "梅花糕小吃店",
    state: 1,
    kind: "食品加工",
    pos: [120.751646, 31.651878],
    address: "方塔街琴川农贸市场北门方桥头转弯弄堂言子桥16号",
    area: 13,
    contact: "王华",
    tel: "13771513390",
    licence: {
      name: "梅花糕小吃店",
      num: "CS-012-3827388",
      socialcode: "3287892002339712341",
      supervise: "虞山街道办",
      superviser: "周小强",
      responsible: "王华",
      address: "方塔街琴川农贸市场北门方桥头转弯弄堂言子桥16号",
      productaddr: "方塔街琴川农贸市场北门方桥头转弯弄堂言子桥16号",
      foodkind: "小吃店",
      issue: "虞山街道办",
      licenceissue: "2017-11-10",
      licenceuntil: "2019-11-10"
    }
  }, {
    id: 2,
    name: "方桥馄饨",
    state: 1,
    kind: "餐饮服务",
    pos: [120.75179, 31.652984],
    address: "河东街126号",
    area: 13,
    contact: "王鑫",
    tel: "18099281450",
    licence: {
      name: "方桥馄饨",
      num: "CS-013-4977015",
      socialcode: "328783391011711510",
      supervise: "虞山街道办",
      superviser: "周小强",
      responsible: "王鑫",
      address: "河东街126号",
      productaddr: "河东街126号",
      foodkind: "小吃店",
      issue: "虞山街道办",
      licenceissue: "2017-11-11",
      licenceuntil: "2019-11-11"
    }
  }, {
    id: 3,
    name: "金明面饭馆",
    state: 1,
    kind: "餐饮服务",
    pos: [120.747873, 31.654337],
    address: "北门大街2号",
    area: 13,
    contact: "李刚",
    tel: "13572901683",
    licence: {
      name: "金明面饭馆",
      num: "CS-012-3820158",
      socialcode: "3942812002339712341",
      supervise: "虞山街道办",
      superviser: "周小强",
      responsible: "李刚",
      address: "北门大街2号",
      productaddr: "北门大街2号",
      foodkind: "小吃店",
      issue: "虞山街道办",
      licenceissue: "2017-11-9",
      licenceuntil: "2019-11-9"
    }
  }, {
    id: 4,
    name: "香村甜品",
    state: 1,
    kind: "餐饮服务",
    pos: [120.748969, 31.649403],
    address: "方塔街68号",
    area: 13,
    contact: "吴建明",
    tel: "13206513443",
    licence: {
      name: "香村甜品",
      num: "CS-213-9810388",
      socialcode: "232358081728971241",
      supervise: "虞山街道办",
      superviser: "周小强",
      responsible: "吴建明",
      address: "方塔街68号",
      productaddr: "方塔街68号",
      foodkind: "小吃店",
      issue: "虞山街道办",
      licenceissue: "2017-11-10",
      licenceuntil: "2019-11-10"
    }
  }, {
    id: 5,
    name: "沙县小吃新颜路店",
    state: 1,
    kind: "餐饮服务",
    pos: [120.774301, 31.650126],
    address: "新颜路49号",
    area: 15,
    contact: "郑健",
    tel: "13771513390",
    licence: {
      name: "沙县小吃新颜路店",
      num: "CS-232-4461738",
      socialcode: "1120394802339712341",
      supervise: "莫城街道办",
      superviser: "周小强",
      responsible: "郑健",
      address: "新颜路49号",
      productaddr: "新颜路49号",
      foodkind: "餐馆",
      issue: "虞山街道办",
      licenceissue: "2017-11-12",
      licenceuntil: "2019-11-12"
    }
  }, {
    id: 6,
    name: "含晖面馆湖山路店",
    state: 1,
    kind: "餐饮服务",
    pos: [120.780325, 31.599977],
    address: "湖山路592号一楼",
    area: 12,
    contact: "高小宇",
    tel: "13237457819",
    licence: {
      name: "含晖面馆湖山路店",
      num: "CS-012-3824448",
      socialcode: "321332123990274928",
      supervise: "东南街道办",
      superviser: "刘小华",
      responsible: "高小宇",
      address: "湖山路592号一楼",
      productaddr: "湖山路592号一楼",
      foodkind: "餐馆",
      issue: "东南街道办",
      licenceissue: "2017-11-15",
      licenceuntil: "2019-11-15"
    }
  }, {
    id: 7,
    name: "天丰酒楼",
    state: 1,
    kind: "餐饮服务",
    pos: [120.725384, 31.603667],
    address: "莫干路28号",
    area: 15,
    contact: "吴冠霖",
    tel: "18791108940",
    licence: {
      name: "天丰酒楼",
      num: "CS-923-9900318",
      socialcode: "100677202357371231",
      supervise: "莫城街道办",
      superviser: "周小强",
      responsible: "吴冠霖",
      address: "莫干路28号",
      productaddr: "莫干路28号",
      foodkind: "餐馆",
      issue: "莫城街道办",
      licenceissue: "2017-11-3",
      licenceuntil: "2019-11-3"
    }
  }, {
    id: 8,
    name: "杨记小菜(莫城店)",
    state: 1,
    kind: "食品生产",
    pos: [120.728798, 31.609234],
    address: "莫城店马泾路30-19号",
    area: 15,
    contact: "宋驰",
    tel: "13236113390",
    licence: {
      name: "杨记小菜(莫城店)",
      num: "CS-012-3827388",
      socialcode: "2387890802339712341",
      supervise: "莫城街道办",
      superviser: "周小强",
      responsible: "宋驰",
      address: "莫城店马泾路30-19号",
      productaddr: "莫城店马泾路30-19号",
      foodkind: "餐馆",
      issue: "莫城街道办",
      licenceissue: "2017-11-10",
      licenceuntil: "2019-11-10"
    }
  }, ],

  checkTemplate: [{
    id: 1,
    state: 1,
    name: "食品生产日常监督检查要点表",
    department: "常熟市食药监局",
    staff: "张小明",
    date: "2017-12-31"
  }]
}