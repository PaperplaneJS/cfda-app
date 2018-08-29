<template>
  <div id="grid_area">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/area">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格区域</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格区域</el-row>
    <el-row :gutter="15">
      <el-col :span="5" :lg="3">
        <router-link to="area/new">
          <el-button type="primary" icon="el-icon-plus">新建网格区域</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="搜索网格名称/代码等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select v-model="state" clearable placeholder="按状态筛选">
          <el-option label="激活" value="jihuo"></el-option>
          <el-option label="停用" value="tingyong"></el-option>
        </el-select>
      </el-col>

      <el-col :span="8" :lg="6">
        <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
        <el-button round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="areadata" size="medium" style="width: 100%" border>
          <el-table-column prop="num" label="主体代码" sortable></el-table-column>
          <el-table-column prop="name" label="网格化主体名称" sortable></el-table-column>
          <el-table-column label="状态" sortabl>
            <template slot-scope="scope">
              <el-tag :type="getType(scope.row.state)">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('area/'+scope.row.id)" size="mini" type="primary">查看</el-button>
              <el-button size="mini">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "grid_area",
  data() {
    return {
      areadata: [
        {
          id: 1,
          num: "01",
          name: "虞山区食药监局分管区",
          state: "正常"
        }
      ],
      state: null
    };
  },

  methods: {
    getType(text) {
      switch (text) {
        case "正常":
          return "success";
        default:
          return "danger";
      }
    }
  }
};
</script>
