<template>
  <el-row id="index">
    <div id="container">
      <div id="action">
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="posKind">
              <el-radio-button label="全部">全部</el-radio-button>
              <el-radio-button label="食品经营">食品经营</el-radio-button>
              <el-radio-button label="食品小作坊">小作坊</el-radio-button>
              <el-radio-button label="网上商家">网上商家</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="posText" placeholder="搜索食品经营个体" clearable>
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="background:rgba(255,255,255,0.7);border-radius:4px;" :span="24">
            <div style="margin-top:10px;display:flex;justify-content:space-around;">
              <el-radio-group size="mini" v-model="chartKind">
                <el-radio-button label="bizCountKind">个体比例</el-radio-button>
                <el-radio-button label="increaseArea">增长情况</el-radio-button>
                <el-radio-button label="monthKind">检查合格率</el-radio-button>
              </el-radio-group>
            </div>
            <div style="height:240px;margin:8px;" id="chart"></div>
          </el-col>
        </el-row>
      </div>
      <el-dialog v-if="popup" :title="popupItem.name" :visible.sync="popup" width="50%">
        <el-form label-width="110px">
          <el-row :gutter="15">
            <el-col :span="24">
              <el-form-item label="经营个体名：">
                <el-input v-model="popupItem.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="所属网格区域：">
                <el-input v-model="$store.state.gridarea.findArea(popupItem.area).name" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="企业类型：">
                <el-input v-model="popupItem.kind" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="联系人员：">
                <el-input v-model="popupItem.contact" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="联系电话：">
                <el-input v-model="popupItem.tel" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="许可证号：">
                <el-input v-if="popupItem.licence" v-model="popupItem.licence.num" disabled></el-input>
                <el-input v-else value="暂无许可证" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="经营类别：">
                <el-input v-model="popupItem.category" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="$router.push('/base/biz/'+popupItem.id)">前往查看</el-button>
          <el-button size="medium" @click="()=>{popup=false;popupItem=null;}">关闭</el-button>
        </span>
      </el-dialog>
      <div id="map"></div>
    </div>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils.js";
import { count } from "@/components/count.js";
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
      popup: false
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    bizPos() {
      let result = copy(this.$store.state.biz);

      if (this.posKind && this.posKind !== "全部") {
        result = result.filter(t => t.kind === this.posKind);
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
    },

    pointDraw() {
      this.clearMap();
      this.mappoint = [];
      this.bizPos.forEach(t => {
        let point = new BMap.Marker(new BMap.Point(t.pos[0], t.pos[1]));
        point.addEventListener("dblclick", () => {
          this.popupItem = t;
          this.popup = true;
        });
        point.addEventListener("click", function() {
          this.openInfoWindow(
            new BMap.InfoWindow(
              `<strong>${t.name}</strong><br/>类型：${t.kind}<br/>联系人：${
                t.contact
              }<br/>联系电话：${t.tel}`
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
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 8px;
}

#action {
  display: inline-block;
  z-index: 99;
  position: absolute;
  top: 10px;
  right: 10px;
}

#index {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#container {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
