<template>
  <div id="special_singlemonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/special/report/${currentReport.plan.id}`">{{currentReport.plan.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentReport.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{currentReport.title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">基本信息</el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="名称:">
            <el-input v-model="currentReport.biz.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="地址:">
            <el-input v-model="currentReport.biz.address" resize="none" readonly type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="联系人:">
            <el-input v-model="currentReport.biz.legal" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系方式:">
            <el-input v-model="currentReport.biz.tel" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="许可证编号:">
            <el-input v-model="currentReport.biz.code" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="检查次数:">
            <el-input v-model="currentReport.count" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="检查结果编号:">
            <el-input v-model="currentReport.num" resize="none" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="检查时间:">
            <el-date-picker readonly v-model="currentReport.date" type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查内容</el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="检查表:">
            <el-checkbox style="margin-bottom:10px;" v-for="item in currentReport.checkContent" :key="item" disabled checked :label="item" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <el-collapse v-model="collapse">
            <el-collapse-item v-for="(item,index) in currentReport.checkContent" :key="item" :name="item">
              <template slot="title">
                <span>{{item}}</span>
                <el-tag style="margin-left:10px;margin-right:10px" type="success">
                  符合{{getResult(currentReport.checkdetail[index])["符合"].total}}项
                </el-tag>
                <el-tag style="margin-left:10px;margin-right:10px" type="warning">
                  基本符合{{getResult(currentReport.checkdetail[index])["基本符合"].total}}项(含{{getResult(currentReport.checkdetail[index])["基本符合"].important}}个重点项)
                </el-tag>
                <el-tag style="margin-left:10px;margin-right:10px" type="danger">
                  不符合{{getResult(currentReport.checkdetail[index])["不符合"].total}}项(含{{getResult(currentReport.checkdetail[index])["不符合"].important}}个重点项)
                </el-tag>
              </template>

              <div>
                <p style="margin:5px auto;">基本符合的项:</p>
                <el-popover v-for="item of resultArray(currentReport.checkdetail[index])['基本符合']" :key="item.index" placement="top-start" :title="`基本符合 +${item.point}`" width="400" trigger="hover" :content="item.detail">
                  <el-button style="margin:0 5px;" size="mini" slot="reference">{{item.index}}</el-button>
                </el-popover>
              </div>
              <div>
                <p style="margin:5px auto;">不符合的项:</p>
                <el-popover v-for="item of resultArray(currentReport.checkdetail[index])['不符合']" :key="item.index" placement="top-start" :title="`不符合 +${item.point}`" width="400" trigger="hover" :content="item.detail">
                  <el-button style="margin:0 5px;" size="mini" slot="reference">{{item.index}}</el-button>
                </el-popover>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>

<script>
export default {
  name: "special_singlemonitor",
  data() {
    return {
      currentReport: null,
      collapse: null
    };
  },
  beforeMount() {
    let planid = this.$route.planid;
    let reportid = this.$route.params.reportid;
    if (reportid === "1") {
      this.currentReport = {
        title: "东南大道麦当劳DT餐厅",
        num: "1008213",
        plan: {
          name: "虞山分局2018年下半年巡检计划",
          id: 1
        },
        kind: "日常检查",
        staff: "张小明",
        checkContent: [
          "食品生产日常监督检查要点表",
          "食品销售日常监督检查要点表"
        ],
        biz: {
          name: "东南大道麦当劳DT餐厅",
          legal: "王小明",
          tel: "13872663110",
          address: "东南开发区东南大道",
          code: "CS-012-12087450"
        },
        date: "2018-07-01 12:00:00",
        department: "综合办公室",
        result: "符合",
        handle: "通过",
        desc: "综合状况良好，可以通过检查",
        count: 2,
        checkdetail: [
          {
            "一、场所环境": [
              {
                index: 1,
                check:
                  "生产加工场所周围25米内无虫害大量孳生的潜在场所；无有害废弃物以及粉尘、有害气体、放射性物质和其他扩散性污染源等有毒有害及潜在污染源；各类污染源难以避开时应当有必要的防范措施，有效清除污染源造成的影响。",
                result: "基本符合",
                isimportant: false,
                point: 5
              },
              {
                index: 2,
                check:
                  "生产加工场所应当环境整洁、平整无积水，不得散发出异味,不得有各种杂物堆放；道路应当铺设混泥土、沥青或者其他硬质材料；垃圾应当密闭式存放，并远离生产区，排污沟渠也应为密闭式。",
                result: "符合",
                isimportant: true,
                point: 10
              },
              {
                index: 3,
                check:
                  "生活区、生产区应当相互隔离；生产区内不得饲养家禽、家畜；不得设立坑式厕所。",
                result: "符合",
                isimportant: false,
                point: 10
              }
            ],
            "二、布局": [
              {
                index: 4,
                check:
                  "生产加工场所的面积和空间应当与生产能力相适应，便于设备安置、消毒清洁、物料存储及人员操作。",
                result: "基本符合",
                isimportant: true,
                point: 10
              },
              {
                index: 5,
                check:
                  "按照生产工艺的先后次序和产品特点合理布局，设立原辅料、生产、成品等功能间，按序排列生产设备。",
                result: "不符合",
                isimportant: true,
                point: 0
              }
            ]
          },
          {}
        ]
      };
    }
  },
  computed: {
    sumPoint() {
      let sum = 0;
      this.checkDetail.forEach(t => (sum += t.point));

      return sum;
    }
  },
  methods: {
    getResult(item) {
      let resultobj = {
        ["符合"]: {
          total: 0,
          important: 0
        },
        ["基本符合"]: {
          total: 0,
          important: 0
        },
        ["不符合"]: {
          total: 0,
          important: 0
        },
        point: 0
      };

      Object.entries(item).forEach(([checkItemName, checkDetail]) => {
        checkDetail.forEach(detail => {
          resultobj.point += detail.point;
          resultobj[detail.result].total += 1;
          if (detail.isimportant) {
            resultobj[detail.result].important += 1;
          }
        });
      });

      return resultobj;
    },

    resultArray(check) {
      let obj = { ["符合"]: [], ["基本符合"]: [], ["不符合"]: [] };
      Object.entries(check).forEach(([checkItemName, checkDetail]) => {
        checkDetail.forEach(detail => {
          obj[detail.result].push({
            index: detail.index,
            detail: detail.check,
            point: detail.point
          });
        });
      });

      return obj;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
