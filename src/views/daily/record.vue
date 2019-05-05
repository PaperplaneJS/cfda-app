<template>
  <el-row id="daily_record">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">{{currentPlan.title}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/monitor/${currentTask.id}`">{{currentTask.title}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentDetail.biz.com_name}} (详情)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{currentDetail.biz.com_name}} (检查详情)</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="检查计划与任务" name="info">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row style="font-size:18px;margin-bottom:15px;" class="section">现场检查结果</el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="主检查人：">
                <el-input v-model="currentDetail.staffinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属科室：">
                <el-input v-model="currentDetail.departmentinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="协同检查：">
                <el-input v-model="currentDetail.staffinfo[1]" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属科室：">
                <el-input v-model="currentDetail.departmentinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查时间：">
                <el-date-picker
                  style="width:100%;"
                  disabled
                  v-model="currentDetail.date"
                  type="datetime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="检查结果：">
                <el-tag size="medium">{{currentDetail.result}}</el-tag>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="处理方式：">
                <el-tag size="medium">{{currentDetail.handle}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查计划相关信息
            <el-button @click="$router.push('/daily/monitor')" type="text" size="mini">查看计划</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查计划：">
                <el-input v-model="currentPlan.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划类别：">
                <el-select style="width:100%;" disabled v-model="currentPlan.kind">
                  <el-option label="日常检查" value="daily"></el-option>
                  <el-option label="专项检查" value="special"></el-option>
                  <el-option label="全量检查(风险评级)" value="risk"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制定人员：">
                <el-input v-model="currentPlan.staff" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划期限：">
                <el-date-picker
                  style="width:100%;"
                  v-model="currentPlan.limit"
                  disabled
                  type="daterange"
                  range-separator="至"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="接收日期：">
                <el-date-picker
                  style="width:100%;"
                  disabled
                  v-model="currentTask.recive"
                  type="datetime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="使用模板：">
                <el-select disabled style="width:100%;" v-model="currentTemplate.id">
                  <el-option
                    v-for="item of getTemplates().map(t=>({id:t.id,name:t.name}))"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-button
                @click="$router.push('/base/template/'+currentTemplate.id)"
                type="text"
              >查看模板</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="计划备注：">
                <el-input v-model="currentPlan.remark" :rows="4" disabled type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">分派任务详情
            <el-button @click="$router.push('/daily/monitor')" type="text" size="mini">查看任务</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="任务标题：">
                <el-input v-model="currentTask.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分派日期：">
                <el-date-picker
                  style="width:100%;"
                  disabled
                  v-model="currentTask.date"
                  type="datetime"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="任务期限：">
                <el-date-picker
                  style="width:100%;"
                  v-model="currentTask.limit"
                  disabled
                  type="daterange"
                  range-separator="至"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="任务描述:">
                <el-input v-model="currentTask.desc" :rows="4" type="textarea" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">被检查单位信息
            <el-button
              @click="$router.push('/base/biz/'+currentDetail.biz.id)"
              type="text"
              size="mini"
            >查看单位</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查单位名：">
                <el-input v-model="currentDetail.biz.com_name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="负责人：">
                <el-input v-model="currentDetail.biz.com_contact" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="currentDetail.biz.com_contactphone" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="currentDetail.biz.lic_code">
            <el-col :span="8">
              <el-form-item label="许可证号：">
                <el-input v-model="currentDetail.biz.lic_code" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="单位地址：">
                <el-input
                  v-model="currentDetail.biz.com_address"
                  :rows="4"
                  disabled
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="详细结果" name="detail">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="checkResult"
              :span-method="resultSpan"
              size="medium"
              style="width: 100%;margin-bottom:20px;"
              border
            >
              <el-table-column label="检查内容" width="200px">
                <template slot-scope="scope">
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="mini">{{scope.row.i+1}}</el-tag>
                  {{scope.row.item}}
                </template>
              </el-table-column>
              <el-table-column prop="detail" label="检查项目">
                <template slot-scope="scope">
                  <el-tag
                    style="margin-bottom:5px;margin-right:8px;"
                    size="mini"
                  >{{scope.row.i+1}}.{{scope.row.j+1}}</el-tag>
                  <el-tag
                    style="margin-bottom:5px;margin-right:8px;"
                    v-if="scope.row.important"
                    size="mini"
                    type="danger"
                  >重点项</el-tag>
                  {{scope.row.detail}}
                </template>
              </el-table-column>
              <el-table-column label="结果" width="120px">
                <template slot-scope="scope">
                  <el-tag
                    v-if="scope.row.result"
                    :type="getResultType(scope.row.result)"
                    size="mini"
                  >
                    {{scope.row.result.check}}
                    <strong
                      v-if="scope.row.result.point"
                    >[分值:{{scope.row.result.point}}]</strong>
                  </el-tag>
                  <el-tag v-else size="small" type="info">留空项</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="90px">
                <template slot-scope="scope">
                  <el-popover
                    v-if="scope.row.result&&scope.row.result.remark"
                    placement="top-start"
                    title="备注"
                    width="400"
                    trigger="hover"
                    :content="scope.row.result.remark"
                  >
                    <el-button style="margin:0 5px;" size="mini" slot="reference">备注</el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="查看报告" name="report">
        <el-row>
          <el-col :span="24">
            <el-button icon="el-icon-printer" size="medium" type="primary">打印报告</el-button>
          </el-col>
        </el-row>

        <div id="report_main">
          <div class="title">
            <h3>江苏省苏州市常熟市{{getAreaByID(currentDetail.biz.area).name}}食品药品监督管理局</h3>
            <h1>食品生产经营日常监督检查结果记录表</h1>
            <p>编号:{{currentDetail.num}}</p>
          </div>

          <table>
            <tr class="info">
              <td class="label">名称:</td>
              <td>{{currentDetail.biz.com_name}}</td>
              <td class="label">地址:</td>
              <td>{{currentDetail.biz.com_address}}</td>
            </tr>
            <tr class="info">
              <td class="label">联系人:</td>
              <td>{{currentDetail.biz.com_contact}}</td>
              <td class="label">联系方式:</td>
              <td>{{currentDetail.biz.com_contactphone}}</td>
            </tr>
            <tr class="info">
              <td class="label">许可证编号:</td>
              <td>{{currentDetail.biz.lic_code?currentDetail.biz.lic_code:""}}</td>
              <td class="label">检查次数:</td>
              <td>本年度第{{currentDetail.yearcount}}次检查</td>
            </tr>
            <tr>
              <td class="content" colspan="4">
                <p>检查内容：</p>
                <p>江苏省苏州市常熟市{{departmentName}}食品药品监督管理局检查人员{{staffName[0]}}、{{staffName[1]}}根据《中华人民共和国食品安全法》及其实施条例、《{{currentTemplate.name}}》的规定，于{{currentDetail.date}}对你单位进行了监督检查。本次监督检查按照表《{{currentTemplate.name}}》开展，共检查了{{currentDetail.content.length}}项内容。其中:</p>
                <p>重点项{{checkItems[0].length}}项，项目序号分别是：{{checkItems[0].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[0].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[0].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。</p>
                <p>一般项{{checkItems[1].length}}项，项目序号分别是：{{checkItems[1].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[1].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[1].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。</p>
              </td>
            </tr>
            <tr>
              <td class="result" colspan="4">
                <p>
                  检查结果：
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.result=='符合'}"></span>
                    符合
                  </span>
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.result=='基本符合'}"></span>
                    基本符合
                  </span>
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.result=='不符合'}"></span>
                    不符合
                  </span>
                </p>
                <p>
                  结果处理：
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.handle=='通过'}"></span>
                    通过
                  </span>
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.handle=='通知整改'}"></span>
                    书面限期整改
                  </span>
                  <span class="resultselected">
                    <span :class="{'checked':currentDetail.handle=='停业整顿'}"></span>
                    食品生产经营者立即停止食品生产经营活动
                  </span>
                </p>
                <p style="margin-top:10px;">说明：</p>
                <p class="desc"></p>
              </td>
            </tr>
            <tr class="sign">
              <td colspan="2">
                <p>执法人员(签名)：</p>
                <p
                  style="text-align:right;margin-top:90px;"
                >年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
              </td>
              <td colspan="2">
                <p>被检查单位意见：</p>
                <p style="margin-top:40px;">法人或责任人意见：</p>
                <p
                  style="text-align:right;margin-top:30px;"
                >年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
              </td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
