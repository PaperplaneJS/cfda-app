<template>
  <el-row id="sms_singlesms">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms">消息列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="消息标题：">
            <el-input disabled v-model="currentSMS.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="下发机构：">
            <el-input disabled v-model="currentSMS.department"></el-input>
          </el-form-item>
        </el-col>

        <el-col :push="2" :span="6">
          <el-form-item label="下发人：">
            <el-input disabled v-model="currentSMS.staff"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="发布时间：">
            <el-date-picker disabled v-model="currentSMS.date" type="datetime">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="消息内容：">
            <el-input disabled :rows="10" v-model="currentSMS.content" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <router-link to="/sms">
          <el-button style="margin-left:100px;">返回消息列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { getSMSByID } from "@/api/old_sms.js";

export default {
  name: "sms_singlesms",

  data() {
    return {
      title: null,
      currentSMS: null
    };
  },

  beforeMount() {
    this.init();
  },

  methods: {
    init() {
      let smsid = this.$route.params.smsid;
      this.currentSMS = copy(getSMSByID(smsid));
      this.title = this.currentSMS.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
