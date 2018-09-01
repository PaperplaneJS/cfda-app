<template>
  <div id="index">
    <div id="container">
      <div id="map">
      </div>
      <!-- <div id="dash">
        <el-select @change="switchDisplay(mapType)" v-model="mapType" placeholder="请选择视图">
          <el-option value="食品销售">食品销售</el-option>
          <el-option value="食品生产">食品生产</el-option>
          <el-option value="餐饮服务">餐饮服务</el-option>
          <el-option value="保健食品生产">保健食品生产</el-option>
          <el-option value="小作坊">小作坊</el-option>
        </el-select>
      </div> -->
      <div id="dash">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      map: null,
      mappoint: null,
      mapType: null,
      bizPosition: {
        ["食品生产"]: [
          [120.789824, 31.670542],
          [120.773223, 31.663657],
          [120.755688, 31.651117],
          [120.706533, 31.659232],
          [120.830786, 31.60592],
          [120.803191, 31.668882],
          [120.60542, 31.600507],
          [120.87448, 31.741629],
          [120.660037, 31.705263],
          [120.974515, 31.546854],
          [120.784218, 31.598539]
        ],
        ["食品销售"]: [
          [120.75346, 31.763429],
          [120.697119, 31.549993],
          [120.901789, 31.664149],
          [120.795429, 31.802718],
          [121.023096, 31.639558],
          [120.956406, 31.579529],
          [120.853496, 31.570669]
        ],
        ["餐饮服务"]: [
          [120.785943, 31.656281],
          [120.763234, 31.667837],
          [120.760072, 31.719209],
          [120.725864, 31.685661],
          [120.667079, 31.707413],
          [120.643795, 31.69451],
          [120.626404, 31.674967],
          [120.616918, 31.665133]
        ],
        ["保健食品生产"]: [
          [120.613468, 31.638821],
          [120.617349, 31.61533],
          [120.591622, 31.599461],
          [120.647388, 31.567347],
          [120.680302, 31.58802],
          [120.719684, 31.601799],
          [120.748286, 31.622833],
          [120.769414, 31.61041],
          [120.775882, 31.648535],
          [121.038331, 31.647059]
        ],
        ["小作坊"]: [
          [120.949219, 31.553562],
          [121.030282, 31.694756],
          [120.868731, 31.761587],
          [120.766971, 31.683448],
          [120.789393, 31.620496],
          [120.697406, 31.742918]
        ]
      }
    };
  },

  mounted() {
    this.map = new BMap.Map("map");
    this.map.centerAndZoom("常熟", 12);
    this.map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    let top_left_navigation = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_SMALL
    });
    this.map.addControl(top_left_navigation);
    this.map.enableScrollWheelZoom();
    this.switchDisplay("食品销售");
    this.area();
  },

  methods: {
    switchDisplay(typeName) {
      this.clearMap();
      this.mappoint = [];
      this.bizPosition[typeName].forEach(([x, y]) => {
        let point = new BMap.Marker(new BMap.Point(x, y));
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

#dash {
  display: inline-block;
}
</style>
