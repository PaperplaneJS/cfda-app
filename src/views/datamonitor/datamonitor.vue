<template>
  <el-row id="datamonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/datamonitor">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据监控</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">数据平台监控</el-row>

    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="type" size="medium">
          <el-radio-button label="net">互联网数据抓取监控</el-radio-button>
          <el-radio-button label="out">外部系统接口监控</el-radio-button>
        </el-radio-group>

        <el-button size="medium" style="margin-left:10px;" type="primary" @click="toAPI">数据接口平台</el-button>
      </el-col>
    </el-row>

    <img v-if="type==='net'" style="width: 100%;" src="@/assets/img/dmnet.png" alt="">
    <img v-if="type==='out'" style="width: 100%;" src="@/assets/img/dmout.png" alt="">
  </el-row>
</template>

<script>
export default {
  name: "datamonitor",

  data() {
    return {
      type: "net"
    };
  },

  methods: {
    toAPI() {
      window.open("https://scjgapi.iething.com/doc/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
