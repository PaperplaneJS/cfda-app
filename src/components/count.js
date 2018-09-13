export let count = {
  "increaseKind": {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 20,
      top: 30,
      left: 30,
      right: 10
    },
    legend: {
      data: ["餐饮经营", "食品小作坊", "网上商家"]
    },
    xAxis: [{
      type: "category",
      data: ["6月", "7月", "8月", "9月"]
    }],
    yAxis: [{
      type: "value"
    }],
    series: [{
        name: "餐饮经营",
        type: "bar",
        data: [75, 86, 76, 23],
        barWidth: 10
      },
      {
        name: "食品小作坊",
        type: "bar",
        data: [35, 46, 87, 55],
        barWidth: 10
      },
      {
        name: "网上商家",
        type: "bar",
        data: [23, 65, 75, 23],
        barWidth: 10
      }
    ]
  },

  "increaseArea": {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 10,
      left: 30,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    yAxis: {
      type: "value"
    },
    series: [{
      data: [37, 23, 10, 12, 9, 27, 15, 10, 20],
      type: "bar",
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{c}"
          }
        }
      }
    }]
  },

  "coverDaily": {
    color: ["#DA2625"],
    tooltip: {
      trigger: "axis",
      formatter: "{c}%",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 10,
      left: 45,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      },
      show: true
    },
    series: [{
      data: [78, 82, 64, 88, 92, 32, 44, 83, 64],
      type: "bar",
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{c} %"
          }
        }
      }
    }]
  },

  "coverRisk": {
    color: ["#6600FF"],
    tooltip: {
      trigger: "axis",
      formatter: "{c}%",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 10,
      left: 45,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      },
      show: true
    },
    series: [{
      data: [67, 75, 89, 82, 75, 57, 68, 40, 78],
      type: "bar",
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{c}%"
          }
        }
      }
    }]
  },

  "bizCountArea": {
    legend: {
      data: ["食品经营", "食品小作坊", "网上商家"]
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 45,
      left: 45,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    yAxis: {
      type: "value"
    },
    series: [{
        name: "食品经营",
        type: "bar",
        stack: "总量",
        data: [305, 235, 264, 253, 286, 276, 246, 236, 265]
      },
      {
        name: "食品小作坊",
        type: "bar",
        stack: "总量",
        data: [322, 234, 355, 276, 287, 300, 233, 254, 199]
      },
      {
        name: "网上商家",
        type: "bar",
        stack: "总量",
        data: [255, 221, 267, 234, 204, 3, 264, 230, 210]
      }
    ]
  },

  "bizCountKind": {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    grid: {},
    legend: {
      orient: "vertical",
      x: "right",
      y: "bottom",
      data: ["食品企业", "食品小作坊", "网上商家"]
    },
    series: [{
      name: "详细情况",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      data: [{
          value: 2340,
          name: "食品企业"
        },
        {
          value: 2600,
          name: "食品小作坊"
        },
        {
          value: 1570,
          name: "网上商家"
        }
      ]
    }]
  },

  "bizCountDetail": {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    grid: {},
    series: [{
      name: "详细情况",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      data: [{
          value: 235,
          name: "食品小作坊"
        },
        {
          value: 186,
          name: "网上商家"
        },
        {
          value: 903,
          name: "餐馆"
        },
        {
          value: 342,
          name: "小吃店"
        },
        {
          value: 135,
          name: "饮品店"
        },
        {
          value: 235,
          name: "快餐店"
        },
        {
          value: 24,
          name: "食堂"
        },
        {
          value: 19,
          name: "大中型餐饮服务"
        },
        {
          value: 13,
          name: "其他"
        }
      ]
    }]
  },

  "resultQualified": {
    tooltip: {
      trigger: "axis"
    },
    grid: {
      bottom: 20,
      top: 30,
      left: 45,
      right: 10
    },
    legend: {
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ]
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["3月", "4月", "5月", "6月", "7月", "8月", "9月"]
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      },
      scale: true
    },
    series: [{
        name: "虞山镇",
        type: "line",
        data: [87, 88, 85, 89, 90, 91, 93]
      },
      {
        name: "梅李镇",
        type: "line",
        data: [75, 78, 79, 82, 86, 88, 91]
      },
      {
        name: "海虞镇",
        type: "line",
        data: [85, 83, 81, 84, 85, 88, 90]
      },
      {
        name: "碧溪新区",
        type: "line",
        data: [88, 90, 91, 90, 92, 93, 95]
      },
      {
        name: "古里镇",
        type: "line",
        data: [85, 88, 82, 85, 87, 89, 92]
      },
      {
        name: "支塘镇",
        type: "line",
        data: [83, 84, 85, 84, 81, 84, 87]
      },
      {
        name: "董浜镇",
        type: "line",
        data: [76, 78, 80, 83, 83, 86, 89]
      },
      {
        name: "尚湖镇",
        type: "line",
        data: [86, 87, 89, 92, 93, 95, 96]
      },
      {
        name: "辛庄镇",
        type: "line",
        data: [76, 78, 80, 83, 84, 86, 87]
      }
    ]
  },

  "resultCheck": {
    tooltip: {
      trigger: "axis"
    },
    grid: {
      bottom: 20,
      top: 30,
      left: 45,
      right: 10
    },
    legend: {
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ]
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["3月", "4月", "5月", "6月", "7月", "8月", "9月"]
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto"
      },
      scale: true
    },
    series: [{
        name: "虞山镇",
        type: "line",
        data: [42, 48, 45, 56, 49, 53, 42]
      },
      {
        name: "梅李镇",
        type: "line",
        data: [56, 45, 43, 56, 76, 44, 54]
      },
      {
        name: "海虞镇",
        type: "line",
        data: [33, 32, 57, 32, 43, 33, 22]
      },
      {
        name: "碧溪新区",
        type: "line",
        data: [45, 42, 34, 53, 54, 44, 34]
      },
      {
        name: "古里镇",
        type: "line",
        data: [43, 44, 54, 30, 39, 38, 45]
      },
      {
        name: "支塘镇",
        type: "line",
        data: [34, 45, 43, 43, 50, 44, 32]
      },
      {
        name: "董浜镇",
        type: "line",
        data: [34, 43, 34, 36, 46, 43, 23]
      },
      {
        name: "尚湖镇",
        type: "line",
        data: [33, 30, 31, 28, 30, 32, 34]
      },
      {
        name: "辛庄镇",
        type: "line",
        data: [37, 36, 38, 40, 38, 45, 32]
      }
    ]
  },

  "resultUnqualified": {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 30,
      left: 30,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ]
    },
    yAxis: {
      type: "value"
    },
    legend: {
      data: ["餐饮经营", "食品小作坊", "网上商家"]
    },
    series: [{
        name: "餐饮经营",
        data: [14, 6, 8, 11, 6, 5, 7, 2, 8],
        type: "bar",
        stack: "总计",
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: "{c}"
            }
          }
        }
      },
      {
        name: "食品小作坊",
        data: [10, 5, 3, 8, 7, 2, 11, 2, 4],
        type: "bar",
        stack: "总计",
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: "{c}"
            }
          }
        }
      },
      {
        name: "网上商家",
        data: [6, 7, 2, 3, 5, 7, 6, 6, 4],
        type: "bar",
        stack: "总计",
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: "{c}"
            }
          }
        }
      }
    ]
  },

  "monthArea": {
    color: ["#0099FF"],
    tooltip: {
      trigger: "axis",
      formatter: "{c}%",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: 45,
      top: 10,
      left: 45,
      right: 10
    },
    xAxis: {
      type: "category",
      data: [
        "虞山镇",
        "梅李镇",
        "海虞镇",
        "碧溪新区",
        "古里镇",
        "支塘镇",
        "董浜镇",
        "尚湖镇",
        "辛庄镇"
      ],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      },
      show: true
    },
    series: [{
      data: [78, 82, 64, 88, 92, 32, 44, 83, 64],
      type: "bar",
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{c} %"
          }
        }
      }
    }]
  },

  "monthKind": {
    color: ["#00365F", "#006791", "#00ACCB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        formatter: "{c} %"
      }
    },
    grid: {
      bottom: 20,
      top: 30,
      left: 45,
      right: 10
    },
    legend: {
      data: ["餐饮经营", "食品小作坊", "网上商家"]
    },
    xAxis: [{
      type: "category",
      data: ["6月", "7月", "8月", "9月"]
    }],
    yAxis: [{
      type: "value",
      axisLabel: {
        show: true,
        interval: "auto",
        formatter: "{value} %"
      }
    }],
    series: [{
        name: "餐饮经营",
        type: "bar",
        data: [86, 90, 89, 93],
        barWidth: 10
      },
      {
        name: "食品小作坊",
        type: "bar",
        data: [88, 86, 79, 86],
        barWidth: 10
      },
      {
        name: "网上商家",
        type: "bar",
        data: [76, 79, 80, 80],
        barWidth: 10
      }
    ]
  }
}