export default {
  name: "daily_record",

  data() {
    return {
      getTemplates,
      getAreaByID,

      tab: "info",
      currentPlan: null,
      currentTask: null,
      currentDetail: null,
      currentTemplate: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    checkResult() {
      let result = [];
      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];

          let item = {
            i,
            j,
            detail: templateItem.content,
            important: templateItem.important,
            result: this.currentDetail.content[`${i + 1}.${j + 1}`]
          };

          if (j === 0) {
            item.item = template[i].title;
            item.rowspan = template[i].children.length;
          }

          result.push(item);
        }
      }

      return result;
    },

    checkItems() {
      let result = [[], []];
      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];
          let checkItem = this.currentDetail.content[`${i + 1}.${j + 1}`];
          if (checkItem) {
            let r = {
              num: `${i + 1}.${j + 1}`,
              checked: checkItem.checked
            };

            if (templateItem.important) {
              result[0].push(r);
            } else {
              result[1].push(r);
            }
          }
        }
      }
      return result;
    },

    staffName() {
      return [
        getStaffByID(this.currentDetail.staff[0].id).name,
        getStaffByID(this.currentDetail.staff[1].id).name
      ];
    },

    departmentName() {
      return getAreaByID(this.currentDetail.biz.area).name;
    }
  },

  methods: {
    init() {
      let taskid = this.$route.params.taskid;
      let taskrecordid = this.$route.params.taskrecordid;

      getTaskItems().forEach(t => {
        let taskItem = t.tasklist.find(ti => ti.id == taskid);
        if (taskItem) {
          let task = copy(taskItem);
          task.recive = t.recive;
          this.currentTask = task;
          this.currentPlan = getPlanByID(t.planid);
          this.currentTemplate = getTemplates().find(
            t => t.id == this.currentPlan.template
          );

          return false;
        }
      });
      let detail = this.currentTask.detail.find(d => d.id == taskrecordid);

      detail.biz = getBizByID(detail.bizid);
      detail.staffinfo = [
        getStaffByID(detail.staff[0].id).name,
        getStaffByID(detail.staff[1].id).name
      ];
      detail.departmentinfo = [
        getAreaByID(detail.staff[0].department).name,
        getAreaByID(detail.staff[1].department).name
      ];

      this.currentDetail = detail;
    },

    resultSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return;
      }

      return {
        colspan: row.rowspan ? 1 : 0,
        rowspan: row.rowspan || 0
      };
    },

    getResultType(result) {
      if (result.checked === null || result.checked === undefined) {
        return "";
      }

      return result.checked ? "success" : "danger";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

#report_main {
  width: 700px;
  margin-top: 20px;

  .title {
    h3 {
      font-size: 22px;
      text-align: center;
      font-weight: normal;
      margin: 5px 0;
    }

    h1 {
      text-align: center;
    }

    p {
      text-align: right;
      margin: 5px 0;
      font-size: 15px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border-collapse: collapse;
      border: 1.5px solid #000;
      padding: 5px 8px;
    }

    tr.info {
      td {
        width: 34%;
      }

      .label {
        width: 16%;
      }
    }

    .content {
      p {
        margin: 0 0 8px;
        text-indent: 30px;

        &:first-child {
          text-indent: 0;
        }
      }
    }

    .result {
      p {
        margin: 0;
      }
      .resultselected {
        margin-right: 10px;

        span {
          width: 8px;
          height: 8px;
          border: 1px solid #000;
          display: inline-block;
        }

        .checked {
          background-color: #000;
        }
      }

      .desc {
        text-indent: 30px;
        min-height: 140px;
      }
    }

    .sign {
      p {
        margin: 0;
      }
    }
  }
}
</style>
