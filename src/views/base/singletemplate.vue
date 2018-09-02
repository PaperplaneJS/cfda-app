<template>
  <el-row id="base_singletemplate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">模板管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板详情</el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="模板名称：">
            <el-input v-model="currentTemplate.name" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="创建人：">
            <el-input disabled v-model="currentTemplate.staff"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所属科室：">
            <el-input disabled v-model="currentTemplate.department"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="激活状态：">
            <el-radio-group v-model="currentTemplate.state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板内容</el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-check" type="primary">提交</el-button>
        <router-link to="/base/template">
          <el-button style="margin-left:20px;">返回模板管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "base_singletemplate",
  data() {
    return {
      title: "",
      currentTemplate: null,
      originTemplate: null
    };
  },
  beforeMount() {
    let tid = this.$route.params.templateid;
    if (tid.trim() === "new") {
      this.currentTemplate = {
        name: "",
        state: 1,
        checkitem: [],
        staff: "",
        department: ""
      };
      this.title = "新建检查模板";
    } else {
      this.currentTemplate = copy(
        this.$store.state.demoData.checkTemplate.find(t => t.id == tid)
      );
      this.originTemplate = copy(this.currentTemplate);
      this.title = this.currentTemplate.name;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
