<template>
  <div id="special_reportlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">检查报告</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">{{plantitle}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}} (任务)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input v-model="search.text" size="small" clearable placeholder="搜索单位名称/结果等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-select size="small" v-model="search.kind" clearable placeholder="筛选结果类别">
        <el-option value="符合">符合</el-option>
        <el-option value="基本符合">基本符合</el-option>
        <el-option value="不符合">不符合</el-option>
      </el-select>

      <el-col :span="10">
        <el-date-picker v-model="search.daterange" size="small" clearable type="daterange" range-separator="至" start-placeholder="检查日期" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;margin-bottom:20px;">
          <el-table-column prop="bizname" label="单位名称" min-width="180px" sortable></el-table-column>
          <el-table-column label="执法人员" sortable>
            <template slot-scope="scope">
              <div>主检查人：
                <el-tag size="mini">{{scope.row.staffinfo[0]}}</el-tag>
              </div>
              <div>协同检查：
                <el-tag size="mini">{{scope.row.staffinfo[1]}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column label="检查结果">
            <template slot-scope="scope">
              <el-tag size="small" :type="getResultType(scope.row.result)">{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="处理方式">
            <template slot-scope="scope">
              <el-tag size="small" :type="getResultType(scope.row.handle)">{{scope.row.handle}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="right" prop="action" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push($route.path+'/'+scope.row.id)" size="mini" type="primary">查看报告</el-button>
              <el-button size="mini" type="primary">打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="taskDetailTable.page" :page-size="taskDetailTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "special_reportlist",
  data() {
    return {
      title: null,
      plantitle: null,
      currentTask: null,

      search: {
        text: "",
        daterange: [],
        kind: ""
      },
      currentSearch: {
        text: "",
        daterange: [],
        kind: ""
      },
      taskDetailTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    tableData() {
      let tableData = copy(this.currentTask.detail);
      tableData.forEach(t => {
        t.bizname = this.$store.state.biz.find(biz => biz.id == t.bizid).name;
        t.staffinfo = [
          this.$store.state.gridmember.find(staff => staff.id == t.staff[0].id)
            .name,
          this.$store.state.gridmember.find(staff => staff.id == t.staff[1].id)
            .name
        ];
      });

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.bizname.includes(searchText) ||
            t.staffinfo[0].includes(searchText) ||
            t.staffinfo[1].includes(searchText) ||
            t.handle.includes(searchText) ||
            t.result.includes(searchText)
        );
      }

      if (this.currentSearch.kind && this.currentSearch.kind != "") {
        tableData = tableData.filter(t => t.result === this.currentSearch.kind);
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
        (this.taskDetailTable.page - 1) * this.taskDetailTable.pageSize,
        this.taskDetailTable.page * this.taskDetailTable.pageSize
      );
    }
  },

  methods: {
    init() {
      let taskid = this.$route.params.taskid;

      this.$store.state.task.forEach(t => {
        let taskItem = t.tasklist.find(ti => ti.id == taskid);
        if (taskItem) {
          this.currentTask = copy(taskItem);
          this.plantitle = this.$store.state.plan.find(
            p => p.id == t.planid
          ).title;
          return false;
        }
      });
      this.title = this.currentTask.title;
    },

    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        daterange: [],
        kind: ""
      };
      this.searchSubmit();
    },

    getResultType(text) {
      switch (text) {
        case "符合":
        case "通过":
          return "success";

        case "基本符合":
        case "通知整改":
          return "warning";

        case "不符合":
        case "停业整顿":
          return "danger";
      }
    }
  }
};
</script>