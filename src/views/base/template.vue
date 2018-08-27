<template>
  <div id="base_template">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>模板管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-row class="title">检查项目模板管理</el-row>
          <el-row :gutter="15">
            <el-col :span="5" :lg="3">
              <router-link to="/base/template/new">
                <el-button type="primary" icon="el-icon-plus">新建模板</el-button>
              </router-link>
            </el-col>
            <el-col :span="6">
              <el-input clearable placeholder="搜索模板名/创建人等" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="3">
              <el-select v-model="state" clearable placeholder="选择状态">
                <el-option label="激活" value="jihuo"></el-option>
                <el-option label="停用" value="tingyong"></el-option>
                <el-option label="注销" value="zhuxiao"></el-option>
              </el-select>
            </el-col>

            <el-col :span="8" :lg="6">
              <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
              <el-button round>重置</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-table :data="templatedata" size="medium" stripe style="width: 100%" border>
                <el-table-column prop="name" label="模板名称" sortable></el-table-column>
                <el-table-column prop="department" label="类型" sortable></el-table-column>
                <el-table-column prop="date" label="创建日期" sortable></el-table-column>
                <el-table-column prop="state" label="状态"></el-table-column>
                <el-table-column prop="action" label="操作" min-width="220">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary">查看</el-button>
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">注销</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "base_template",
  data() {
    return {
      state:null,
      templatedata: [
        {
          name: "食品生产日常监督检查要点表",
          department: "常熟市食药监局",
          date: "2017-12-31",
          state: "激活"
        }
      ]
    };
  }
};
</script>