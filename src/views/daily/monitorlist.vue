<template>
  <el-row id="daily_monitorlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">{{plantitle}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}} (任务)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">{{title}}</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <el-checkbox size="small" v-model="currentSearch.onlychecked" label="只显示已检查的" border></el-checkbox>
      </el-col>

      <el-col :span="6">
        <el-input v-model="search.text" size="small" clearable placeholder="搜索单位名称/结果等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-select size="small" v-model="search.kind" clearable placeholder="按检查结果筛选">
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
        <el-table :data="pageData" :row-class-name="tableRowClassName" size="medium" style="width: 100%;margin-bottom:20px;">
          <el-table-column label="单位名称" min-width="180px" sortable>
            <template slot-scope="scope">
              {{scope.row.bizname}}
              <el-tag v-if="!scope.row.result" type="warning" size="mini">尚未检查</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="执法人员" sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.staffinfo">主检查人：
                <el-tag size="mini">{{scope.row.staffinfo[0]}}</el-tag>
              </div>
              <div v-if="scope.row.staffinfo">协同检查：
                <el-tag size="mini">{{scope.row.staffinfo[1]}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="检查日期" align="center" sortable></el-table-column>
          <el-table-column align="center" label="检查结果">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result" size="small" :type="getResultType(scope.row.result)">{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="处理方式">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.handle" size="small" :type="getResultType(scope.row.handle)">{{scope.row.handle}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.notchecked" @click.native="$router.push($route.path+'/'+scope.row.id)" size="mini" type="primary">查看记录</el-button>
              <el-button v-if="!scope.row.notchecked" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background @size-change="t=>taskDetailTable.pageSize=t" :current-page.sync="taskDetailTable.page" :page-sizes="taskDetailTable.pageSizes" :page-size="taskDetailTable.pageSize" layout="total, prev, pager, next, sizes" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { copy, uuid } from "@/utils/utils.js";
import { getAllBizs } from "@/api/old_biz.js";
import { getAreaIDArray } from "@/api/old_area.js";
import { getTaskItems } from "@/api/old_task.js";
import { getStaffByID } from "@/api/old_staff.js";
import { getPlanByID } from "@/api/old_plan.js";

export default {
  name: "daily_monitorlist",

  data() {
    return {
      bizData: [],
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
        kind: "",
        onlychecked: true
      },
      taskDetailTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    tableData() {
      if (!this.currentTask || !this.currentTask.detail) {
        return [];
      }

      let tableData = copy(this.currentTask.detail);

      tableData.forEach(t => {
        t.bizname = this.bizData.find(biz => biz.com_id == t.bizid).com_name;
        t.staffinfo = [
          getStaffByID(t.staff[0].id).name,
          getStaffByID(t.staff[1].id).name
        ];
      });

      if (!this.currentSearch.onlychecked) {
        this.currentTask.checklist.forEach(t => {
          tableData.push({
            id: uuid(6, 16),
            bizname: this.bizData.find(biz => biz.com_id == t).com_name,
            notchecked: true
          });
        });
      }

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
      this.bizData = getAllBizs();
      let taskid = this.$route.params.taskid;

      getTaskItems().forEach(t => {
        let taskItem = t.tasklist.find(ti => ti.id == taskid);
        if (taskItem) {
          this.currentTask = copy(taskItem);
          this.plantitle = getPlanByID(t.planid).title;
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

    tableRowClassName({ row }) {
      if (row.notchecked) {
        return "notchecked";
      }
      return "";
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

<style lang="scss">
#daily_monitorlist {
  .notchecked {
    background: #f0f9eb !important;
  }
}
</style>
