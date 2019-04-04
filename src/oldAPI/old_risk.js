let risk = {
  "2004": [],
  "2005": [],
  "2006": [],
  "2007": [],
  "2008": [],
  "2009": [],
  "2010": [],
  "2011": [],
  "2012": [],
  "2013": [],
  "2014": [],
  "2015": [],
  "2016": [],
  "2017": [],
  "2018": [],
  "2019": [],
  "2020": [{
    id: "r1",
    bizid: "8763355075ba0539fd0eeb9097191152",
    templateid: "3",
    type: "中、小、微型餐饮",
    date: "2018-07-15 16:30",
    level: "良好",
    point: 83.4,
    staff: "12",
    detail: {
      "1.1": {
        checked: true,
        point: 80
      },
      "2.1": {
        checked: true,
        point: 100
      },
      "2.2": {
        checked: true,
        point: 86
      },
      "2.3": {
        checked: true,
        point: 90
      },
      "3.1": {
        checked: true,
        point: 93
      },
      "4.1": {
        checked: true,
        point: 90
      },
      "4.2": {
        checked: true,
        point: 100
      },
      "4.3": {
        checked: true,
        point: 89
      },
      "5.1": {
        checked: true,
        point: 88
      },
      "5.2": {
        checked: true,
        point: 86
      },
      "5.3": {
        checked: true,
        point: 100
      },
      "5.4": {
        checked: true,
        point: 88
      },
      "6.1": {
        checked: true,
        point: 84
      },
      "6.2": {
        checked: true,
        point: 88
      },
      "6.3": {
        checked: true,
        point: 99
      },
      "7.1": {
        checked: true,
        point: 100
      },
      "7.2": {
        checked: true,
        point: 87
      },
      "7.3": {
        checked: true,
        point: 70
      },
      "7.4": {
        checked: true,
        point: 97
      },
      "7.6": {
        checked: true,
        point: 92
      },
      "8.1": {
        checked: true,
        point: 99
      },
      "8.2": {
        checked: true,
        point: 92
      },
      "8.3": {
        checked: true,
        point: 60
      },
      "8.4": {
        checked: true,
        point: 90
      },
      "9.1": {
        checked: true,
        point: 89
      },
      "9.2": {
        checked: true,
        point: 98
      },
      "9.3": {
        checked: true,
        point: 89
      },
      "10.1": {
        point: 85
      },
      "11.1": {
        point: 78
      },
    }
  }]
};

// 90+优秀 75+良好  60+一般 额外增加【不合格】一项
// 对于餐饮服务评级，在手机端选择：特大、大型餐饮/中、小、微型餐饮/集体用餐配送、中央厨房/单位食堂
import {
  copy
} from "@/utils/utils.js";

function getRiskByID(id) {
  let result = undefined;
  Object.entries(risk).forEach(([k, v]) => {
    result = v.find(t => t.id === id);
    if (!result) {
      return false;
    }
  })

  return result;
}

function getAllRisks() {
  return copy(risk);
}


function getRisksByYear(year) {
  if (year) {
    return copy(risk[year]);
  } else {
    return [];
  }
}

export {
  getRiskByID,
  getRisksByYear,
  getAllRisks
}

export default {
  getRiskByID,
  getRisksByYear,
  getAllRisks
}