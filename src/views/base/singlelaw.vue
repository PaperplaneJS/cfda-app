<template>
  <el-row id="base_singlelaw">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">法律法规管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="title">{{title}}</el-row>

    <el-form label-width="100px" :disabled="!edit" label-position="left" :model="current">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="name" label="法规标题：" required>
            <el-input size="small" v-model="current.name" placeholder="法律法规标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="法规编号：">
            <el-input size="small" v-model="current.num" placeholder="法律法规编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="state" label="法规状态：" required>
            <el-radio-group v-model="current.state">
              <el-radio :label="1">激活</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="创建单位：">
            <el-input disabled size="small" v-model="current._dep" placeholder="该法规创建机构"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建人：">
            <el-input disabled size="small" v-model="current._staff" placeholder="该法规创建人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="发布日期：">
            <el-date-picker
              disabled
              size="small"
              style="width:100%"
              type="date"
              placeholder="发布于"
              v-model="current.date"
              value-format="yyyy-M-d"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="12">
          <el-input
            :autosize="{ minRows: 25}"
            type="textarea"
            :rows="20"
            placeholder="请输入法律法规内容"
            v-model="current.content"
          ></el-input>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button @click="edit=true" v-if="!edit" icon="el-icon-edit" type="primary">编辑</el-button>
        <el-button
          @click="editOK"
          v-if="edit"
          icon="el-icon-check"
          type="primary"
        >{{isNew?"提交编辑":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/base/law">
          <el-button style="margin-left:20px;">返回法律法规管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy, date } from "@/utils/utils.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";
import { law, emptyLaw } from "@/api/law.js";

export default {
  name: "base_singlelaw",

  data() {
    return {
      title: "",
      isNew: false,
      edit: false,

      current: emptyLaw(),
      origin: emptyLaw()
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
      const lawid = this.$route.params.lawid;
      this.isNew = lawid === "new";
      this.edit = lawid === "new";

      const currentLaw = this.isNew ? emptyLaw() : (await law(lawid)).data;
      currentLaw.date = this.isNew ? date() : currentLaw.date;
      currentLaw._dep = (await dep(
        this.isNew ? this.$store.state.currentUser.dep : currentLaw.dep
      )).data.name;

      currentLaw._staff = (await staff(
        this.isNew ? this.$store.state.currentUser._id : currentLaw.staff
      )).data.name;

      this.origin = currentLaw;
      this.current = copy(this.origin);
      this.title = this.isNew ? "新增法律法规" : this.origin.name;
    },

    async editOK() {
      this.origin = (await law(this.result)).data;

      if (this.isNew) {
        this.$router.push(`/base/law/${this.origin._id}`);
      } else {
        this.init();
      }
    },

    editCancel() {
      this.current = copy(this.origin);
      this.title = this.origin.name;
      this.edit = false;
    }
  },

  computed: {
    result() {
      let currentLaw = copy(this.current);
      if (this.isNew) {
        currentLaw.dep = this.$store.state.currentUser.dep;
        currentLaw.staff = this.$store.state.currentUser._id;
      }
      delete currentLaw["_dep"];
      delete currentLaw["_staff"];

      return currentLaw;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
.content {
  margin-bottom: 20px;
}
</style>

