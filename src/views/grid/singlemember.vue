<template>
  <div id="grid_singlemember">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form :rules="rules" ref="currentMember" :model="currentMember" label-position="left" style="margin-top:20px;" label-width="90px">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="人员姓名:" prop="name">
            <el-input :disabled="!edit" v-model="currentMember.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别:" prop="sex">
            <el-radio-group :disabled="!edit" v-model="currentMember.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:" prop="state">
            <el-radio-group :disabled="!edit" size="small" v-model="currentMember.state">
              <el-radio :label="1">激活</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="职务:" prop="job">
            <el-input :disabled="!edit" v-model="currentMember.job" placeholder="请输入人员职务"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="所属层级:" prop="area">
            <el-cascader :disabled="!edit" :show-all-levels="false" v-model="currentMember.area" :props="{label:'name',value:'id'}" :options="$store.state.gridarea.gridarea" placeholder="选择层级" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button @click="edit=true" v-if="!edit" icon="el-icon-edit" type="primary">编辑该人员</el-button>
        <el-button @click="editOK" v-if="edit" icon="el-icon-check" type="primary">{{isNew?"完成新建":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/grid/member">
          <el-button style="margin-left:20px;">返回网格人员</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "grid_singlemember",
  data() {
    return {
      title: null,
      isNew: null,
      edit: null,
      currentMember: null,
      originMemebr: null,
      rules: {
        name: [
          {
            required: true,
            message: "必须输入人员姓名",
            trigger: ["blur", "change"]
          }
        ],
        sex: [
          {
            required: true,
            message: "必须设置人员性别",
            trigger: ["blur", "change"]
          }
        ],
        state: [
          {
            required: true,
            message: "必须设置人员状态",
            trigger: ["blur", "change"]
          }
        ],
        job: [
          {
            required: true,
            message: "必须输入人员职务",
            trigger: ["blur", "change"]
          }
        ],
        area: [
          {
            required: true,
            message: "必须输入人员所属网格区域",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  beforeMount() {
    this.init();
  },

  methods: {
    init() {
      let gmid = this.$route.params.gridmemberid;

      if (gmid === "new") {
        this.currentMember = {
          name: "",
          sex: 1,
          state: 1,
          job: "",
          area: null
        };
        this.isNew = true;
        this.edit = true;
        this.title = "新的网格人员";
      } else {
        let member = copy(this.$store.state.gridmember.find(t => t.id == gmid));

        this.currentMember = {
          id: gmid,
          name: member.name,
          sex: member.sex,
          state: member.state,
          job: member.job,
          area: this.$store.state.gridarea.findAreaIDArray(member.area)
        };
        this.originMemebr = copy(this.currentMember);

        this.isNew = false;
        this.edit = false;
        this.title = this.currentMember.name;
      }
    },

    editOK() {},

    editCancel() {
      this.currentMember = copy(this.originMemebr);
      this.edit = false;
    },
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>

