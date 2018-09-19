<template>
  <el-row id="index">
    <div id="map_bar">
      <div id="map"></div>
      <div id="action">
        <el-row>
          <el-col :span="24">
            <el-radio-group size="small" v-model="posKind">
              <el-radio-button label="全部">全部</el-radio-button>
              <el-radio-button label="1">食品经营</el-radio-button>
              <el-radio-button label="2">小作坊</el-radio-button>
              <el-radio-button label="3">网上商家</el-radio-button>
              <el-radio-button label="4">餐饮服务</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-input style="width:100%" size="small" v-model="posText" placeholder="搜索食品经营个体" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div style="margin-top:10px;display:flex;justify-content:space-around;">
              <el-radio-group size="mini" v-model="chartKind">
                <el-radio-button label="bizCountKind">个体比例</el-radio-button>
                <el-radio-button label="increaseArea">增长情况</el-radio-button>
                <el-radio-button label="monthKind">检查合格率</el-radio-button>
              </el-radio-group>
            </div>
            <div style="height:180px;margin:8px;" id="chart"></div>
          </el-col>
        </el-row>

        <el-row :gutter="10" style="flex-grow: 1;">

        </el-row>
      </div>
    </div>

    <!--  -->

    <el-row style="margin-top:20px;" :gutter="8" class="count_item_box">

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">频繁出现的问题项目</span>
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
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">频繁查出问题的经营个体</span>
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
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">系统使用情况</span>
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
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">地区检查覆盖率</span>
            <el-radio-group style="float:right;" v-model="cover" size="mini">
              <el-radio-button label="coverDaily">日常检查</el-radio-button>
              <el-radio-button label="coverRisk">量化评级</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="cover"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">食品行业分布情况</span>
            <el-radio-group style="float:right;" v-model="bizCount" size="mini">
              <el-radio-button label="bizCountKind">大类别</el-radio-button>
              <el-radio-button label="bizCountDetail">详细类别</el-radio-button>
              <el-radio-button label="bizCountArea">按地区</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="bizCount"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">近3个月内的商家增长</span>
            <el-radio-group style="float:right;" v-model="increase" size="mini">
              <el-radio-button label="increaseArea">按地区</el-radio-button>
              <el-radio-button label="increaseKind">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="increase"></div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">检查结果汇总统计</span>
            <el-radio-group style="float:right;" v-model="result" size="mini">
              <el-radio-button label="resultQualified">合格率趋势图</el-radio-button>
              <el-radio-button label="resultCheck">检查次数趋势图</el-radio-button>
              <el-radio-button label="resultUnqualified">不合格情况分布</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="result"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">检查结果合格率</span>
            <el-radio-group style="float:right;" v-model="month" size="mini">
              <el-radio-button label="monthArea">按地区</el-radio-button>
              <el-radio-button label="monthKind">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="month"></div>
        </el-card>
      </el-col>

    </el-row>

    <el-dialog v-if="popup" :title="popupItem.name" :visible.sync="popup" width="50%">
      <el-form label-width="110px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="经营个体名：">
              <el-input v-model="popupItem.com_name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="所属网格区域：">
              <el-input :value="getAreaByID(popupItem.area).name" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="企业类型：">
              <el-input :value="kindText(popupItem.com_kind)" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="联系人员：">
              <el-input v-model="popupItem.com_contact" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话：">
              <el-input v-model="popupItem.com_contactphone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="许可证号：">
              <el-input v-if="popupItem.lic_code" v-model="popupItem.lic_code" disabled></el-input>
              <el-input v-else value="暂无许可证" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="经营类别：">
              <el-input v-model="popupItem.com_category" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="$router.push('/base/biz/'+popupItem.com_id)">前往查看</el-button>
        <el-button size="medium" @click="()=>{popup=false;popupItem=null;}">关闭</el-button>
      </span>
    </el-dialog>
  </el-row>

</template>

<script>
import { copy } from "@/utils/utils.js";
import { count } from "@/api/count.js";
import { getAllBizs } from "@/api/old_biz.js";
import { getAreaByID } from "@/api/old_area.js";
import echarts from "echarts";

