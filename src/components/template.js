let template = [{
    "id": "1",
    "state": 1,
    "kind": "daily",
    "name": "食品生产日常监督检查要点表",
    "department": "常熟市食药监局",
    "staff": "张小明",
    "date": "2017-12-31",
    "tips": "每次检查抽查重点项不少于10个，总检查项目不少于20个。对食品添加剂生产者每次检查，还需检查第9项，对食品生产者的检查不需检查第9项。如果检查项目存在合理缺项，该项无需勾选“是或否”，并在备注中说明，不计入不符合项数",
    "content": [{
      "title": "生产环境条件",
      "children": [{
        "content": "厂区无扬尘、无积水，厂区、车间卫生整洁",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "厂区、车间与有毒、有害场所及其他污染源保持规定的距离",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "厂区无扬尘、无积水，厂区、车间卫生整洁卫生间应保持清洁，应设置洗手设施，未与食品生产、包装或贮存等区域直接连通",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "有更衣、洗手、干手、消毒设备、设施，满足正常使用",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "通风、防尘、照明、存放垃圾和废弃物等设备、设施正常运行",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "车间内使用的洗涤剂、消毒剂等化学品应与原料、半成品、成品、包装材料等分隔放置，并有相应的使用记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "定期检查防鼠、防蝇、防虫害装置的使用情况并有相应检查记录，生产场所无虫害迹象",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "进货查验结果",
      "tips": "①检查原辅料仓库；②原辅料品种随机抽查，不足2种的全部检查",
      "children": [{
        "content": "查验食品原辅料、食品添加剂、食品相关产品供货者的许可证、产品合格证明文件；供货者无法提供有效合格证明文件的食品原料，有检验记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "进货查验记录及证明材料真实、完整，记录和凭证保存期限不少于产品保质期期满后六个月，没有明确保质期的，保存期限不少于二年",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "建立和保存食品原辅料、食品添加剂、食品相关产品的贮存、保管记录和领用出库记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "生产过程控制",
      "tips": "在成品库至少抽取2批次产品，按生产日期或批号追溯生产过程记录及控制的全部检查，有专供特定人群的产品至少抽查1个产品",
      "children": [{
        "content": "有食品安全自查制度文件，定期对食品安全状况进行自查并记录和处置",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "使用的原辅料、食品添加剂、食品相关产品的品种与索证索票、进货查验记录内容一致",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "建立和保存生产投料记录，包括投料种类、品名、生产日期或批号、使用数量等",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "未发现使用非食品原料、回收食品、食品添加剂以外的化学物质、超过保质期的食品原料和食品添加剂生产食品",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "未发现超范围、超限量使用食品添加剂的情况",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "生产或使用的新食品原料，限定于国务院卫生行政部门公告的新食品原料范围内",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "未发现使用药品、仅用于保健食品的原料生产食品",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "生产记录中的生产工艺和参数与企业申请许可时提供的工艺流程一致",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "建立和保存生产加工过程关键控制点的控制情况记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "生产现场未发现人流、物流交叉污染",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "未发现原辅料、半成品与直接入口食品交叉污染",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "有温、湿度等生产环境监测要求的，定期进行监测并记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "生产设备、设施定期维护保养并做好记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "未发现标注虚假生产日期或批号的情况",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "工作人员穿戴工作衣帽，生产车间内未发现与生产无关的个人或者其他与生产不相关物品，员工洗手消毒后进入生产车间",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "产品检验结果",
      "children": [{
        "content": "企业自检的，应具备与所检项目适应的检验室和检验能力，有检验相关设备及化学试剂，检验仪器设备按期检定",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "不能自检的，应当委托有资质的检验机构进行检验",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "有与生产产品相适应的食品安全标准文本，按照食品安全标准规定进行检验",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "建立和保存原始检验数据和检验报告记录，检验记录真实、完整",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "按规定时限保存检验留存样品并记录留样情况",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "贮存及交付控制",
      "tips": "采取抽查方式，有冷链要求的产品必须检查冷链情况",
      "children": [{
        "content": "原辅料的贮存有专人管理，贮存条件符合要求",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "食品添加剂应当专门贮存，明显标示，专人管理",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "不合格品应在划定区域存放",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "根据产品特点建立和执行相适应的贮存、运输及交付控制制度和记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "仓库温湿度应符合要求",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "生产的产品在许可范围内",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "有销售台账，台账记录真实、完整",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "销售台账如实记录食品的名称、规格、数量、生产日期或者生产批号、检验合格证明、销售日期以及购货者名称、地址、联系方式等内容",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "不合格品管理和食品召回",
      "tips": "采取抽查方式",
      "children": [{
        "content": " 建立和保存不合格品的处置记录，不合格品的批次、数量应与记录一致",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "实施不安全食品的召回，有召回计划、公告等相应记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "召回食品有处置记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "未发现使用召回食品重新加工食品情况（对因标签存在瑕疵实施召回的除外）",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "从业人员管理",
      "children": [{
        "content": "有食品安全管理人员、检验人员、负责人",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "有食品安全管理人员、检验人员、负责人培训和考核记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "未发现聘用禁止从事食品安全管理的人员",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "企业负责人在企业内部制度制定、过程控制、安全培训、安全检查以及食品安全事件或事故调查等环节履行了岗位职责并有记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "建立从业人员健康管理制度，直接接触食品人员有健康证明，符合相关规定",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "有从业人员食品安全知识培训制度，并有相关培训记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }, {
      "title": "食品安全事故处置",
      "children": [{
        "content": "有定期排查食品安全风险隐患的记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "有按照食品安全应急预案定期演练，落实食品安全防范措施的记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "发生食品安全事故的，有处置食品安全事故记录",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }]
    }, {
      "title": "食品添加剂生产者管理",
      "children": [{
        "content": "原料和生产工艺符合产品标准规定",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": true
      }, {
        "content": "复配食品添加剂配方发生变化的，按规定报告",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }, {
        "content": "食品添加剂产品标签载明“食品添加剂”，并标明贮存条件、生产者名称和地址、食品添加剂的使用范围、用量和使用方法",
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "required": false,
        "type": "shifou",
        "point": false,
        "important": false
      }]
    }]
  }, {
    id: "2",
    "name": "保健食品生产日常监督检查要点表",
    "kind": "daily",
    "state": 1,
    "content": [{
      "title": "生产者资质情况",
      "tips": "",
      "children": [{
        "content": "生产许可证在有效期内",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "营业执照、生产许可证中相关信息一致",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "实际生产的保健食品在生产许可范围内",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "保健食品注册证书或备案凭证有效",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "实际生产的保健食品按规定注册或备案",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "注册或备案的保健食品相关内容发生变更的，已按规定履行变更手续",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "工艺设备布局和工艺流程、主要生产设备设施、食品类别等事项发生变化，需要变更食品生产许可证载明的许可事项的，已按规定履行变更手续",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "进货查验情况",
      "tips": "",
      "children": [{
        "content": "建立并执行原辅料和包装材料的采购、验收、贮存、发放和使用等管理制度",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "查验原辅料和包装材料供货者的许可证和产品合格证明；对无法提供合格证明的食品原辅料，应当按照食品安全标准进行检验",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "生产保健食品使用的原辅料与注册或备案的内容一致",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立并执行原辅料和包装材料进货查验记录制度，如实记录原辅料和包装材料名称、规格、数量、生产日期或生产批号、保质期、进货日期以及供货商名称、地址、联系方式等内容，并保存相关凭证",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "进货查验记录和凭证保存期限符合规定",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "出入库记录如实、完整，包括出入库原辅料和包装材料名称、规格、生产日期或者生产批号、出入库数量和时间、库存量、责任人等内容",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原料库内保健食品原辅料与其他物品分区存放，避免交叉污染",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原料库通风、温湿度以及防虫、防尘、防鼠设施等符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "对温湿度或其他条件有特殊要求的按规定条件贮存",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原辅料按待检、合格和不合格严格区分管理，存放处有明显标识区分，离墙离地存放，合格备用的原辅料按不同批次分开存放",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "设置原辅料标识卡，标示内容应包括物料名称、规格、生产日期或生产批号、有效期、供货商和生产商名称、质量状态、出入库记录等内容",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "标识卡相关内容与原辅料库台账一致，应做到账、物、卡相符",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "生产过程控制情况",
      "tips": "",
      "children": [{
        "content": "按照经注册或备案的产品配方、生产工艺等技术要求组织生产",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "生产保健食品未改变生产工艺的连续性要求",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "生产时空气净化系统正常运行并符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "空气净化系统定期进行检测和维护保养并记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立和保存空气洁净度监测原始记录和报告",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "有相对负压要求的相邻车间之间有指示压差的装置，静压差符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "生产固体保健食品的洁净区、粉尘较大的车间保持相对负压，除尘设施有效",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "洁净区温湿度符合生产工艺的要求并有监测记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "有温湿度控制措施和相应记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "洁净区与非洁净区之间设置缓冲设施",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "生产车间设置与洁净级别相适应的人流、物流通道，避免交叉污染",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原料的前处理(如提取、浓缩等)在与其生产规模和工艺要求相适应的场所进行，配备必要的通风、除尘、除烟、降温等安全设施并运行良好，且定期检测及记录",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原料的前处理未与成品生产使用同一生产车间",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "保健食品生产工艺有原料提取、纯化等前处理工序的应自行完成，具备与生产的品种、数量相适应的原料前处理设备或者设施",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "工艺文件齐全，包括产品配方、工艺流程、加工过程的主要技术条件及关键控制点、物料平衡的计算方法和标准等内容",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "批生产记录真实、完整、可追溯",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "批生产记录中的生产工艺和参数与工艺规程一致",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "投料记录完整，包括原辅料品名、生产日期或批号、使用数量等，并经第二人复核签字",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "原辅料出入库记录中的领取量、实际使用量与注册或备案的配方和批生产记录中的使用量一致",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "与原辅料、中间产品、成品直接接触的容器、包材、输送管道等符合卫生要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "工艺用水有水质报告，达到工艺规程要求",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "水处理系统正常运行，有动态监测及维护记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "投料前生产车间及设备按工艺规程要求进行清场或清洁并保存相关记录，设备有清洁状态标识",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "更衣、洗手、消毒等卫生设施齐全有效，生产操作人员按相关要求做好个人卫生",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "定期对生产设备、设施维护保养，并保存记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立和保存停产、复产记录及复产时生产设备、设施等安全控制记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "记录和保存生产加工过程关键控制点的控制情况，对超出控制限的情况有纠偏措施及纠偏记录",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "现场未发现使用非食品原料、超过保质期的原辅料、回收保健食品生产保健食品的现象",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "产品检验情况",
      "tips": "",
      "children": [{
        "content": "设立独立的质量管理部门并有效运行",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "明确品质管理人员的岗位职责并按要求履职",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "落实原辅料、中间产品、成品以及不合格品的管理制度，保存完整的不合格品处理记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "落实原辅料、中间产品、成品检验管理制度及质量标准、检验规程",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "检测仪器和计量器具定期检定或校准",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "有仪器设备使用记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "检验人员有能力检测产品技术要求规定的出厂检验指标",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "按照产品技术文件或标准规定的检验项目进行检验",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "检验引用的标准齐全、有效",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立和保存检验的原始检验数据记录和检验报告",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "设置留样室，按规定留存检验样品，并有留样记录",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "企业自检的，检验室及相应的检验仪器设备满足出厂检验需要。委托有资质的检验机构进行检验的，签订委托检验合同并留存检验报告",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "产品执行标准符合法律法规的规定",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "产品标签、说明书情况",
      "tips": "",
      "children": [{
        "content": "标签、说明书符合保健食品相关法律、法规的要求",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "标签、说明书与注册或备案的内容一致",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "贮运及交付控制情况",
      "tips": "",
      "children": [{
        "content": "建立和执行与产品相适应的仓储、运输及交付控制制度和记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "根据保健食品的特点和质量要求选择适宜的贮存和运输条件",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "未将保健食品与有毒、有害或有异味的物品一同贮存",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "贮存、运输和装卸保健食品的容器、工器具和设备安全、无害，保持清洁",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "非常温下保存的保健食品，建立和执行贮运时的成品温度控制制度并有记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "每批产品均有销售记录，记录内容真实、完整、可追溯",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "不合格品管理和召回情况",
      "tips": "",
      "children": [{
        "content": "建立并执行产品退货、召回管理制度",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "保存产品退货记录和召回记录",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "对退货、召回的保健食品采取补救、无害化处理或销毁等措施，并保存记录",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "向当地食品药品监管部门及时报告召回及处理情况",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "从业人员管理情况",
      "tips": "",
      "children": [{
        "content": "生产和品质管理部门的负责人为专职人员，符合有关法律法规对学历和专业经历要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "专职技术人员的比例符合有关要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "质检人员为专职人员，符合有关要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "采购管理负责人有相关工作经验",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立从业人员培训记录及考核档案",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "从业人员上岗前经过食品安全法律法规教育及相应岗位的技能培训",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "建立从业人员健康检查制度和健康档案，直接接触保健食品人员有健康证明，符合相关规定",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "委托加工情况",
      "tips": "",
      "children": [{
        "content": "委托双方签订委托协议并在有效期内",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "委托协议明确委托双方产品质量责任",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "委托方持有的保健食品注册批准证明文件有效",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "受托方具有相应的生产许可",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "受托方建立与所生产的委托产品相适应的质量管理文件",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "食品安全事故处置情况",
      "tips": "",
      "children": [{
        "content": "制定保健食品安全事故处置预案",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "定期检查与生产的保健食品相适应的质量安全防范措施，并保存相关记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "发生保健食品安全事故的，建立和保存事故处置记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }, {
      "title": "生产质量管理体系建立和运行情况",
      "tips": "",
      "children": [{
        "content": "定期对生产质量管理体系的运行情况进行自查，保证其有效运行",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }, {
        "content": "定期向食品药品监督管理部门提交生产质量管理体系自查报告",
        "important": true,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "type": "shifou"
      }]
    }],
    "staff": "顾小华",
    "department": "虞山街道办",
    "date": "2018-9-4",
    "tips": "每次检查重点项不应少于10项。以抽查形式检查的项目等，在备注栏中要填写必要的检查记录信息，评价仅针对本次抽查内容。"
  },





  //全量检查表示例





  {
    "id": "3",
    "name": "餐饮服务食品安全量化分级评分表",
    "state": 1,
    "kind": "risk",
    "content": [{
      "title": "许可管理",
      "tips": "",
      "children": [{
        "content": "食品经营许可证合法有效，经营场所、主体业态、经营项目等事项与食品经营许可证一致",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 2,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }]
    }, {
      "title": "信息公示",
      "tips": "",
      "children": [{
        "content": "在经营场所醒目位置公示食品经营许可证",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 2,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }, {
        "content": "监督检查结果记录表公示的时间、位置等符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 2,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }, {
        "content": "在经营场所醒目位置公示量化等级标识",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 1,
          "中、小、微型餐饮": 1,
          "集体用餐配送、中央厨房": 1,
          "单位食堂": 1
        }
      }]
    }, {
      "title": "制度管理",
      "tips": "",
      "children": [{
        "content": "建立从业人员健康管理、食品安全自查、进货查验记录、食品召回等食品安全管理制度",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 6,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 6,
          "单位食堂": 4
        }
      }, {
        "content": "制定食品安全事故处置方案",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }]
    }, {
      "title": "人员管理",
      "tips": "",
      "children": [{
        "content": "主要负责人知晓食品安全责任，有食品安全管理人员",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 5,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 5,
          "单位食堂": 5
        }
      }, {
        "content": "从事接触直接入口食品工作的从业人员持有有效的健康证明",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 5,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }, {
        "content": "具有从业人员食品安全培训记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 1,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 3
        }
      }, {
        "content": "从业人员穿戴清洁的工作衣帽，双手清洁，保持个人卫生",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 4,
          "中、小、微型餐饮": 6,
          "集体用餐配送、中央厨房": 4,
          "单位食堂": 5
        }
      }]
    }, {
      "title": "环境卫生",
      "tips": "",
      "children": [{
        "content": "食品经营场所保持清洁、卫生",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 6,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }, {
        "content": "烹饪场所配置排风设备，定期清洁",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 4,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }, {
        "content": "用水符合生活饮用水卫生标准",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 1,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }, {
        "content": "卫生间保持清洁、卫生，定期清理",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 1,
          "集体用餐配送、中央厨房": 1,
          "单位食堂": 1
        }
      }]
    }, {
      "title": "原料控制（含食品添加剂）",
      "tips": "",
      "children": [{
        "content": "查验供货者的许可证和食品出厂检验合格证或其他合格证明，企业如实记录有关信息并保存相关凭证",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 6,
          "中、小、微型餐饮": 5,
          "集体用餐配送、中央厨房": 6,
          "单位食堂": 6
        }
      }, {
        "content": "原料外包装标识符合要求，按照外包装标识的条件和要求规范贮存，并定期检查，及时清理变质或者超过保质期的食品",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 4,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 5,
          "单位食堂": 4
        }
      }, {
        "content": "食品添加剂由专人负责保管、领用、登记，并有相关记录",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 4,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 3
        }
      }]
    }, {
      "title": "加工制作过程",
      "tips": "",
      "children": [{
        "content": "食品原料、半成品与成品在盛放、贮存时相互分开",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 5,
          "中、小、微型餐饮": 5,
          "集体用餐配送、中央厨房": 4,
          "单位食堂": 4
        }
      }, {
        "content": "制作食品的设施设备及加工工具、容器等具有显著标识，按标识区分使用",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 4,
          "中、小、微型餐饮": 6,
          "集体用餐配送、中央厨房": 4,
          "单位食堂": 4
        }
      }, {
        "content": "专间内由明确的专人进行操作，使用专用的加工工具",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 3
        }
      }, {
        "content": "食品留样符合规范",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 1,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 4
        }
      }, {
        "content": "中央厨房、集体用餐配送单位配送食品的标识、储存、运输等符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "集体用餐配送、中央厨房": 4
        }
      }, {
        "content": "有毒有害物质不得与食品一同贮存、运输",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 2,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }]
    }, {
      "title": "设施设备及维护",
      "tips": "",
      "children": [{
        "content": "专间内配备专用的消毒（含空气消毒）、冷藏、冷冻、空调等设施，设施运转正常",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 5,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 4,
          "单位食堂": 4
        }
      }, {
        "content": "食品处理区配备运转正常的洗手消毒设施",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 3
        }
      }, {
        "content": "食品处理区配备带盖的餐厨废弃物存放容器",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 2,
          "中、小、微型餐饮": 4,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }, {
        "content": "食品加工、贮存、陈列等设施设备运转正常，并保持清洁",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 2,
          "集体用餐配送、中央厨房": 2,
          "单位食堂": 2
        }
      }]
    }, {
      "title": "餐饮具清洗消毒",
      "tips": "",
      "children": [{
        "content": "集中消毒餐具、饮具的采购符合要求",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }, {
        "content": "具有餐具、饮具的清洗、消毒、保洁设备设施，并运转正常",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 3,
          "中、小、微型餐饮": 6,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 3
        }
      }, {
        "content": "餐具、饮具和盛放直接入口食品的容器用后洗净、消毒，炊具、用具用后洗净，保持清洁",
        "important": false,
        "required": false,
        "point": false,
        "item": [{
          "label": "是",
          "check": true
        }, {
          "label": "否",
          "check": false
        }],
        "risk": {
          "特大、大型餐饮": 4,
          "中、小、微型餐饮": 3,
          "集体用餐配送、中央厨房": 3,
          "单位食堂": 4
        }
      }]
    }, {
      "title": "先进管理方式及成效",
      "tips": "",
      "children": [{
        "content": "采用危害分析与关键控制点、ISO22000、色标管理、“5S”“5C”“6T等先进管理方式；实行透明厨房、视频实时监控等社会监督方式；采用信息化手段采集、留存经营信息，建立食品安全追溯体系；在国家或省级食品安全示范创建中，被认定为示范单位的",
        "important": false,
        "required": false,
        "point": true,
        "item": [{
          "label": "评分",
          "check": true,
          "point": [0, 100]
        }],
        "type": "pingfen",
        "risk": {
          "特大、大型餐饮": 5,
          "中、小、微型餐饮": 5,
          "集体用餐配送、中央厨房": 5,
          "单位食堂": 5
        }
      }]
    }, {
      "title": "过程管理有效性",
      "tips": "",
      "children": [{
        "content": "是否存在食品安全管理的痕迹；整体管理情况及整改的态度；对管理的认知度、重视程度和配合度等；专业水平的掌握程度等等，由监管人员主观评分",
        "important": false,
        "required": false,
        "point": true,
        "item": [{
          "label": "评分",
          "check": true,
          "point": [0, 100]
        }],
        "type": "pingfen",
        "risk": {
          "特大、大型餐饮": 5,
          "中、小、微型餐饮": 5,
          "集体用餐配送、中央厨房": 5,
          "单位食堂": 5
        }
      }]
    }],
    "staff": "李小明",
    "department": "虞山街道办",
    "date": "2018-9-11",
    "tips": "1.检查结果参照《江苏省餐饮服务日常监督检查操作指南》进行量化分级评分，不符合项目扣除该项下所有得分。\n2.实得分= 前十一项实际得分总和，检查项目存在合理缺项的评分应该标化，量化评分=（实得分/应得分）×100（保留小数点后一位）（应得分=100-合理缺项总分）\n3.评定等级： 90分以上（含90分）评价为优秀等级； 90分以下至75分（含75分）评价为良好等级； 75分以下至60分（含60分）评价为一般等级。"
  }
];

export {
  template
}