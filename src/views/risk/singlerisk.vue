<template>
  <div id="risk_singlerisk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">风险评级</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">基本信息</el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位名:">
            <el-input v-model="currentRisk.biz.name" :readonly="isreadonly"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="许可证编号:">
            <el-input v-model="currentRisk.biz.code" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="单位类型:">
            <el-input v-model="currentRisk.biz.kind" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="负责人:">
            <el-input v-model="currentRisk.biz.legal" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系电话:">
            <el-input v-model="currentRisk.biz.tel" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="单位地址:">
            <el-input v-model="currentRisk.biz.address" resize="none" readonly type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">评级结果</el-row>
      <el-row :gutter="15">
        <el-col :span="12">
          <router-link to="">
            <el-button size="small" type="primary" icon="el-icon-plus">新增风险检查</el-button>
          </router-link>
        </el-col>
      </el-row>

      <el-collapse style="margin-top:20px;" v-model="collapse">

        <el-collapse-item v-for="item of currentRisk.riskinfo" :key="`${item.year}-${item.times}`" :name="`${item.year}-${item.times}`">
          <template slot="title">
            <span>{{item.year}}年第{{item.times}}次</span>
            <el-tag size="mini" style="margin-left:10px;">风险分:{{item.finalpoint}} 等级:{{item.lv}}</el-tag>
          </template>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="检查科室:">
                <el-input v-model="item.department" :readonly="isreadonly"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="执法人员:">
                <el-input v-model="item.staff" :readonly="isreadonly"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="检查时间:">
                <el-date-picker :readonly="isreadonly" v-model="item.date" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-popover placement="top-start" title="静态风险分值" width="400" trigger="hover" :content="`${item.staticdetail.kind}:${item.staticdetail.name} [编号 : ${item.staticdetail.code} 级别 : ${item.staticdetail.level}]`">
                <el-button style="margin-right:20px;" size="small" slot="reference">静态风险分值: {{item.staticpoint}}</el-button>
              </el-popover>

              <el-button @click.native="showPopup(item)" size="small" type="primary">查看动态风险</el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>

    </el-form>

    <el-dialog title="动态风险" v-if="isPopup" :visible.sync="isPopup">
      <el-table max-height="400" :data="activeRiskRows" :span-method="tableSpan" size="medium" style="width: 100%" border>
        <el-table-column prop="item" label="检查项目"></el-table-column>
        <el-table-column prop="detail" label="检查内容" min-width="160"></el-table-column>
        <el-table-column prop="result" label="结果"></el-table-column>
        <el-table-column prop="point" label="得分" min-width="80"></el-table-column>
        <el-table-column label="备注" width="80">
          <template slot-scope="scope">
            <el-popover v-if="scope.row.remark" placement="top-start" title="备注" width="400" trigger="hover" :content="scope.row.remark">
              <el-button size="small" slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="isPopup=false">完成</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "risk_singlerisk",
  data() {
    return {
      currentRisk: null,
      collapse: null,
      isPopup: false,
      popupItem: null,
      title: null,
      isreadonly: true
    };
  },

  beforeMount() {
    let riskid = this.$route.params.riskid;
    if (riskid === "1") {
      this.currentRisk = {
        biz: {
          name: "常吉面馆环城北路店",
          legal: "王小明",
          tel: "13872663110",
          address: "环城北路",
          code: "CS-012-552320",
          kind: "食品加工"
        },
        riskinfo: [
          {
            year: 2017,
            times: 1,
            date: "2017-07-01 12:00:00",
            staff: "张小明",
            department: "综合办公室",
            lv: "A",
            staticpoint: 13.5,
            activepoint: 10,
            finalpoint: 13,
            staticdetail: {
              kind: "粮食加工品",
              name: "小麦粉",
              code: "0101",
              level: "低(I)"
            },
            activedetail: {
              "1.生产环境条件": [
                {
                  num: "1.1",
                  isimportant: false,
                  content: "厂区无扬尘、无积水，厂区、车间卫生整洁。",
                  result: "符合",
                  remark: "",
                  point: 2
                },
                {
                  num: "1.2",
                  isimportant: true,
                  content:
                    "厂区、车间与有毒、有害场所及其他污染源保持规定的距离。",
                  result: "符合",
                  remark: "",
                  point: 5
                },
                {
                  num: "1.3",
                  isimportant: true,
                  content:
                    "卫生间应保持清洁，应设置洗手设施，未与食品生产、包装或贮存等区域直接连通。",
                  result: "符合",
                  remark: "",
                  point: 3
                }
              ],
              "2.进货查验结果": [
                {
                  num: "2.1",
                  isimportant: true,
                  content:
                    "查验食品原辅料、食品添加剂、食品相关产品供货者的许可证、产品合格证明文件；供货者无法提供有效合格证明文件的食品原料，有检验记录。",
                  result: null,
                  remark: "负责人不在",
                  point: 4
                },
                {
                  num: "2.2",
                  isimportant: true,
                  content:
                    "进货查验记录及证明材料真实、完整，记录和凭证保存期限不少于产品保质期期满后六个月，没有明确保质期的，保存期限不少于二年。",
                  result: null,
                  remark: "负责人不在",
                  point: 4
                },
                {
                  num: "2.3",
                  isimportant: true,
                  content:
                    "建立和保存食品原辅料、食品添加剂、食品相关产品的贮存、保管记录和领用出库记录。",
                  result: "不符合",
                  remark: "负责人不在",
                  point: 3
                }
              ]
            }
          },
          {
            year: 2018,
            times: 1,
            date: "2018-05-01 12:00:00",
            staff: "王强",
            department: "综合办公室",
            lv: "A",
            staticpoint: 13.5,
            activepoint: 20,
            finalpoint: 18,
            staticdetail: {
              kind: "粮食加工品",
              name: "小麦粉",
              code: "0101",
              level: "低(I)"
            },
            activedetail: {
              "1.生产环境条件": [
                {
                  num: "1.1",
                  isimportant: false,
                  content: "厂区无扬尘、无积水，厂区、车间卫生整洁。",
                  result: "符合",
                  remark: "",
                  point: 2
                },
                {
                  num: "1.2",
                  isimportant: true,
                  content:
                    "厂区、车间与有毒、有害场所及其他污染源保持规定的距离。",
                  result: "符合",
                  remark: "",
                  point: 5
                },
                {
                  num: "1.3",
                  isimportant: true,
                  content:
                    "卫生间应保持清洁，应设置洗手设施，未与食品生产、包装或贮存等区域直接连通。",
                  result: "符合",
                  remark: "",
                  point: 3
                }
              ],
              "2.进货查验结果": [
                {
                  num: "2.1",
                  isimportant: true,
                  content:
                    "查验食品原辅料、食品添加剂、食品相关产品供货者的许可证、产品合格证明文件；供货者无法提供有效合格证明文件的食品原料，有检验记录。",
                  result: null,
                  remark: "负责人不在",
                  point: 4
                },
                {
                  num: "2.2",
                  isimportant: true,
                  content:
                    "进货查验记录及证明材料真实、完整，记录和凭证保存期限不少于产品保质期期满后六个月，没有明确保质期的，保存期限不少于二年。",
                  result: null,
                  remark: "负责人不在",
                  point: 4
                },
                {
                  num: "2.3",
                  isimportant: true,
                  content:
                    "建立和保存食品原辅料、食品添加剂、食品相关产品的贮存、保管记录和领用出库记录。",
                  result: "不符合",
                  remark: "负责人不在",
                  point: 3
                }
              ]
            }
          }
        ]
      };
      this.title = this.currentRisk.biz.name;
    } else {
      this.currentRisk = {
        biz: {
          name: "",
          legal: "",
          tel: "",
          address: "",
          code: "",
          kind: ""
        },
        riskinfo: []
      };
      this.title = "新建风险评级记录";
      this.isreadonly = false;
    }
  },

  computed: {
    activeRiskRows() {
      let rows = [];
      Object.entries(this.popupItem).forEach(([itemName, itemContentArray]) => {
        itemContentArray.forEach(content => {
          rows.push({
            item: itemName,
            detail: content.content,
            result: content.result,
            point: content.point,
            remark: content.remark
          });
        });
      });

      return rows;
    },

    allTableCross() {
      let itemContain = [],
        t = 0;
      Object.entries(this.popupItem).forEach(([checkItemName, checkDetail]) => {
        itemContain[t] = checkDetail.length;
        t += checkDetail.length;
      });

      return itemContain;
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

    showPopup(item) {
      this.popupItem = item.activedetail;
      this.isPopup = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
