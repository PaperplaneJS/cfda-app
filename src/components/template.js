let template = [{
  id: "1",
  state: 1,
  name: "食品生产日常监督检查要点表",
  department: "常熟市食药监局",
  staff: "张小明",
  date: "2017-12-31",
  tips: "每次检查抽查重点项不少于10个，总检查项目不少于20个。对食品添加剂生产者每次检查，还需检查第9项，对食品生产者的检查不需检查第9项。如果检查项目存在合理缺项，该项无需勾选“是或否”，并在备注中说明，不计入不符合项数",
  content: [{
    title: "生产环境条件",
    children: [{
      content: "厂区无扬尘、无积水，厂区、车间卫生整洁",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "厂区、车间与有毒、有害场所及其他污染源保持规定的距离",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "厂区无扬尘、无积水，厂区、车间卫生整洁卫生间应保持清洁，应设置洗手设施，未与食品生产、包装或贮存等区域直接连通",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "有更衣、洗手、干手、消毒设备、设施，满足正常使用",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "通风、防尘、照明、存放垃圾和废弃物等设备、设施正常运行",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "车间内使用的洗涤剂、消毒剂等化学品应与原料、半成品、成品、包装材料等分隔放置，并有相应的使用记录",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "定期检查防鼠、防蝇、防虫害装置的使用情况并有相应检查记录，生产场所无虫害迹象",
      item: [{
        label: "是",
        check: true

      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "进货查验结果",
    tips: "①检查原辅料仓库；②原辅料品种随机抽查，不足2种的全部检查",
    children: [{
      content: "查验食品原辅料、食品添加剂、食品相关产品供货者的许可证、产品合格证明文件；供货者无法提供有效合格证明文件的食品原料，有检验记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "进货查验记录及证明材料真实、完整，记录和凭证保存期限不少于产品保质期期满后六个月，没有明确保质期的，保存期限不少于二年",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "建立和保存食品原辅料、食品添加剂、食品相关产品的贮存、保管记录和领用出库记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "生产过程控制",
    tips: "在成品库至少抽取2批次产品，按生产日期或批号追溯生产过程记录及控制的全部检查，有专供特定人群的产品至少抽查1个产品",
    children: [{
      content: "有食品安全自查制度文件，定期对食品安全状况进行自查并记录和处置",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "使用的原辅料、食品添加剂、食品相关产品的品种与索证索票、进货查验记录内容一致",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "建立和保存生产投料记录，包括投料种类、品名、生产日期或批号、使用数量等",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "未发现使用非食品原料、回收食品、食品添加剂以外的化学物质、超过保质期的食品原料和食品添加剂生产食品",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "未发现超范围、超限量使用食品添加剂的情况",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "生产或使用的新食品原料，限定于国务院卫生行政部门公告的新食品原料范围内",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "未发现使用药品、仅用于保健食品的原料生产食品",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "生产记录中的生产工艺和参数与企业申请许可时提供的工艺流程一致",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "建立和保存生产加工过程关键控制点的控制情况记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "生产现场未发现人流、物流交叉污染",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "未发现原辅料、半成品与直接入口食品交叉污染",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "有温、湿度等生产环境监测要求的，定期进行监测并记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "生产设备、设施定期维护保养并做好记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "未发现标注虚假生产日期或批号的情况",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "工作人员穿戴工作衣帽，生产车间内未发现与生产无关的个人或者其他与生产不相关物品，员工洗手消毒后进入生产车间",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "产品检验结果",
    children: [{
      content: "企业自检的，应具备与所检项目适应的检验室和检验能力，有检验相关设备及化学试剂，检验仪器设备按期检定",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "不能自检的，应当委托有资质的检验机构进行检验",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "有与生产产品相适应的食品安全标准文本，按照食品安全标准规定进行检验",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "建立和保存原始检验数据和检验报告记录，检验记录真实、完整",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "按规定时限保存检验留存样品并记录留样情况",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "贮存及交付控制",
    tips: "采取抽查方式，有冷链要求的产品必须检查冷链情况",
    children: [{
      content: "原辅料的贮存有专人管理，贮存条件符合要求",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "食品添加剂应当专门贮存，明显标示，专人管理",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "不合格品应在划定区域存放",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "根据产品特点建立和执行相适应的贮存、运输及交付控制制度和记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "仓库温湿度应符合要求",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "生产的产品在许可范围内",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "有销售台账，台账记录真实、完整",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "销售台账如实记录食品的名称、规格、数量、生产日期或者生产批号、检验合格证明、销售日期以及购货者名称、地址、联系方式等内容",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "不合格品管理和食品召回",
    tips: "采取抽查方式",
    children: [{
      content: " 建立和保存不合格品的处置记录，不合格品的批次、数量应与记录一致",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "实施不安全食品的召回，有召回计划、公告等相应记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "召回食品有处置记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "未发现使用召回食品重新加工食品情况（对因标签存在瑕疵实施召回的除外）",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "从业人员管理",
    children: [{
      content: "有食品安全管理人员、检验人员、负责人",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "有食品安全管理人员、检验人员、负责人培训和考核记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "未发现聘用禁止从事食品安全管理的人员",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "企业负责人在企业内部制度制定、过程控制、安全培训、安全检查以及食品安全事件或事故调查等环节履行了岗位职责并有记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "建立从业人员健康管理制度，直接接触食品人员有健康证明，符合相关规定",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "有从业人员食品安全知识培训制度，并有相关培训记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }, {
    title: "食品安全事故处置",
    children: [{
      content: "有定期排查食品安全风险隐患的记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "有按照食品安全应急预案定期演练，落实食品安全防范措施的记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "发生食品安全事故的，有处置食品安全事故记录",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }]
  }, {
    title: "食品添加剂生产者管理",
    children: [{
      content: "原料和生产工艺符合产品标准规定",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: true
    }, {
      content: "复配食品添加剂配方发生变化的，按规定报告",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }, {
      content: "食品添加剂产品标签载明“食品添加剂”，并标明贮存条件、生产者名称和地址、食品添加剂的使用范围、用量和使用方法",
      item: [{
        label: "是",
        check: true
      }, {
        label: "否",
        check: false
      }],
      required: false,
      important: false
    }]
  }]
}];

export {
  template
}