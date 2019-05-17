<template>
  <el-row id="special_plan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查进度（计划）</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">检查进度（所有进行中的计划）</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          v-model="search.text"
          clearable
          size="small"
          placeholder="搜索检查计划标题/类型/制定人等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker
          v-model="search.daterange"
          clearable
          size="small"
          type="daterange"
          range-separator="至"
          start-placeholder="制定日期范围"
          end-placeholder="截止日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" v-loading="loading" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" min-width="160px" sortable></el-table-column>
          <el-table-column prop="$staff.name" label="制定人" sortable></el-table-column>
          <el-table-column prop="$dep.name" label="制定单位" sortable></el-table-column>
          <el-table-column prop="$recive.date" label="接收日期" sortable align="center"></el-table-column>
          <el-table-column label="执行期限" align="center">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag
                size="small"
              >{{scope.row.$task.length>0?`已分派${scope.row.$task.length}项任务`:'待分派'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button
                @click.native="$router.push(`/special/${scope.row._id}`)"
                size="mini"
                type="primary"
              >查看任务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        @size-change="t=>planTable.pageSize=t"
        :current-page.sync="planTable.page"
        :page-sizes="planTable.pageSizes"
        :page-size="planTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { plan } from "@/api/plan.js";
import { list } from "@/api/task.js";
import { staff } from "@/api/staff.js";
import { dep } from "@/api/dep.js";
import { Promise } from "q";

export default {
  name: "special_plan",

  data() {
    return {
      loading: true,

      depData: [],
      staffData: [],
      planData: [],

      search: {
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

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      this.loading = true;

      const currentDepId = this.$store.state.currentUser.dep;
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      let planList = (await plan(
        null,
        "kind=special",
        `posttask=${currentDepId}`
      )).data;
      planList.forEach(plan => {
        plan.$recive = plan.recive.find(t => t.dep === currentDepId);
        plan.$staff = this.staffData.find(t => t._id === plan.staff);
        plan.$dep = this.depData.find(t => t._id === plan.dep);
      });
      await Promise.all(
        planList.map(async plan => {
          plan.$task = (await list(plan._id)).data;
        })
      );
      this.planData = planList;

      this.loading = false;
    }
  },

  computed: {
    tableData() {
      let tableData = this.planData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.title.includes(searchText) ||
            t.dep.includes(searchText) ||
            t.stf.includes(searchText)
        );
      }

      if (
        this.search.daterange &&
        (this.search.daterange[0] || this.search.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.task.recive);
          return (
            dt.getTime() >= this.search.daterange[0].getTime() &&
            dt.getTime() <= this.search.daterange[1].getTime()
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
  }
};
</script>

<style lang="scss" scoped>
.progresstip {
  margin: 5px 0;
}
</style>
