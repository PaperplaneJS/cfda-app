<template>
  <div id="base_biz">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">企业管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">企业单位管理</el-row>
    <el-row :gutter="15">
      <el-col :span="5" :lg="3">
        <router-link to="biz/new">
          <el-button type="primary" icon="el-icon-plus">添加单位</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="搜索单位名/联系方式/许可证号等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select v-model="kind" clearable placeholder="选择类别">
          <el-option label="食品销售" value="xiaoshou"></el-option>
          <el-option label="食品生产" value="shengchan"></el-option>
          <el-option label="食品服务" value="fuwu"></el-option>
          <el-option label="保健品生产" value="baojianpin"></el-option>
          <el-option label="小作坊" value="xiaozuofang"></el-option>
        </el-select>
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
        <el-table :data="table" size="medium" style="width: 100%" border>
          <el-table-column prop="name" label="企业名称" sortable></el-table-column>
          <el-table-column prop="type" label="类型" sortable></el-table-column>
          <el-table-column prop="legal" label="法人" sortable></el-table-column>
          <el-table-column prop="grid" label="网格区域" sortable></el-table-column>
          <el-table-column prop="contant" label="联系人" sortable></el-table-column>
          <el-table-column prop="tel" label="联系电话"></el-table-column>
          <el-table-column prop="code" label="许可证编号"></el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag :type="getType(scope.row.state)">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" min-width="130px">
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
  name: "base_biz",
  data() {
    return {
      kind: null,
      state: null,
      table: [
        {
          name: "常吉面馆环城北路店",
          type: "食品生产",
          legal: "王小明",
          grid: "虞山分局",
          contant: "张强",
          tel: "13755724009",
          code: "CS-012-12087450",
          state: "正常"
        }
      ]
    };
  },
  methods: {
    getType(text) {
      switch (text) {
        case "正常":
          return "success";
        case "注销":
          return "info";
        case "整改中":
          return "danger";
        default:
          return "warning";
      }
    }
  }
};
</script>
