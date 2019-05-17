<template>
  <el-row id="special_singlepost">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/post">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/post">任务分派</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}} (任务分派)</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab" type="border-card">
      <!-- Step 1 查看计划说明 -->
      <el-tab-pane label="计划说明" name="info">
        <el-row :gutter="15" style="margin-bottom:15px;">
          <el-col :span="16">
            <el-alert
              title="本页展示的是上级机构下发的计划内容，无法修改。分派具体的任务和检查的单位、人员，请点击上方的任务制定和任务分派页"
              :closable="false"
              type="info"
            ></el-alert>
          </el-col>
        </el-row>

        <el-form label-position="left" label-width="100px">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="计划标题：">
                <el-input :value="plan.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="检查类别：">
                <el-input v-if="plan.kind" :value="planKind(plan.kind)" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="制定日期：">
                <el-date-picker
                  readonly
                  style="width:100%;"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  v-model="plan.date"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="专项通告：">
                <el-input :value="plan.special" :rows="6" type="textarea" resize="none" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="使用模板：">
                <el-input v-if="plan.template" :value="plan.template.name" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="制定单位：">
                <el-input v-if="plan.$dep" :value="plan.$dep.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="接收日期：">
                <el-date-picker
                  readonly
                  style="width:100%;"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  :value="planReciveDate"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行期限：">
                <el-date-picker
                  style="width:100%;"
                  :value="plan.limit"
                  readonly
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截止日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="备注：">
                <el-input :value="plan.remark" :rows="6" type="textarea" resize="none" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <!-- Step 2 制定任务（任务表单） -->
      <el-tab-pane label="任务制定" name="plan">
        <el-form label-position="left" label-width="100px">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="任务标题：" required>
                <el-input v-model="current.title" placeholder="请输入任务标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="10">
              <el-form-item label="执行期限：" required>
                <el-date-picker
                  v-model="current.limit"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="起始日期"
                  end-placeholder="截止日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15" style="margin-bottom:20px;">
            <el-col :span="16">
              <el-alert title="分派任务的期限不能超出计划的期限" type="info" :closable="false" show-icon></el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="详细描述：">
                <el-input
                  v-model="current.desc"
                  resize="none"
                  placeholder="请输入任务的详细说明"
                  :rows="6"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="分派时间：" required>
                <el-date-picker
                  disabled
                  type="datetime"
                  placeholder="设置该计划的分派时间"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  :value="current.date"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <!-- Step 3 选择食品单位 -->
      <el-tab-pane label="选择食品单位" name="biz">
        <el-form label-position="left" style="margin-top:10px;" label-width="90px">
          <el-row style="margin-bottom:35px;">
            <strong
              style="vertical-align:middle;margin-right:15px;"
            >已勾选 {{bizSelection?bizSelection.length:0}} 家食品单位</strong>
            <el-button @click="bizSelectAll" size="mini" plain>全选所有</el-button>
            <el-button @click="bizSelectState" size="mini" plain>全选正常状态</el-button>
            <el-button @click="bizClear" size="mini" plain>清空</el-button>
          </el-row>

          <el-row style="margin-bottom:20px;" :gutter="15">
            <el-col :span="16">
              <el-alert
                title="请为参与检查的食品单位分配两名不同的检查人员。选择完成后点击「确认任务分派」选项卡"
                type="info"
                :closable="false"
                show-icon
              ></el-alert>
            </el-col>
          </el-row>

          <el-row type="flex" :gutter="15">
            <el-col :span="6">
              <el-input
                size="small"
                v-model="search.text"
                clearable
                placeholder="搜索单位名/联系人/电话/许可证号等"
                prefix-icon="el-icon-search"
              ></el-input>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="search.kind" clearable placeholder="选择类别">
                <el-option
                  v-for="(name,index) in bizKind()"
                  :key="index+1"
                  :label="name"
                  :value="index+1"
                ></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="search.category" clearable placeholder="经营种类">
                <el-option v-for="name in bizCategory()" :key="name" :label="name" :value="name"></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="search.licence" clearable placeholder="许可证">
                <el-option label="有许可证" :value="true"></el-option>
                <el-option label="暂无" :value="false"></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="search.state" clearable placeholder="状态">
                <el-option label="正常" :value="1"></el-option>
                <el-option label="关闭" :value="0"></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row>
            <el-col v-if="checkTable" :span="24">
              <el-table
                row-key="_id"
                @selection-change="bizTableSelect"
                :data="bizTableData"
                :row-class-name="tableRowClassName"
                size="medium"
                style="width: 100%;"
                ref="bizTable"
              >
                <el-table-column :reserve-selection="true" type="selection" width="40px"></el-table-column>
                <el-table-column prop="name" label="企业名称" sortable min-width="180px"></el-table-column>
                <el-table-column label="类型" sortable>
                  <template slot-scope="scope">{{bizKind(scope.row.kind)}}</template>
                </el-table-column>
                <el-table-column prop="$dep.name" label="行政区域" sortable></el-table-column>
                <el-table-column prop="contact" label="联系人" sortable></el-table-column>
                <el-table-column prop="phone" label="联系电话"></el-table-column>
                <el-table-column label="许可证编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.lic">{{scope.row.lic.code}}</span>
                    <el-tag v-else type="warning" size="small">暂无许可证</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="状态" sortable>
                  <template slot-scope="scope">
                    <el-tag
                      size="small"
                      :type="getStateType(scope.row.state)"
                    >{{bizState(scope.row.state)}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="检查人员" min-width="100px">
                  <template slot-scope="scope">
                    <el-select
                      style="margin:5px;"
                      v-model="checkTable[scope.row._id][0]"
                      size="mini"
                      clearable
                      placeholder="主检查人员"
                      @change="selectStaff($event,scope.row,0)"
                    >
                      <el-option
                        v-for="item in staffData"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                    <el-select
                      style="margin:5px;"
                      v-model="checkTable[scope.row._id][1]"
                      size="mini"
                      clearable
                      placeholder="协查人员"
                      @change="selectStaff($event,scope.row,1)"
                    >
                      <el-option
                        v-for="item in staffData"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-popover
                      v-if="!checkRow(scope.row._id)"
                      title="错误"
                      width="250"
                      trigger="hover"
                      content="每家企业必须有2名不同的检查人员共同参与检查"
                    >
                      <i slot="reference" style="color:#f56c6c" class="el-icon-error"></i>
                    </el-popover>
                    <i
                      v-if="checkRow(scope.row._id)===true"
                      style="color:#67C23A"
                      class="el-icon-circle-check"
                    ></i>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <!-- Step 4 确认页面 -->
      <el-tab-pane label="确认任务分派" name="confirm">
        <el-row :gutter="15">
          <el-col :span="16">
            <table id="confirmTable">
              <tr class="tablehead">
                <td>被检单位</td>
                <td>检查人员</td>
              </tr>

              <tr v-for="(v,k) in correctCheckBiz" :key="k">
                <td style="min-width:220px;">{{bizData.find(t=>t._id===k).name}}</td>
                <td>
                  <span style="margin:2px;">
                    主检查人:
                    <el-tag size="small">{{staffData.find(t=>t._id===v[0]).name}}</el-tag>
                  </span>
                  <span style="margin:2px;">
                    协查人员:
                    <el-tag size="small">{{staffData.find(t=>t._id===v[1]).name}}</el-tag>
                  </span>
                </td>
              </tr>
            </table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button @click="submit" icon="el-icon-check" type="primary">确认分派</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import { copy, datetime } from "@/utils/utils.js";
import { plan, planKind } from "@/api/plan.js";
import { task, list, emptyTask } from "@/api/task.js";
import { biz, bizKind, bizCategory, bizState } from "@/api/biz.js";
import { staff } from "@/api/staff.js";
import { dep } from "@/api/dep.js";

export default {
  name: "special_singlepost",

  data() {
    return {
      title: null,
      tab: "info",

      plan: {},
      current: emptyTask(),
      checkTable: null,

      bizData: [],
      staffData: [],
      depData: [],

      bizSelection: [],
      staffSelection: [],

      search: {
        text: "",
        category: "",
        kind: "",
        licence: "",
        state: ""
      },

      bizKind,
      bizCategory,
      bizState,
      planKind
    };
  },

  async beforeMount() {
    await this.init();
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.init();
  },

  methods: {
    async init() {
      const planId = this.$route.params.planid;

      let staffList = (await staff(
        null,
        `dep=${this.$store.state.currentUser.dep}`,
        "under=1"
      )).data;
      staffList.forEach(t => (t.checked = true));
      this.staffData = staffList;

      this.depData = (await dep()).data;

      let planData = (await plan(planId)).data;
      planData.$dep = this.depData.find(t => t._id === planData.dep);
      this.plan = planData;

      this.current.date = datetime();
      this.current._plan = this.plan._id;
      this.current.staff = this.$store.state.currentUser._id;

      const postBizIds = [];
      const tasks = (await list(this.current._plan)).data;
      tasks.forEach(task => {
        task.taskbiz.forEach(t => {
          postBizIds.push(t);
        });
      });
      let bizList = (await biz()).data;
      bizList.forEach(biz => {
        biz["$dep"] = this.depData.find(t => t._id === biz.dep);
      });
      bizList = bizList.filter(
        biz =>
          biz.$dep._rel.includes(this.$store.state.currentUser.dep) &&
          !postBizIds.includes(biz._id)
      );

      this.bizData = bizList;

      let ct = {};
      bizList.forEach(biz => {
        ct[biz._id] = [null, null];
      });
      this.checkTable = ct;

      this.title = this.plan.title;
    },

    async submit() {
      let taskData = copy(this.current);
      taskData.progress = [0, this.bizSelection.length];
      taskData.taskstaff = [
        ...new Set(
          Object.values(this.correctCheckBiz).reduce((a, b) => a.concat(b))
        )
      ];
      taskData.taskbiz = this.correctCheckBiz;
      let result = (await task(taskData)).data;
      this.$router.push(`/special/${this.current._plan}/${result._id}`);
    },

    checkRow(id) {
      if (this.checkTable[id][0] === null && this.checkTable[id][1] === null) {
        return 1;
      }

      return (
        this.checkTable[id][0] !== null &&
        this.checkTable[id][1] !== null &&
        this.checkTable[id][0] !== this.checkTable[id][1]
      );
    },

    tableRowClassName({ row }) {
      if (this.checkRow(row._id) === true) {
        return "ok-table-row";
      }

      if (!this.checkRow(row._id)) {
        return "error-table-row";
      }
    },

    selectStaff(val, biz, index) {
      this.bizSelection.forEach(bizId => {
        this.checkTable[bizId._id][index] = val;
      });
    },

    getStateType(state) {
      return ["danger", "success"][state];
    },

    bizTableSelect(selection) {
      this.bizSelection = selection;
    },

    bizSelectAll() {
      this.$refs.bizTable.toggleAllSelection(true);
    },

    bizSelectState() {
      this.$refs.bizTable.clearSelection();
      this.bizTableData
        .filter(t => t.state === 1)
        .forEach(t => this.$refs.bizTable.toggleRowSelection(t, true));
    },

    bizClear() {
      this.$refs.bizTable.clearSelection();
    }
  },

  computed: {
    planReciveDate() {
      if (!this.plan.recive) {
        return "";
      }
      return this.plan.recive.find(
        t => t.dep === this.$store.state.currentUser.dep
      ).date;
    },

    correctCheckBiz() {
      if (!this.checkTable) {
        return {};
      }
      let result = {};
      Object.entries(this.checkTable).forEach(([key, value]) => {
        if (this.checkRow(key) === true) {
          result[key] = value;
        }
      });

      return result;
    },

    bizTableData() {
      let tableData = this.bizData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.contact.includes(searchText) ||
            t.tel.includes(searchText) ||
            (t.lic && t.lic.code.includes(searchText))
        );
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state == this.search.state);
      }

      if (this.search.kind && this.search.kind != "") {
        tableData = tableData.filter(t => t.kind === this.search.kind);
      }

      if (this.search.category && this.search.category != "") {
        tableData = tableData.filter(t => t.category === this.search.category);
      }

      if (this.search.licence !== "") {
        if (this.search.licence === true) {
          tableData = tableData.filter(t => t.lic);
        } else {
          tableData = tableData.filter(t => !t.lic);
        }
      }

      return tableData;
    }
  }
};
</script>

<style lang="scss">
#special_singlepost {
  .el-row {
    margin-bottom: 0;
  }

  .ok-table-row {
    background: #f0f9eb;
  }

  .error-table-row {
    background: oldlace;
  }

  .el-badge__content {
    top: 19px;
    right: -5px;
  }

  #confirmTable {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    .tablehead {
      background-color: #e0e0e0;
    }

    th,
    td {
      border-collapse: collapse;
      border: 1.5px solid #000;
      padding: 5px 8px;
    }
  }
}
</style>
