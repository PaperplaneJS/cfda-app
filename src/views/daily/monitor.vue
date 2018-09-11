<template>
  <el-row id="daily_monitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查监督</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">日常检查监督</el-row>

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
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="task.recive" label="接受时间" sortable></el-table-column>
          <el-table-column label="执行期限" width="140px">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="任务" width="80px" sortable>
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.task.tasklist.length}}</el-tag>
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
          <el-table-column align="right" label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button size="mini" type="primary">
                  查看记录
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item of scope.row.task.tasklist" :key="item.id" @click.native="$router.push('monitor/'+item.id)">
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
      <el-pagination :current-page.sync="planTable.page" :page-size="planTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "daily_monitor",
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
        pageSize: 10
      }
    };
  },

  computed: {
    tableData() {
      let tableData = [];
      this.$store.state.task.forEach(t => {
        if (
          t.department == this.$store.state.current.staff.departmentid &&
          t.tasklist.length > 0
        ) {
          let taskItem = copy(t);
          let planItem = copy(
            this.$store.state.plan.find(plan => plan.id == t.planid)
          );
          if (planItem.kind === "daily") {
            planItem.task = taskItem;
            tableData.push(planItem);
          }
        }
      });

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
