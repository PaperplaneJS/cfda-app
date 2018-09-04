<template>
  <div id="sms_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms/list">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息列表</el-row>
    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索消息内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker size="small" value-format="yyyy-MM-dd hh:mm" v-model="search.daterange" type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :row-class-name="tableRowClassName" :data="pageData" size="medium" style="width: 100%">
          <el-table-column type="index" label="序号" width="60px"></el-table-column>
          <el-table-column label="标题" sortable min-width="250px">
            <template slot-scope="scope">
              <el-tag size="small" style="margin-right:10px;" :type="getType(scope.row.read)">{{scope.row.read?"已读":"未读"}}</el-tag>{{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column prop="department" label="来源" sortable></el-table-column>
          <el-table-column prop="date" label="时间" sortable></el-table-column>
          <el-table-column align="right" prop="date" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="smsTable.page" :page-size="smsTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sms_list",
  data() {
    return {
      search: {
        text: "",
        daterange: []
      },
      currentSearch: {
        text: "",
        daterange: []
      },
      smsTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.sms;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t => t.title.includes(searchText) || t.department.includes(searchText)
        );
      }

      if (
        this.currentSearch.daterange &&
        (this.currentSearch.daterange[0] || this.currentSearch.daterange[1])
      ) {
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.smsTable.page - 1) * this.smsTable.pageSize,
        this.smsTable.page * this.smsTable.pageSize
      );
    }
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (!row.read) {
        return "noread";
      }
      return "";
    },

    getType(isread) {
      switch (isread) {
        case true:
          return "info";
        case false:
          return "warning";
      }
    },

    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        daterange: []
      };
      this.searchSubmit();
    }
  }
};
</script>

<style lang="scss">
#sms_list {
  .noread {
    background: #f0f9eb !important;
  }
}
</style>

