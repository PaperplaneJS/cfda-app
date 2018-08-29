<template>
  <div id="special_singlemonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/monitor">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/special/monitor/${currentMonitor.plan.id}`">{{currentMonitor.plan.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>
    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="检查记录信息" name="info">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查计划</el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="检查计划:">
                <el-input v-model="currentMonitor.plan.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="计划类别:">
                <el-input v-model="currentMonitor.plan.kind" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="制定人员:">
                <el-input v-model="currentMonitor.plan.staff" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="计划类别:">
                <el-input v-model="currentMonitor.plan.kind" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="制定日期:">
                <el-date-picker readonly v-model="currentMonitor.plan.date" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">分派任务</el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="任务标题:">
                <el-input v-model="currentMonitor.task.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="分派日期:">
                <el-input v-model="currentMonitor.task.date" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="分派人员:">
                <el-input v-model="currentMonitor.task.staff" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">单位信息</el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="被检单位名:">
                <el-input v-model="currentMonitor.biz.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="负责人:">
                <el-input v-model="currentMonitor.biz.legal" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-input v-model="currentMonitor.biz.tel" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="单位地址:">
                <el-input v-model="currentMonitor.biz.code" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="单位地址:">
                <el-input v-model="currentMonitor.biz.address" resize="none" readonly type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查现场记录</el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="检查科室:">
                <el-input v-model="currentMonitor.department" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="执法人员:">
                <el-input v-model="currentMonitor.staff" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="检查时间:">
                <el-date-picker readonly v-model="currentMonitor.date" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查结果</el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="最终结果:">
                <el-tag>{{currentMonitor.result}}</el-tag>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="处理方式:">
                <el-tag>{{currentMonitor.handle}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="检查详细结果" name="detail">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">
          {{`食品生产专项监督检查要点表` }}[得分:{{sumPoint}}]
          <el-tag style="margin-left:5px;" type="success">符合项:{{computeItem["符合"]}}</el-tag>
          <el-tag style="margin-left:5px;" type="warning">基本符合项:{{computeItem["基本符合"]}}</el-tag>
          <el-tag style="margin-left:5px;" type="danger">不符合项:{{computeItem["不符合"]}}</el-tag>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table :data="checkDetail" :span-method="tableSpan" size="medium" style="width: 100%;margin-bottom:20px;" border>
              <el-table-column prop="item" label="检查内容" width="160px"></el-table-column>
              <el-table-column prop="detail" label="检查项目"></el-table-column>
              <el-table-column label="结果" width="120px">
                <template slot-scope="scope">
                  <el-tag :type="getType(scope.row.result)">{{scope.row.result}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="得分" width="80px">
                <template slot-scope="scope">
                  <el-tag>{{scope.row.point}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="90px">
                <template slot-scope="scope">
                  <el-popover v-if="scope.row.remark" placement="top-start" title="备注" width="400" trigger="hover" :content="scope.row.remark">
                    <el-button style="margin:0 5px;" size="mini" slot="reference">备注</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "special_singlemonitor",
  data() {
    return {
      currentMonitor: null,
      tab: "info"
    };
  },
  beforeMount() {
    let planid = this.$route.params.monitorid;
    let monitorrecordid = this.$route.params.monitorrecordid;
    let plan = {};
    if (planid === "1") {
      plan = {
        name: "虞山分局2018年下半年巡检计划",
        staff: "张强",
        kind: "专项检查",
        date: "2018-05-01",
        id: 1
      };
    }

    if (monitorrecordid === "1") {
      this.currentMonitor = {
        title: "东南大道麦当劳DT餐厅",
        plan,
        task: {
          title: "食品生产场所检查任务",
          staff: "张小明",
          date: "2018-07-01",
          id: 1
        },
        checkContent: "食品生产专项监督检查要点表",
        biz: {
          name: "东南大道麦当劳DT餐厅",
          legal: "王小明",
          tel: "13872663110",
          address: "东南开发区东南大道",
          code: "CS-012-3827388"
        },
        date: "2018-07-01 12:00:00",
        staff: "顾小华",
        department: "综合办公室",
        result:"基本符合",
        handle:"责令整改",
        checkdetail: {
          "一、场所环境": [
            {
              check:
                "生产加工场所周围25米内无虫害大量孳生的潜在场所；无有害废弃物以及粉尘、有害气体、放射性物质和其他扩散性污染源等有毒有害及潜在污染源；各类污染源难以避开时应当有必要的防范措施，有效清除污染源造成的影响。",
              result: "基本符合",
              point: 5,
              remark: "附近有鱼塘，昆虫较多"
            },
            {
              check:
                "生产加工场所应当环境整洁、平整无积水，不得散发出异味,不得有各种杂物堆放；道路应当铺设混泥土、沥青或者其他硬质材料；垃圾应当密闭式存放，并远离生产区，排污沟渠也应为密闭式。",
              result: "符合",
              point: 10,
              remark: null
            },
            {
              check:
                "生活区、生产区应当相互隔离；生产区内不得饲养家禽、家畜；不得设立坑式厕所。",
              result: "符合",
              point: 10,
              remark: null
            }
          ],
          "二、布局": [
            {
              check:
                "生产加工场所的面积和空间应当与生产能力相适应，便于设备安置、消毒清洁、物料存储及人员操作。",
              result: "基本符合",
              point: 10,
              remark: null
            },
            {
              check:
                "按照生产工艺的先后次序和产品特点合理布局，设立原辅料、生产、成品等功能间，按序排列生产设备。",
              result: "不符合",
              point: 0,
              remark: null
            }
          ]
        }
      };

      this.title = this.currentMonitor.title;
    }
  },

  computed: {
    checkDetail() {
      let tableRows = [];
      Object.entries(this.currentMonitor.checkdetail).forEach(
        ([checkItemName, checkDetail]) => {
          checkDetail.forEach(detail => {
            tableRows.push({
              item: checkItemName,
              detail: detail.check,
              result: detail.result,
              point: detail.point,
              remark: detail.remark
            });
          });
        }
      );

      return tableRows;
    },

    allTableCross() {
      let itemContain = [],
        t = 0;
      Object.entries(this.currentMonitor.checkdetail).forEach(
        ([checkItemName, checkDetail]) => {
          itemContain[t] = checkDetail.length;
          t += checkDetail.length;
        }
      );
      return itemContain;
    },

    sumPoint() {
      let sum = 0;
      this.checkDetail.forEach(t => (sum += t.point));

      return sum;
    },

    computeItem() {
      let obj = { ["符合"]: 0, ["基本符合"]: 0, ["不符合"]: 0 };
      Object.entries(this.currentMonitor.checkdetail).forEach(
        ([checkItemName, checkDetail]) => {
          checkDetail.forEach(detail => {
            obj[detail.result] += 1;
          });
        }
      );

      return obj;
    }
  },
  methods: {
    tableSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return;
      }

      return {
        rowspan: this.allTableCross[rowIndex]
          ? this.allTableCross[rowIndex]
          : 0,
        colspan: this.allTableCross[rowIndex] ? 1 : 0
      };
    },

    getType(text) {
      return {
        ["符合"]: "success",
        ["基本符合"]: "warning",
        ["不符合"]: "danger"
      }[text];
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
