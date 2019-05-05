<template>
  <el-row id="rectify_rectify">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/rectify">行政处罚</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">行政处罚总览</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          v-model="search.text"
          size="small"
          clearable
          placeholder="搜索单位名称/区域/评定单位人员等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.kind" clearable placeholder="处罚类型">
          <el-option value="通知整改">通知整改</el-option>
          <el-option value="停业整顿">停业整顿</el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-date-picker
          v-model="search.daterange"
          size="small"
          clearable
          type="daterange"
          range-separator="至"
          start-placeholder="下发日期起"
          end-placeholder="截止"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;margin-bottom:20px;">
          <el-table-column prop="biz.com_name" label="单位名称" sortable></el-table-column>
          <el-table-column label="检查计划任务">
            <template slot-scope="scope">
              <div>
                <el-tag size="mini">计划：{{scope.row.plan.title | textLong}}</el-tag>
              </div>
              <div>
                <el-tag size="mini">任务：{{scope.row.taskItem.title | textLong}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="执法人员" sortable>
            <template slot-scope="scope">
              <div>
                <el-tag size="mini">主要：{{scope.row.staff[0].name}}</el-tag>
              </div>
              <div>
                <el-tag size="mini">协查：{{scope.row.staff[1].name}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="task.date" label="检查日期" align="center" sortable></el-table-column>
          <el-table-column label="检查结果">
            <template slot-scope="scope">
              <el-tag
                :type="getResultType(scope.row.task.result)"
                size="small"
              >{{scope.row.task.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="处理方式">
            <template slot-scope="scope">
              <el-tag
                :type="getResultType(scope.row.task.handle)"
                size="small"
              >{{scope.row.task.handle}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="处罚日期" align="center" sortable></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native="$router.push('rectify/'+scope.row.id)"
                size="mini"
                type="primary"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        @size-change="t=>rectifyTable.pageSize=t"
        :current-page.sync="rectifyTable.page"
        :page-sizes="rectifyTable.pageSizes"
        :page-size="rectifyTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "rectify_rectify",

  data() {
    return {
      search: {
        text: "",
        kind: "",
        daterange: []
      },
      rectifyTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    textLong(text) {
      return text.slice(0, 6) + "...";
    }
  },

  computed: {
    tableData() {
      let tableData = copy(getRectifys());

      tableData.forEach(t => {
        t.task = this.findTask(t.taskid).taskDetail;
        t.taskItem = this.findTask(t.taskid).taskItem;
        t.biz = getBizByID(t.bizid);
        t.plan = getPlanByID(t.planid);

        t.staff = [
          getStaffByID(t.task.staff[0].id),
          getStaffByID(t.task.staff[1].id)
        ];
      });

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.biz.name.includes(searchText) ||
            t.staff.name.includes(searchText) ||
            t.plan.name.includes(searchText) ||
            t.task.name.includes(searchText)
        );
      }

      if (this.search.kind && this.search.kind != "") {
        tableData = tableData.filter(t => t.kind == this.search.kind);
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
        (this.rectifyTable.page - 1) * this.rectifyTable.pageSize,
        this.rectifyTable.page * this.rectifyTable.pageSize
      );
    }
  },

  methods: {
    findTask(id) {
      let taskDetail = null,
        taskItem = null;

      getTaskItems().forEach(task => {
        task.tasklist.forEach(taskitem => {
          taskitem.detail.forEach(detail => {
            if (detail.id == id) {
              taskItem = taskitem;
              taskDetail = detail;
            }
          });
        });
      });

      return {
        taskItem,
        taskDetail
      };
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

<style lang="scss" scoped>
</style>
