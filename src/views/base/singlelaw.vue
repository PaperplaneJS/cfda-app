<template>
  <div id="base_singlelaw">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">法律法规管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>
    <el-upload class="upload-demo" drag action="/">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">可以上传pdf/doc/docx/txt文件</div>
    </el-upload>

    <el-row style="margin-top:25px;">
      <el-button icon="el-icon-upload" type="primary">确认上传</el-button>
      <el-button icon="el-icon-view">预览</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "base_singlelaw",
  data() {
    return {
      currentLaw: null,
      title: ""
    };
  },
  beforeMount() {
    let lid = this.$route.params.lawid;
    if (lid.trim() === "new") {
      this.currentLaw = {
        name: ""
      };
      this.title = "新建法律法规";
    } else {
      this.title = "";
    }
  }
};
</script>
