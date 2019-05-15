<template>
  <el-row id="grid_singlearea">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/department">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/department">行政机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位名称:" required>
            <el-input :disabled="!edit" v-model="current.name" placeholder="请输入该单位名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:" required>
            <el-radio-group :disabled="!edit" v-model="current.state">
              <el-radio :label="1">激活</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="机构代码:" required>
            <el-input :disabled="!edit" placeholder="请输入行政机构代码" v-model="current.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="所属层级:" required>
            <el-cascader
              :disabled="!edit"
              :show-all-levels="false"
              :props="{label:'name',value:'_id'}"
              v-model="current._rel"
              :options="cascadeDepData"
              placeholder="选择单位属于的层级"
              change-on-select
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button
          v-if="edit"
          @click="editOK"
          icon="el-icon-check"
          type="primary"
        >{{isNew?"完成创建":"完成编辑"}}</el-button>
        <el-button v-if="!edit" @click="edit=true" icon="el-icon-edit-outline" type="primary">编辑行政机构</el-button>
        <el-button v-if="!isNew && edit" @click="editCancel" icon="el-icon-refresh">取消并还原</el-button>
        <router-link to="/grid/department">
          <el-button style="margin-left:20px;">返回行政机构管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { dep, emptyDep } from "@/api/dep.js";

export default {
  name: "grid_singlearea",

  data() {
    return {
      title: "",

      isNew: false,
      edit: false,

      cascadeDepData: [],

      current: emptyDep(),
      origin: emptyDep(),

      emptyDep
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
      let depId = this.$route.params.depid;
      this.isNew = depId === "new";
      this.edit = depId === "new";

      this.cascadeDepData = (await dep(null, "cascade=1")).data;
      if (!this.isNew) {
        this.origin = (await dep(depId)).data;
        this.origin._rel.pop();
      } else {
        this.origin._rel.push(this.cascadeDepData[0]._id);
      }

      this.title = this.isNew ? "新建行政区域" : this.origin.name;
      this.current = copy(this.origin);
    },

    async editOK() {
      this.origin = (await dep(this.current)).data;

      if (this.isNew) {
        this.$router.push(`/grid/department/${this.origin._id}`);
      } else {
        this.init();
      }
    },

    editCancel() {
      this.current = copy(this.origin);
      this.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
