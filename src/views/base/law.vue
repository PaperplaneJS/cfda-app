<template>
  <el-row id="base_law">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>法律法规管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">法律法规管理</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="4">
        <router-link to="law/new">
          <el-button type="primary" size="small" icon="el-icon-plus">新建 / 上传法律法规</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          v-model="search.text"
          size="small"
          clearable
          placeholder="搜索法律法规名/编号/单位等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="按状态筛选">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="num" label="法令法规编号" sortable></el-table-column>
          <el-table-column prop="name" label="法令法规名称" min-width="250px" sortable></el-table-column>
          <el-table-column prop="department" label="创建单位" sortable></el-table-column>
          <el-table-column prop="date" label="创建日期" align="center" sortable></el-table-column>
          <el-table-column label="状态" align="center" sortable>
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="getStateType(scope.row.state)"
              >{{scope.row.state | stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="110px">
            <template slot-scope="scope">
              <el-button @click="$router.push('law/'+scope.row.id)" size="mini" type="primary">进入查看</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        :current-page.sync="lawTable.page"
        :page-sizes="lawTable.pageSizes"
        :page-size="lawTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { getLaws } from "@/api/old_law.js";

export default {
  name: "base_law",
  data() {
    return {
      search: {
        text: "",
        state: null
      },
      lawTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    stateText(state) {
      return state === 1 ? "激活" : "停用";
    }
  },

  computed: {
    tableData() {
      let tableData = getLaws();

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.num.includes(searchText) ||
            t.department.includes(searchText)
        );
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state === this.search.state);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.lawTable.page - 1) * this.lawTable.pageSize,
        this.lawTable.page * this.lawTable.pageSize
      );
    }
  },

  methods: {
    getStateType(state) {
      switch (state) {
        case 1:
          return "success";
        default:
          return "danger";
      }
    }
  }
};
</script>
