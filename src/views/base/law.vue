<template>
  <div id="base_law">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>法律法规管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">法律法规管理</el-row>
    <el-row :gutter="15">
      <el-col :span="5" :lg="3">
        <router-link to="law/new">
          <el-button type="primary" icon="el-icon-plus">新建法律法规</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="搜索法律法规名/编号/单位等" prefix-icon="el-icon-search"></el-input>
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
        <el-table :data="lawdata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="num" label="法令法规编号" sortable></el-table-column>
          <el-table-column prop="name" label="法令法规名称" sortable></el-table-column>
          <el-table-column prop="master" label="编制主体" sortable></el-table-column>
          <el-table-column prop="date" label="创建日期" sortable min-width="160"></el-table-column>
          <el-table-column prop="state" label="状态" sortable min-width="80"></el-table-column>
          <el-table-column prop="action" label="操作" min-width="220">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看</el-button>
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
  name: "base_law",
  data() {
    return {
      state: null,
      lawdata: [
        {
          num: "常市监检字[2017]号",
          name: "关于印发常熟市市场监督管理局行政执法文书格式文本的通知",
          master: "常熟市食药监局",
          date: "2017-05-24 13:15",
          state: "激活"
        }
      ]
    };
  }
};
</script>
