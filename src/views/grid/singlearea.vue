<template>
  <el-row id="grid_singlearea">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/area">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/area">网格区域管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="90px">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="网格名称:" required>
            <el-input :disabled="!edit" v-model="currentArea.name" placeholder="请输入该网格级别名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:" required>
            <el-radio-group :disabled="!edit" v-model="currentArea.state">
              <el-radio :label="1">激活</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="地区代码:" required>
            <el-input :disabled="!edit" placeholder="请输入网格级别代码" v-model="currentArea.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="所属层级:" required>
            <el-cascader :disabled="!edit" :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="currentArea.lv" :options="$store.state.gridarea.gridarea" placeholder="选择网格所属层级" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button v-if="edit" @click="editOK" icon="el-icon-check" type="primary">{{isNew?"完成创建":"完成编辑"}}</el-button>
        <el-button v-if="!edit" @click="edit=true" icon="el-icon-edit-outline" type="primary">编辑网格区域</el-button>
        <el-button v-if="!isNew && edit" @click="editCancel" icon="el-icon-refresh">取消并还原</el-button>
        <router-link to="/grid/area">
          <el-button style="margin-left:20px;">返回网格区域</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "grid_singlearea",
  data() {
    return {
      title: null,
      isNew: null,
      edit: null,

      currentArea: null,
      originArea: null
    };
  },

  beforeMount() {
    this.init();
  },

  methods: {
    init() {
      let areaid = this.$route.params.gridareaid;

      if (areaid === "new") {
        this.currentArea = {
          name: "",
          code: "",
          state: null,
          lv: null
        };
        this.isNew = true;
        this.edit = true;
        this.title = "新建网格区域";
      } else {
        let area = copy(this.$store.state.gridarea.findArea(areaid));
        area.lv = copy(this.$store.state.gridarea.findAreaIDArray(areaid));
        area.lv.pop();

        this.currentArea = area;
        this.originArea = copy(this.currentArea);

        this.isNew = false;
        this.edit = false;
        this.title = this.currentArea.name;
      }
    },

    editOK() {},

    editCancel() {
      this.currentArea = copy(this.originArea);
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
