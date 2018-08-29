<template>
  <div id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/list">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/list">查看与制定</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>
    <el-form label-position="left" style="margin-top:20px;" label-width="100px">

      <el-row>
        <el-col :span="12">
          <el-form-item label="计划标题:">
            <el-input placeholder="请输入计划标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="制定科室:">
            <el-input placeholder="请输入制定该计划的科室名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制定人员:">
            <el-input placeholder="请输入计划制定人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="执行期限:">
            <el-date-picker type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="检查类别:">
            <el-select v-model="currentPlan.kind" placeholder="请选择">
              <el-option label="日常检查" value="daily"></el-option>
              <el-option label="专项检查" value="special"></el-option>
              <el-option label="全量检查(风险评级)" value="risk"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="currentPlan.kind==='special'">
        <el-col :span="12">
          <el-form-item label="专项通知:">
            <el-input :rows="4" type="textarea" placeholder="专项检查通知"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input :rows="4" type="textarea" placeholder="选填,工作备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="计划制定日期:">
            <el-date-picker type="date" placeholder="选择计划制定日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">完成制定</el-button>
        <router-link to="/plan/list">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "plan_singleplan",
  data() {
    return {
      title: null,
      currentPlan: null
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;

    if (planid.trim() === "new") {
      this.currentPlan = {
        kind: null
      };

      this.title = "制定新的计划";
    } else {
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


