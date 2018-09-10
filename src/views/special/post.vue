<template>
  <div id="special_post">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/post">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item>任务分派</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">任务分派</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索计划内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="选择状态">
          <el-option label="未分派任务" :value="2"></el-option>
          <el-option label="已分派任务" :value="3"></el-option>
        </el-select>
      </el-col>

      <el-col :span="8">
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
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" min-width="160px" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="制定单位" sortable></el-table-column>
          <el-table-column label="执行期限">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="post" label="下发日期"></el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small">{{originTask(scope.row)?`已分派${originTask(scope.row)}任务`:'待分派'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button v-if="originTask(scope.row)" @click.native="$router.push('/special/monitor')" size="mini">查看已分派任务</el-button>
              <el-button @click.native="$router.push('post/'+scope.row.id)" size="mini" type="primary">分派任务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="planTable.page" :page-size="planTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "special_post",
  data() {
    return {
      search: {
        text: "",
        daterange: [],
        state: null
      },
      currentSearch: {
        text: "",
        daterange: [],
        state: null
      },
      planTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {},

  computed: {
    tableData() {
      let tableData = this.$store.state.plan.filter(
        t => t.kind == "special" && (t.state == 2 || t.state == 3)
      );

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.title.includes(searchText) ||
            t.department.includes(searchText) ||
            t.staff.includes(searchText)
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(t => t.state === this.currentSearch.state);
      }

      if (
        this.currentSearch.daterange &&
        (this.currentSearch.daterange[0] || this.currentSearch.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.post);
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
        (this.planTable.page - 1) * this.planTable.pageSize,
        this.planTable.page * this.planTable.pageSize
      );
    }
  },

  methods: {
    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        daterange: [],
        state: null
      };
      this.searchSubmit();
    },

    originTask(plan) {
      let taskItem = this.$store.state.task.find(
        t =>
          t.planid == plan.id &&
          t.department == this.$store.state.current.staff.departmentid
      );

      if (taskItem) {
        return taskItem.tasklist ? taskItem.tasklist.length : 0;
      }
      return 0;
    }
  }
};
</script>