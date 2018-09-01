<template>
  <div id="grid_singlemember">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form :rules="rules" ref="currentMmeber" :model="currentMmeber" label-position="left" style="margin-top:20px;" label-width="90px">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="人员姓名:" prop="name">
            <el-input v-model="currentMmeber.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别:" prop="sex">
            <el-radio v-model="currentMmeber.sex" :label="1">男</el-radio>
            <el-radio v-model="currentMmeber.sex" :label="2">女</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:" prop="state">
            <el-radio v-model="currentMmeber.state" :label="1">激活</el-radio>
            <el-radio v-model="currentMmeber.state" :label="2">注销</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="职务:" prop="job">
            <el-input v-model="currentMmeber.job"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属层级:" prop="area">
            <el-cascader :show-all-levels="false" v-model="currentMmeber.area" :props="{label:'name',value:'id'}" :options="$store.state.demoData.gridArea" placeholder="选择层级" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">提交</el-button>
        <router-link to="/grid/member">
          <el-button style="margin-left:20px;">返回网格人员</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "grid_singlemember",
  data() {
    return {
      title: null,
      currentMmeber: null,
      rules: {
        name: [
          {
            required: true,
            message: "必须输入人员姓名",
            trigger: "blur"
          }
        ],
        sex: [
          {
            required: true,
            message: "必须设置人员性别",
            trigger: "change"
          }
        ],
        state: [{ required: true }],
        job: [{ required: true, message: "必须输入人员职务", trigger: "blur" }],
        area: [{ required: true }]
      }
    };
  },

  beforeMount() {
    let gmid = this.$route.params.gridmemberid;

    if (gmid === "new") {
      this.currentMmeber = {
        name: "",
        sex: null,
        state: 1,
        job: "",
        area: null
      };
      this.title = "新的网格人员";
    } else {
      let member = this.$store.state.demoData.copy(
        this.$store.state.demoData.gridMember.find(t => t.id == gmid)
      );

      this.currentMmeber = {
        id: gmid,
        name: member.name,
        sex: member.sex,
        state: member.state,
        job: member.job,
        area: this.$store.state.demoData.findAreaIDArray(member.area)
      };

      this.title = this.currentMmeber.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>

