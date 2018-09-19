<template>
  <el-row id="daily_report">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/report">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查报告</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">日常检查报告</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input v-model="search.text" clearable size="small" placeholder="搜索检查计划标题/类型等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker v-model="search.daterange" clearable size="small" type="daterange" range-separator="至" start-placeholder="制定日期范围" end-placeholder="截止日期">
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
          <el-table-column prop="title" label="计划标题" min-width="140px" sortable></el-table-column>
          <el-table-column prop="stf" label="制定人" sortable></el-table-column>
          <el-table-column prop="dep" label="制定单位" sortable></el-table-column>
          <el-table-column prop="task.recive" label="接收日期" align="center" sortable></el-table-column>
          <el-table-column label="执行期限" align="center" width="140px">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态与进度">
            <template slot-scope="scope">
              <div>检查企业：
                <el-tag size="mini">{{progress(scope.row.task.tasklist)[0]}} / {{progress(scope.row.task.tasklist)[1]}}</el-tag>
              </div>
              <div style="margin-top:1px;">任务完成：
                <el-tag size="mini">
                  {{taskProgress(scope.row.task)[0]}} / {{taskProgress(scope.row.task)[1]}}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button size="mini" type="primary">
                  选择任务
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item of scope.row.task.tasklist" :key="item.id" @click.native="$router.push('report/'+item.id)">
                    {{item.title}} [{{item.progress[0]}}/{{item.progress[1]}}]
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background @size-change="t=>planTable.pageSize=t" :current-page.sync="planTable.page" :page-sizes="planTable.pageSizes" :page-size="planTable.pageSize" layout="total, prev, pager, next, sizes" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { getTaskItems } from "@/api/old_task.js";
import { getPlanByID } from "@/api/old_plan.js";
import { getAreaIDArray } from "@/api/old_area.js";
import { getStaffByID } from "@/api/old_staff.js";
import department from "@/api/old_area.js";

export default {
  name: "daily_report",

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
      planTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  computed: {
    tableData() {
      let tableData = [];

      getTaskItems().forEach(t => {
        if (
          getAreaIDArray(t.department).includes(
            this.$store.state.currentUser.area
          ) &&
          t.tasklist.length > 0
        ) {
          let taskItem = copy(t);
          let planItem = copy(getPlanByID(t.planid));
          if (planItem.kind == "daily") {
            planItem.task = taskItem;
            tableData.push(planItem);
          }
        }
      });

      tableData.forEach(t => {
        t.dep = department.getAreaByID(t.department).name;
        t.stf = getStaffByID(t.staff).name;
      });

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.title.includes(searchText) ||
            t.dep.includes(searchText) ||
            t.stf.includes(searchText)
        );
      }

      if (
        this.currentSearch.daterange &&
        (this.currentSearch.daterange[0] || this.currentSearch.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.task.recive);
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
        daterange: []
      };
      this.searchSubmit();
    },

    progress(taskList) {
      let sum = [0, 0];
      taskList.forEach(t => {
        sum[0] += t.progress[0];
        sum[1] += t.progress[1];
      });

      return sum;
    },

    taskProgress(taskItem) {
      let sum = 0;
      taskItem.tasklist.forEach(
        t => (sum += t.progress[0] >= t.progress[1] ? 1 : 0)
      );

      return [sum, taskItem.tasklist.length];
    }
  }
};
</script>

<style lang="scss" scoped>
.progresstip {
  margin: 5px 0;
}
</style>
