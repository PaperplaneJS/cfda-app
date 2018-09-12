<template>
  <div id="count_count">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-bottom:15px;" class="title">统计分析</el-row> -->

    <el-row class="count_item_box">

      <el-card :body-style="{padding:'10px'}" class="count_item">
        <div slot="header">
          <span>地区检查覆盖率</span>
          <el-radio-group style="float:right;" v-model="checkCover" size="mini">
            <el-radio-button label="daily">日常检查</el-radio-button>
            <el-radio-button label="risk">量化评级</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="checkCover=='daily'" class="count" id="coverDaily"></div>
        <div v-show="checkCover=='risk'" class="count" id="coverRisk"></div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" class="count_item">
        <div slot="header">
          <span>食品行业分布情况</span>
          <el-radio-group style="float:right;" v-model="bizCount" size="mini">
            <el-radio-button label="kind">大类别</el-radio-button>
            <el-radio-button label="detail">详细类别</el-radio-button>
            <el-radio-button label="area">按地区</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="bizCount=='area'" class="count" id="bizCountArea"></div>
        <div v-show="bizCount=='detail'" class="count" id="bizCountDetail"></div>
        <div v-show="bizCount=='kind'" class="count" id="bizCountKind"></div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" class="count_item">
        <div slot="header">
          <span>近3个月内的商家增长</span>
          <el-radio-group style="float:right;" v-model="increaseType" size="mini">
            <el-radio-button label="increaseKind">按类别</el-radio-button>
            <el-radio-button label="increaseArea">按地区</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="increaseType=='increaseKind'" class="count" id="increaseKind"></div>
        <div v-show="increaseType=='increaseArea'" class="count" id="increaseArea"></div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" class="count_item">
        <div slot="header">
          <span>检查结果汇总统计</span>
          <el-radio-group style="float:right;" v-model="checkResult" size="mini">
            <el-radio-button label="qualified">合格率趋势图</el-radio-button>
            <el-radio-button label="check">检查次数趋势图</el-radio-button>
            <el-radio-button label="unqualified">不合格情况分布</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="checkResult=='qualified'" class="count big_item" id="resultQualified"></div>
        <div v-show="checkResult=='check'" class="count big_item" id="resultCheck"></div>
        <div v-show="checkResult=='unqualified'" class="count big_item" id="resultUnqualified"></div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" class="count_item">
        <div slot="header">
          <span>检查结果合格率</span>
          <el-radio-group style="float:right;" v-model="monthQualified" size="mini">
            <el-radio-button label="area">按地区</el-radio-button>
            <el-radio-button label="kind">按行业</el-radio-button>
          </el-radio-group>
        </div>
        <div v-show="monthQualified=='area'" class="count" id="monthQualifiedArea"></div>
        <div v-show="monthQualified=='kind'" class="count" id="monthQualifiedKind"></div>
      </el-card>
    </el-row>

    <el-row class="count_item_flex" type="flex">
      <el-card :body-style="{padding:'10px'}" style="height:230px;" class="count_item">
        <div slot="header">
          <span>频繁出现的问题项目</span>
        </div>
        <div class="list">
          <div>
            <el-tag style="margin-right:4px" size="mini">25次</el-tag>
            <strong>1.</strong>未发现超范围、超限量使用食品添加剂的情况</div>
          <div>
            <el-tag style="margin-right:4px" size="mini">20次</el-tag>
            <strong>2.</strong>建立和保存原始检验数据和检验报告记录，检验记录真实、完整</div>
          <div>
            <el-tag style="margin-right:4px" size="mini">17次</el-tag>
            <strong>3.</strong>有与生产产品相适应的食品安全标准文本，按照食品安全标准规定进行检验</div>
          <div>
            <el-tag style="margin-right:4px" size="mini">13次</el-tag>
            <strong>4.</strong>生产车间应有防蝇、防鼠、防虫、洗手、消毒、更衣等设施</div>
          <div>
            <el-tag style="margin-right:4px" size="mini">8次</el-tag>
            <strong>5.</strong>从业人员应当每年进行健康检查，持有有效健康证明</div>
        </div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" style="height:230px;" class="count_item">
        <div slot="header">
          <span>频繁查出问题的经营个体</span>
        </div>
        <div class="list">
          <div>
            <el-tag style="margin-right:4px" type="danger" size="mini">9次</el-tag>
            <strong>1.</strong>梅花糕小吃店
            <a>查看</a>
          </div>
          <div>
            <el-tag style="margin-right:4px" type="danger" size="mini">8次</el-tag>
            <strong>2.</strong>方桥馄饨
            <a>查看</a>
          </div>
          <div>
            <el-tag style="margin-right:4px" type="danger" size="mini">8次</el-tag>
            <strong>3.</strong>金明面饭馆
            <a>查看</a>
          </div>
          <div>
            <el-tag style="margin-right:4px" type="danger" size="mini">7次</el-tag>
            <strong>4.</strong>香村甜品
            <a>查看</a>
          </div>
          <div>
            <el-tag style="margin-right:4px" type="danger" size="mini">7次</el-tag>
            <strong>5.</strong>沙县小吃新颜路店
            <a>查看</a>
          </div>
        </div>
      </el-card>

      <el-card :body-style="{padding:'10px'}" style="height:230px;flex-grow: 1;" class="count_item">
        <div slot="header">
          <span>系统使用情况</span>
        </div>
        <div class="list">
          <div>
            <el-tag style="margin-right:4px" size="mini">计划</el-tag>
            2018-09-11 14:30 王小明制定了检查计划
          </div>
          <div>
            <el-tag style="margin-right:4px" size="mini">登录</el-tag>
            2018-09-11 14:24 王小明登录了系统
          </div>
          <div>
            <el-tag style="margin-right:4px" size="mini">查询</el-tag>
            2018-09-10 10:23 顾小华查询了任务进度
          </div>
          <div>
            <el-tag style="margin-right:4px" size="mini">通知</el-tag>
            2018-09-10 10:05 顾小华下发了通知
          </div>
          <div>
            <el-tag style="margin-right:4px" size="mini">登录</el-tag>
            2018-09-10 9:30 顾小华登录了系统
          </div>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "count_count",

  data() {
    return {
      increaseType: "increaseKind",
      checkCover: "daily",
      bizCount: "kind",
      checkResult: "qualified",
      monthQualified: "area"
    };
  },

  mounted() {
    this.init();
  },

  computed: {},

  methods: {
    init() {
      echarts.init(document.getElementById("increaseKind")).setOption({
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
        xAxis: [
          {
            type: "category",
            data: ["6月", "7月", "8月", "9月"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
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
      });

      echarts.init(document.getElementById("increaseArea")).setOption({
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
          axisLabel: { interval: 0, rotate: 40 }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
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
          }
        ]
      });

      echarts.init(document.getElementById("coverDaily")).setOption({
        color: ["#CC9933"],
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
          axisLabel: { interval: 0, rotate: 40 }
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
        series: [
          {
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
          }
        ]
      });

      echarts.init(document.getElementById("coverRisk")).setOption({
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
          axisLabel: { interval: 0, rotate: 40 }
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
        series: [
          {
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
          }
        ]
      });

      echarts.init(document.getElementById("bizCountArea")).setOption({
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
          axisLabel: { interval: 0, rotate: 40 }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
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
      });

      echarts.init(document.getElementById("bizCountKind")).setOption({
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
        series: [
          {
            name: "详细情况",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: [
              { value: 2340, name: "食品企业" },
              { value: 2600, name: "食品小作坊" },
              { value: 1570, name: "网上商家" }
            ]
          }
        ]
      });

      echarts.init(document.getElementById("bizCountDetail")).setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {},
        series: [
          {
            name: "详细情况",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: [
              { value: 235, name: "食品小作坊" },
              { value: 186, name: "网上商家" },
              { value: 903, name: "餐馆" },
              { value: 342, name: "小吃店" },
              { value: 135, name: "饮品店" },
              { value: 235, name: "快餐店" },
              { value: 24, name: "食堂" },
              { value: 19, name: "大中型餐饮服务" },
              { value: 13, name: "其他" }
            ]
          }
        ]
      });

      echarts.init(document.getElementById("resultQualified")).setOption({
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
        series: [
          {
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
      });

      echarts.init(document.getElementById("resultCheck")).setOption({
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
        series: [
          {
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
      });

      echarts.init(document.getElementById("resultUnqualified")).setOption({
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
        series: [
          {
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
      });

      echarts.init(document.getElementById("monthQualifiedArea")).setOption({
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
          axisLabel: { interval: 0, rotate: 40 }
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
        series: [
          {
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
          }
        ]
      });

      echarts.init(document.getElementById("monthQualifiedKind")).setOption({
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
        xAxis: [
          {
            type: "category",
            data: ["6月", "7月", "8月", "9月"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
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
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.count_item_box,
.count_item_flex {
  .count_item {
    display: inline-block;
    margin-right: 8px;
    margin-bottom: 8px;

    .title {
      font-size: 20px;
      font-weight: 300;
      text-align: center;
      margin: 5px auto 5px;
    }

    .count {
      width: 400px;
      height: 200px;
    }

    .big_item {
      width: 832px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {
      font-size: 15px;
      padding: 4px 4px;

      a {
        color: cornflowerblue;
        cursor: pointer;
        margin-left: auto;
      }
    }
  }
}

.count_item_flex {
  .count_item {
  }
}
</style>
