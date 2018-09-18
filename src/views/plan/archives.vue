<template>
  <el-row id="plan_recive">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/recive">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>计划归档</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">计划归档</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input clearable size="small" v-model="search.text" placeholder="搜索计划内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="4">
        <el-select size="small" clearable v-model="search.kind" placeholder="按类别筛选">
          <el-option label="日常检查" value="daily"></el-option>
          <el-option label="专项检查" value="special"></el-option>
          <el-option label="量化评级" value="risk"></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-date-picker size="small" clearable v-model="search.daterange" type="daterange" range-separator="至" start-placeholder="制定日期范围" end-placeholder="截止">
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
          <el-table-column prop="title" label="标题" sortable min-width="180px"></el-table-column>
          <el-table-column label="类别" sortable>
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.kind | planKindText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="stf" label="制定人" sortable></el-table-column>
          <el-table-column prop="dep" label="制定单位" sortable></el-table-column>
          <el-table-column prop="date" align="center" label="制定日期"></el-table-column>
          <el-table-column prop="complete" align="center" label="完成日期"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag size="small" type="success">已归档</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看记录</el-button>
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
import department from "@/api/old_area.js";
import { getArchives } from "@/api/old_plan.js";
import { getStaffByID } from "@/api/old_staff.js";

export default {
  name: "plan_recive",

  data() {
    return {
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
      planTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    planKindText(kind) {
      switch (kind) {
        case "daily":
          return "日常检查";
        case "special":
          return "专项检查";
        case "risk":
          return "全量检查";
        default:
          return kind;
      }
    }
  },

  computed: {
    tableData() {
      let tableData = getArchives();

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
            t.department.includes(searchText) ||
            t.staff.includes(searchText)
        );
      }

      if (this.currentSearch.kind && this.currentSearch.kind != "") {
        tableData = tableData.filter(t => t.kind === this.currentSearch.kind);
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
        kind: ""
      };
      this.searchSubmit();
    }
  }
};
</script>

