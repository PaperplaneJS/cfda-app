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
            <el-input
              style="width:100%"
              size="small"
              v-model="posText"
              placeholder="搜索食品经营个体"
              clearable
            >
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

        <el-row :gutter="10" style="flex-grow: 1;"></el-row>
      </div>
    </div>

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
            <el-form-item label="所属行政区域：">
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
        <el-button
          size="medium"
          type="primary"
          @click="$router.push('/base/biz/'+popupItem.com_id)"
        >前往查看</el-button>
        <el-button size="medium" @click="()=>{popup=false;popupItem=null;}">关闭</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { count } from "@/api/count.js";
import { getAllBizs } from "@/oldAPI/old_biz.js";
import { getAreaByID } from "@/oldAPI/old_area.js";
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
      getAreaByID
    };
  },

  mounted() {
    this.init();
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
    }
  },

  methods: {
    init() {
      this.map = new BMap.Map("map");
      this.map.centerAndZoom(process.env.VUE_APP_CITY_NAME, 12);
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
    },

    pointDraw() {
      this.clearMap();
      this.mappoint = [];

      this.bizPos.forEach(t => {
        let imgsrc = "";

        if (t.com_kind === "1") {
          imgsrc = "jingying";
        } else if (t.com_kind === "2") {
          imgsrc = "zuofang";
        } else if (t.com_kind === "3") {
          imgsrc = "wangshang";
        } else if (t.com_kind === "4") {
          imgsrc = "canyin";
        }

        let [x, y] = t.com_gps.split(",");
        let icon = new BMap.Icon(
          require(`../assets/img/mapsigns/${imgsrc}.png`),
          new BMap.Size(38, 29)
        );
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

#index {
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  position: absolute;

  #map_bar {
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
}

.count_item_box {
  .table_title {
    font-weight: bold;
  }

  .count_item {
    margin-bottom: 8px;

    i {
      margin-right: 5px;
      color: cornflowerblue;
    }

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
