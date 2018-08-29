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
          <el-form-item label="网格名称:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="状态:">
            <el-radio label="1">激活</el-radio>
            <el-radio label="2">注销</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="网格代码:">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="所属层级:">
            <el-cascader :options="griddata" placeholder="选择层级" change-on-select></el-cascader>
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
      currentMmeber: null,
      griddata: [
        {
          value: "常熟市",
          label: "常熟市",
          children: [
            {
              value: "虞山镇",
              label: "虞山镇",
              children: [
                {
                  value: "食药监分局",
                  label: "食药监分局"
                }
              ]
            },
            {
              value: "梅里镇",
              label: "梅里镇",
              children: [
                {
                  value: "食药监大队",
                  label: "食药监大队"
                }
              ]
            }
          ]
        }
      ]
    };
  },

  beforeMount() {
    let gmid = this.$route.params.gridareaid;

    if (gmid === "new") {
      this.title = "新建网格区域";
    } else {
      this.currentMmeber = {
        id: "1",
        name: "虞山区食药监局分管区"
      };

      this.title = this.currentMmeber.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
