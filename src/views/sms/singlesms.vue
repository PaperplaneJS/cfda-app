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
            <el-input readonly v-model="current.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="下发单位：">
            <el-input readonly v-model="current._dep.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :push="2" :span="6">
          <el-form-item label="下发人：">
            <el-input readonly v-model="current._staff.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="发布时间：">
            <el-date-picker readonly v-model="current.date" type="datetime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="消息内容：">
            <el-input readonly :rows="10" v-model="current.content" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="已接收职员：">
            <el-tag
              style="margin:5px;"
              size="small"
              v-for="s in current.recive"
              :key="s.staff"
            >{{getStaffInfo(s.staff).name}} | {{s.date}}</el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="未接收职员：">
            <el-tag
              style="margin:5px;"
              type="warning"
              size="small"
              v-for="staffId in norecive"
              :key="staffId"
            >{{getStaffInfo(staffId).name}}</el-tag>
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
import { sms } from "@/api/sms.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";

export default {
  name: "sms_singlesms",

  data() {
    return {
      title: null,

      staffData: [],

      current: {
        _staff: {},
        _dep: {}
      }
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
      const smsid = this.$route.params.smsid;

      this.staffData = (await staff()).data;

      let currentSms = (await sms(smsid)).data;
      currentSms._dep = (await dep(currentSms.dep)).data;
      currentSms._staff = (await staff(currentSms.staff)).data;
      this.current = currentSms;

      this.title = this.current.title;
    },

    getStaffInfo(staffId) {
      return this.staffData.find(t => t._id === staffId);
    }
  },

  computed: {
    norecive() {
      if (!this.current.recive) {
        return [];
      }
      let reciveStaffIds = this.current.recive.map(t => t.staff);
      return this.current.post.filter(t => !reciveStaffIds.includes(t));
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
