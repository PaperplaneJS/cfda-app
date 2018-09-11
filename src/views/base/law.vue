<template>
  <el-row id="base_law">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>法律法规管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">法律法规管理</el-row>
    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <router-link to="law/new">
          <el-button type="primary" size="small" icon="el-icon-plus">新建法律法规</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input v-model="search.text" size="small" clearable placeholder="搜索法律法规名/编号/单位等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="按状态筛选">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="num" label="法令法规编号" sortable></el-table-column>
          <el-table-column prop="name" label="法令法规名称" min-width="250px" sortable></el-table-column>
          <el-table-column prop="department" label="编发主体" sortable></el-table-column>
          <el-table-column prop="date" label="创建日期" sortable></el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getStateType(scope.row.state)">{{scope.row.state | stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button @click="$router.push('law/'+scope.row.id)" size="mini" type="primary">进入查看</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="lawTable.page" :page-size="lawTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "base_law",
  data() {
    return {
      search: {
        text: "",
        state: null
      },
      currentSearch: {
        text: "",
        state: null
      },
      lawTable: {
        page: 1,
        pageSize: 10
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
      let tableData = this.$store.state.law;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.num.includes(searchText) ||
            t.department.includes(searchText)
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(t => t.state === this.currentSearch.state);
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
    },

    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        state: ""
      };
      this.searchSubmit();
    }
  }
};
</script>
