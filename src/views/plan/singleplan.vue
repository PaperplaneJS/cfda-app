<template>
  <el-row id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/list">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/list">查看制定</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>
    <el-form label-position="left" style="margin-top:20px;" label-width="100px">

      <el-row>
        <el-col :span="16">
          <el-form-item label="计划标题:" required>
            <el-input :disabled="!edit" v-model="currentPlan.title" placeholder="请输入计划标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="执行期限:" required>
            <el-date-picker style="width:100%;" :disabled="!edit" v-model="currentPlan.limit" type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:20px;" :gutter="15">
        <el-col :span="16">
          <el-alert show-icon title="下级单位可以将计划分派为具体检查任务，检查任务的期限必须包含在计划的执行期限内" type="info">
          </el-alert>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="检查类别:" required>
            <el-select style="width:100%;" :disabled="!edit" v-model="currentPlan.kind" placeholder="请选择">
              <el-option label="日常检查" value="daily"></el-option>
              <el-option label="专项检查" value="special"></el-option>
              <el-option label="全量检查(风险评级)" value="risk"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <template v-if="currentPlan.kind==='special'">
        <el-row :gutter="15">
          <el-col :span="16">
            <el-form-item label="专项通知:">
              <el-input :disabled="!edit" :rows="4" v-model="currentPlan.special" type="textarea" placeholder="专项检查通知"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:20px;" :gutter="15">
          <el-col :span="16">
            <el-alert show-icon title="专项检查可以单独设置专项检查的通告，以体现专项检查的特殊性" type="info">
            </el-alert>
          </el-col>
        </el-row>
      </template>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="使用模板：" required>
            <el-select :disabled="!edit" style="width:100%;" v-model="currentPlan.templateid">
              <el-option v-for="item of taskTemplate" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="备注:">
            <el-input :disabled="!edit" :rows="4" v-model="currentPlan.remark" type="textarea" placeholder="选填,工作备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="制定科室:">
            <el-input disabled v-model="currentPlan.department"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制定人员:">
            <el-input disabled v-model="currentPlan.staff"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="制定日期:" required>
            <el-date-picker style="width:100%;" :disabled="!edit" v-model="currentPlan.date" type="date" placeholder="选择计划制定日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button @click="edit=true" v-if="!edit" icon="el-icon-edit" type="primary">编辑</el-button>
        <el-button @click="editOK" v-if="edit" icon="el-icon-check" type="primary">{{isNew?"完成新建":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/plan/list">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "plan_singleplan",
  data() {
    return {
      title: null,
      edit: null,
      isNew: null,
      currentPlan: null,
      originPlan: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    taskTemplate() {
      let list = copy(this.$store.state.template);

      if (
        this.currentPlan.kind == "daily" ||
        this.currentPlan.kind == "special"
      ) {
        list = list.filter(t => t.kind == "daily");
      } else if (this.currentPlan.kind == "risk") {
        list = list.filter(t => t.kind == "risk");
      } else {
        return [];
      }

      return list.map(t => {
        return { id: t.id, name: t.name };
      });
    }
  },

  methods: {
    init() {
      let planid = this.$route.params.planid;

      if (planid.trim() === "new") {
        this.currentPlan = {
          title: "",
          department: this.$store.state.current.staff.department,
          staff: this.$store.state.current.staff.name,
          kind: null,
          date: null,
          limit: [],
          state: 1,
          remark: "",
          special: "",
          templateid: null
        };

        this.title = "制定新的计划";
        this.isNew = true;
        this.edit = true;
      } else {
        let plan = this.$store.state.plan.find(t => t.id == planid);
        if (!plan.special) {
          plan.special = "";
        }
        this.currentPlan = plan;
        this.originPlan = copy(this.currentPlan);

        this.title = this.currentPlan.title;
        this.isNew = false;
        this.edit = false;
      }
    },

    editOK() {},

    editCancel() {
      this.currentPlan = copy(this.originPlan);
      this.edit = false;
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


