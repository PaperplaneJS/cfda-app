<template>
  <el-row id="base_singlelaw">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">法律法规管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="title">{{title}}</el-row>
    <el-row class="content"></el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils";
import { law, emptyLaw, lawState } from "@/api/law";

export default {
  name: "base_singlelaw",

  data() {
    return {
      title: "",
      isnew: false,
      edit: false,

      current: emptyLaw(),
      origin: emptyLaw()
    };
  },
  beforeMount() {
    this.init();
  },

  methods: {
    async init() {
      const lawid = this.$route.params.lawid;
      this.isNew = lawid === "new";
      this.edit = lawid === "new";

      const currentLaw = (await law(lawid)).data;
      this.origin = this.isNew ? emptyBiz() : currentBiz;
      this.current = copy(this.origin);

      this.title = this.isNew ? "新增法律法规" : this.origin.name;
    }
  }
};
</script>

<style lang="sass" scoped>
</style>

