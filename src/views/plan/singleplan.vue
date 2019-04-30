<template>
  <el-row id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan">所有计划</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>
    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="margin-bottom:50px;">
        <el-col :span="16">
          <div style="width:100%;" v-if="!isNew">
            <el-steps :active="Math.min(4,origin.state)" :finish-status="origin.state==5?'danger':'success'">
              <el-step title="制定计划"></el-step>
              <el-step title="计划分发"></el-step>
              <el-step title="执行中"></el-step>
              <el-step v-if="origin.state<5" title="完成"></el-step>
              <el-step v-if="origin.state==5" title="终止"></el-step>
            </el-steps>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="计划标题:" required>
            <el-input :disabled="!edit" v-model="current.title" placeholder="请输入计划标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="执行期限:" required>
            <el-date-picker
              style="width:100%;"
              :disabled="!edit"
              v-model="current.limit"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:20px;" :gutter="15">
        <el-col :span="16">
          <el-alert show-icon title="下级单位可以将计划分派为具体检查任务，检查任务的期限必须包含在计划的执行期限内" type="info"></el-alert>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="检查类别:" required>
            <el-select
              style="width:100%;"
              :disabled="!edit"
              v-model="current.kind"
              placeholder="请选择"
              @change="template = ''"
            >
              <el-option v-for="(v,k) in planKind()" :label="v" :value="k" :key="k"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <template v-if="current.kind==='special'">
        <el-row :gutter="15">
          <el-col :span="16">
            <el-form-item label="专项通知:">
              <el-input
                :disabled="!edit"
                :rows="4"
                v-model="current.special"
                type="textarea"
                placeholder="专项检查通知"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:20px;" :gutter="15">
          <el-col :span="16">
            <el-alert show-icon title="专项检查可以单独设置专项检查的通告，以体现专项检查的特殊性" type="info"></el-alert>
          </el-col>
        </el-row>
      </template>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="使用模板：" required>
            <el-select :disabled="!edit" style="width:100%;" v-model="template">
              <el-option
                v-for="t in currentTemplateList"
                :key="t._id"
                :label="t.name"
                :value="t._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="备注:">
            <el-input
              :disabled="!edit"
              :rows="4"
              v-model="current.remark"
              type="textarea"
              placeholder="选填,工作备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="制定单位:">
            <el-input disabled v-model="dep.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制定人员:">
            <el-input disabled v-model="staff.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="制定日期:" required>
            <el-date-picker
              style="width:100%;"
              disabled
              :value="datetime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="计划制定日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <template v-if="origin.state>1">
        <el-row style="margin-bottom:20px;" :gutter="15">
          <el-col :span="16">
            <el-alert show-icon title="当前任务已被分发，以下是接收情况。" type="info"></el-alert>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="已接收单位:">
              <template v-if="origin.recive.length>0">
                <el-tag
                  style="margin:5px;"
                  size="small"
                  v-for="s in origin.recive"
                  :key="s.dep"
                >{{getDepInfo(s.dep).name}} | {{s.date}}</el-tag>
              </template>
              <el-tag v-else style="margin:5px;" size="small" type="info">无</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="未接收单位:">
              <template v-if="norecive.length>0">
                <el-tag
                  style="margin:5px;"
                  type="warning"
                  size="small"
                  v-for="depId in norecive"
                  :key="depId"
                >{{getDepInfo(depId).name}}</el-tag>
              </template>
              <el-tag v-else style="margin:5px;" size="small" type="info">无</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button
          @click="edit=true"
          v-if="origin.state===1&&!edit"
          icon="el-icon-edit"
          type="primary"
        >编辑</el-button>
        <el-button
          @click="editOK"
          v-if="edit"
          icon="el-icon-check"
          type="primary"
        >{{isNew?"完成新建":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/plan">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { plan, emptyPlan, planKind, planState } from "@/api/plan.js";
import { staff } from "@/api/staff.js";
import { dep } from "@/api/dep.js";
import { template } from "@/api/template.js";
import { copy, datetime } from "@/utils/utils.js";

export default {
  name: "plan_singleplan",

  data() {
    return {
      title: null,
      edit: null,
      isNew: null,

      depData: [],
      cascadeDepData: [],
      staffData: [],
      templateData: [],

      dep: {},
      staff: {},
      datetime: datetime(),
      template: "",

      current: Object.assign(emptyPlan(), { special: "" }),
      origin: Object.assign(emptyPlan(), { special: "" }),

      planKind,
      planState
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

      this.isNew = planId === "new";
      this.edit = planId === "new";

      this.depData = (await dep()).data;
      this.cascadeDepData = (await dep(null, false, true)).data;
      this.staffData = (await staff()).data;
      this.templateData = (await template()).data;

      this.origin.date = this.datetime;
      this.origin.dep = this.dep._id;
      this.origin.staff = this.staff.id;

      if (!this.isNew) {
        this.origin = (await plan(planId)).data;
        this.datetime = this.origin.date;
        this.template = this.origin.template._id;
      }

      this.staff = this.staffData.find(
        t =>
          t._id ===
          (this.isNew ? this.$store.state.currentUser._id : this.origin.staff)
      );

      this.dep = this.depData.find(
        t =>
          t._id ===
          (this.isNew ? this.$store.state.currentUser.dep : this.origin.dep)
      );

      this.title = this.isNew ? "新建检查计划" : this.origin.title;
      this.current = copy(this.origin);
    },

    getDepInfo(depId) {
      return this.depData.find(t => t._id === depId);
    },

    async editOK() {
      let planData = copy(this.current);
      planData.staff = this.staff._id;
      planData.dep = this.dep._id;
      planData.template = (await template(this.template)).data;

      if (this.current.kind !== "special") {
        delete planData["special"];
      }

      this.origin = (await plan(planData)).data;
      if (this.isNew) {
        this.$router.push(`/plan/${this.origin._id}`);
      } else {
        this.init();
      }
    },

    editCancel() {
      this.current = copy(this.origin);
      this.edit = false;
    }
  },

  computed: {
    currentTemplateList() {
      return this.current.kind === "risk"
        ? this.templateData.filter(t => t.kind === "risk")
        : this.templateData.filter(t => t.kind === "daily");
    },

    norecive() {
      if (!this.current.recive) {
        return [];
      }
      let reciveDepIds = this.current.recive.map(t => t.dep);
      return this.current.post.filter(t => !reciveDepIds.includes(t));
    }
  }
};
</script>

<style lang="scss">
#plan_singleplan {
  .el-row {
    margin-bottom: 0;
  }
  .el-transfer-panel {
    width: 350px;
  }
}
</style>


