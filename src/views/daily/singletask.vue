<template>
  <el-row id="daily_singletask">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/${plan._id}`">{{plan.title}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/${plan._id}/${task._id}`">{{task.title}}（任务）</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">{{title}}（检查任务）</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <el-checkbox size="small" v-model="search.onlychecked" label="只显示已检查的" border></el-checkbox>
      </el-col>

      <el-col :span="6">
        <el-input
          v-model="search.text"
          size="small"
          clearable
          placeholder="搜索单位名称/结果等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-select size="small" v-model="search.result" clearable placeholder="按检查结果筛选">
        <el-option
          v-for="(name,index) in recordResult()"
          :key="index+1"
          :label="name"
          :value="index+1"
        ></el-option>
      </el-select>

      <el-select size="small" v-model="search.handle" clearable placeholder="按处理方式筛选">
        <el-option
          v-for="(name,index) in recordHandle()"
          :key="index+1"
          :label="name"
          :value="index+1"
        ></el-option>
      </el-select>

      <el-col :span="10">
        <el-date-picker
          v-model="search.daterange"
          size="small"
          clearable
          type="daterange"
          range-separator="至"
          start-placeholder="检查日期"
          end-placeholder="截止日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table
          :data="pageData"
          :row-class-name="tableRowClassName"
          v-loading="loading"
          size="medium"
          style="width: 100%;margin-bottom:20px;"
        >
          <el-table-column label="单位名称" min-width="180px" sortable>
            <template slot-scope="scope">
              <el-tag v-if="!scope.row.result" type="warning" size="mini">
                <strong>尚未检查</strong>
              </el-tag>
              {{scope.row.bizname}}
            </template>
          </el-table-column>
          <el-table-column label="检查人员" sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.staffinfo">
                主检查人：
                <el-tag size="mini">{{scope.row.staffinfo[0]}}</el-tag>
              </div>
              <div v-if="scope.row.staffinfo">
                协同检查：
                <el-tag size="mini">{{scope.row.staffinfo[1]}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="检查日期" align="center" sortable></el-table-column>
          <el-table-column align="center" label="检查结果">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.result"
                size="small"
                :type="getResultType(scope.row.result)"
              >{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="处理方式">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.handle"
                size="small"
                :type="getResultType(scope.row.handle)"
              >{{scope.row.handle}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button
                v-if="!scope.row.notchecked"
                @click.native="$router.push($route.path+'/'+scope.row.id)"
                size="mini"
                type="primary"
              >查看记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        @size-change="t=>taskBizTable.pageSize=t"
        :current-page.sync="taskBizTable.page"
        :page-sizes="taskBizTable.pageSizes"
        :page-size="taskBizTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "daily_singletask",

  data() {
    return {
      title: null,
      plan: {},
      task: {},

      bizData: [],

      loading: true,

      search: {
        text: "",
        daterange: [],
        result: "",
        handle: ""
      },
      taskBizTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
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
      const planId = this.$route.params.planid;
      const taskId = this.$route.params.taskid;

      this.bizData = getAllBizs();

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
  },

  computed: {
    tableData() {
      let tableData = this.bizData;

      // if (!this.search.onlychecked) {
      //   this.currentTask.checklist.forEach(t => {
      //     tableData.push({
      //       id: uuid(6, 16),
      //       bizname: this.bizData.find(biz => biz.com_id == t).com_name,
      //       notchecked: true
      //     });
      //   });
      // }

      if (this.search.result && this.search.result != "") {
        tableData = tableData.filter(t => t.result === this.search.result);
      }

      if (this.search.handle && this.search.handle != "") {
        tableData = tableData.filter(t => t.handle === this.search.handle);
      }

      if (
        this.search.daterange &&
        (this.search.daterange[0] || this.search.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.date);
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
        (this.taskBizTable.page - 1) * this.taskBizTable.pageSize,
        this.taskBizTable.page * this.taskBizTable.pageSize
      );
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