export default {
  name: "index",
  data() {
    return {
      map: null,
      mappoint: null,
      chart: null,

      posKind: null,
      chartKind: null,
      posText: "",

      popupItem: null,
      popup: false,
      getAreaByID,

      ////////////////////////

      charts: null,

      increase: null,
      cover: null,
      bizCount: null,
      result: null,
      month: null,

      resize: null
    };
  },

  mounted() {
    this.init();
  },

  watch: {
    increase(newVal, oldVal) {
      this.charts.increase.clear();
      this.charts.increase.setOption(count[newVal]);
    },
    cover(newVal, oldVal) {
      this.charts.cover.clear();
      this.charts.cover.setOption(count[newVal]);
    },
    bizCount(newVal, oldVal) {
      this.charts.bizCount.clear();
      this.charts.bizCount.setOption(count[newVal]);
    },
    result(newVal, oldVal) {
      this.charts.result.clear();
      this.charts.result.setOption(count[newVal]);
    },
    month(newVal, oldVal) {
      this.charts.month.clear();
      this.charts.month.setOption(count[newVal]);
    }
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener("resize", this.resize);
    next();
  },

  computed: {
    bizPos() {
      let result = getAllBizs();
      if (this.posKind && this.posKind !== "全部") {
        result = result.filter(t => t.com_kind === this.posKind);
      }

      if (this.posText && this.posText.trim().length > 0) {
        result = result.filter(t => t.name.includes(this.posText));
      }

      return result;
    }
  },

  watch: {
    posKind(newVal, oldVal) {
      this.pointDraw();
    },

    posText(newVal, oldVal) {
      this.pointDraw();
    },

    chartKind(newVal, oldVal) {
      this.chart.clear();
      this.chart.setOption(count[newVal]);
    },

    increase(newVal, oldVal) {
      this.charts.increase.clear();
      this.charts.increase.setOption(count[newVal]);
    },
    cover(newVal, oldVal) {
      this.charts.cover.clear();
      this.charts.cover.setOption(count[newVal]);
    },
    bizCount(newVal, oldVal) {
      this.charts.bizCount.clear();
      this.charts.bizCount.setOption(count[newVal]);
    },
    result(newVal, oldVal) {
      this.charts.result.clear();
      this.charts.result.setOption(count[newVal]);
    },
    month(newVal, oldVal) {
      this.charts.month.clear();
      this.charts.month.setOption(count[newVal]);
    }
  },

  methods: {
    init() {
      this.map = new BMap.Map("map");
      this.map.centerAndZoom("常熟", 12);
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
          anchor: BMAP_ANCHOR_TOP_LEFT
        })
      );
      let top_left_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
      });
      this.map.addControl(top_left_navigation);
      this.map.enableScrollWheelZoom();
      this.area();
      this.posKind = "全部";

      this.chart = echarts.init(document.getElementById("chart"));
      this.chartKind = "bizCountKind";

      /////////////////////////////

      this.charts = {
        increase: echarts.init(document.getElementById("increase")),
        cover: echarts.init(document.getElementById("cover")),
        bizCount: echarts.init(document.getElementById("bizCount")),
        result: echarts.init(document.getElementById("result")),
        month: echarts.init(document.getElementById("month"))
      };

      this.increase = "increaseArea"; //increaseKind  近3月增长量
      this.cover = "coverDaily"; //coverRisk          检查覆盖率
      this.bizCount = "bizCountKind"; //bizCountArea,bizCountDetail        个体个数统计
      this.result = "resultQualified"; //resultUnqualified,resultCheck     检查结果汇总统计
      this.month = "monthArea"; //monthKind                                检查结果比率

      this.resize = () => {
        Object.values(this.charts).forEach(t => t.resize());
      };
      window.addEventListener("resize", this.resize);
    },

    pointDraw() {
      this.clearMap();
      this.mappoint = [];

      this.bizPos.forEach(t => {
        let imgsrc = "";

        if (t.com_kind === "1") {
          imgsrc = "食品经营.png";
        } else if (t.com_kind === "2") {
          imgsrc = "小作坊.png";
        } else if (t.com_kind === "3") {
          imgsrc = "网上商家.png";
        } else if (t.com_kind === "4") {
          imgsrc = "餐饮服务.png";
        }

        let [x, y] = t.com_gps.split(",");
        let icon = new BMap.Icon(imgsrc, new BMap.Size(38, 29));
        let point = new BMap.Marker(
          new BMap.Point(Number(x.trim()), Number(y.trim())),
          { icon: icon }
        );

        point.addEventListener("dblclick", () => {
          this.popupItem = t;
          this.popup = true;
        });

        let getKindText = this.kindText;
        point.addEventListener("click", function() {
          this.openInfoWindow(
            new BMap.InfoWindow(
              `<strong>${t.com_name}</strong><br/>类型：${getKindText(
                t.com_kind
              )}<br/>联系人：${t.com_contact}<br/>联系电话：${
                t.com_contactphone
              }`
            )
          );
        });

        this.mappoint.push(point);
        this.map.addOverlay(point);
      });
    },

    area() {
      let bdary = new BMap.Boundary();
      bdary.get("常熟", rs => {
        let count = rs.boundaries.length;
        if (count === 0) {
          return;
        }

        let pointArray = [];
        for (let i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], {
            strokeWeight: 3,
            strokeColor: "#ff0000"
          });
          ply.setFillColor("none");
          this.map.addOverlay(ply);
          pointArray = pointArray.concat(ply.getPath());
        }
      });
    },

    clearMap() {
      if (!this.mappoint) {
        return;
      }
      this.mappoint.forEach(t => this.map.removeOverlay(t));
    },

    kindText(kind) {
      switch (kind) {
        case "1":
          return "食品经营";
        case "2":
          return "食品小作坊";
        case "3":
          return "网上商家";
        case "4":
          return "餐饮服务";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 8px;
}

#map_bar {
  height: 600px;
  position: relative;

  #action {
    position: absolute;
    z-index: 99;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  #map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
  }
}

.count_item_box {
  .table_title {
    font-weight: bold;
  }

  .count_item {
    margin-bottom: 8px;

    .title {
      font-size: 20px;
      font-weight: 300;
      text-align: center;
      margin: 5px auto 5px;
    }

    .count {
      height: 200px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    overflow: hidden;

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
</style>
