<template>
  <div id="grid_singlearea">
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
            <el-input v-model="currentArea.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:" required>
            <el-radio v-model="currentArea.state" :label="1">正常</el-radio>
            <el-radio v-model="currentArea.state" :label="2">停用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="地区代码:" required>
            <el-input v-model="currentArea.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="所属层级:" required>
            <el-cascader :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="currentArea.lv" :options="$store.state.demoData.gridArea" placeholder="选择层级" change-on-select></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">提交</el-button>
        <router-link to="/grid/area">
          <el-button style="margin-left:20px;">返回网格区域</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "grid_singlearea",
  data() {
    return {
      title: null,
      currentArea: null
    };
  },

  beforeMount() {
    let areaid = this.$route.params.gridareaid;

    if (areaid === "new") {
      this.currentArea = {
        name: "",
        code: "",
        state: null,
        lv: null
      };
      this.title = "新建网格区域";
    } else {
      this.currentArea = this.$store.state.demoData.copy(this.$store.state.demoData.findArea(areaid));
      let areaArray = this.$store.state.demoData.findAreaIDArray(areaid);
      areaArray.pop();
      this.$set(this.currentArea, "lv", areaArray);
      this.title = this.currentArea.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
