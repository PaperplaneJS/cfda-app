<template>
  <el-row id="daily_task">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/${plan._id}`">{{plan.title}}（计划）</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{plan.title}}（检查计划）</el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="taskData" v-loading="loading" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" min-width="160px" sortable></el-table-column>
          <el-table-column prop="_staff.name" label="制定人" sortable></el-table-column>
          <el-table-column prop="date" label="制定日期" sortable align="center"></el-table-column>
          <el-table-column label="任务限期" align="center">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="getStateType(scope.row.state)"
              >{{taskState(scope.row.state)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="任务进度" align="center">
            <template slot-scope="scope">{{scope.row.progress[0]}} / {{scope.row.progress[1]}}</template>
          </el-table-column>
          <el-table-column align="right" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button
                @click.native="$router.push(`/daily/${plan._id}/${scope.row._id}`)"
                size="mini"
                type="primary"
              >任务进度详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { task, taskState } from "@/api/task.js";
import { staff } from "@/api/staff.js";
import { plan } from "@/api/plan.js";

export default {
  name: "daily_task",

  data() {
    return {
      loading: true,

      plan: {},

      taskData: [],
      staffData: [],

      taskState
    };
  },

  async beforeMount() {
    await this.init();
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.init();
  },

  methods: {
    async init() {
      this.loading = true;

      const planId = this.$route.params.planid;
      this.plan = (await plan(planId)).data;
      this.staffData = (await staff()).data;
      let taskList = (await task(planId)).data;
      taskList.forEach(task => {
        task._staff = this.staffData.find(t => t._id === task.staff);
      });
      this.taskData = taskList;

      this.loading = false;
    },

    getStateType: state =>
      ["", "warning", "primary", "success", "danger"][state]
  },

  computed: {}
};
</script>