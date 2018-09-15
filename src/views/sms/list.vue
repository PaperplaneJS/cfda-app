<template>
  <el-row id="sms_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息列表</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="2">
        <router-link to="sms/post">
          <el-button style="width:100%;" size="small" type="primary" icon="el-icon-edit-outline">发布消息</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <el-checkbox style="width:100%;" size="small" v-model="search.onlyunread" label="只显示未读消息" border></el-checkbox>
      </el-col>

      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索消息内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker size="small" v-model="search.daterange" type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :row-class-name="tableRowClassName" :data="pageData" size="medium" style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
          <el-table-column label="标题" sortable min-width="250px">
            <template slot-scope="scope">
              <el-tag size="small" style="margin-right:10px;" :type="getType(scope.row.read)">{{scope.row.read?"已读":"未读"}}</el-tag>{{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column prop="staff" label="发布人" sortable></el-table-column>
          <el-table-column prop="department" label="发布单位" sortable></el-table-column>
          <el-table-column prop="date" label="发布日期" align="center" sortable></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="$router.push('sms/'+scope.row.id)" size="mini" type="primary">查看消息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination @size-change="t=>smsTable.pageSize=t" background :current-page.sync="smsTable.page" :page-sizes="smsTable.pageSizes" :page-size="smsTable.pageSize" layout="total, prev, pager, next, sizes" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "sms_list",
  
  data() {
    return {
      search: {
        text: "",
        daterange: [],
        onlyunread: true
      },
      currentSearch: {
        text: "",
        daterange: [],
        onlyunread: true
      },
      smsTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.sms;

      if (this.search.onlyunread) {
        tableData = tableData.filter(t => !t.read);
      }

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
        tableData = tableData.filter(t => {
          let dt = new Date(t.date);
          return (
            dt.getTime() >= this.currentSearch.daterange[0].getTime() &&
            dt.getTime() <= this.currentSearch.daterange[1].getTime()
          );
        });
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

