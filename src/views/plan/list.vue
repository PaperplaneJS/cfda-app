<template>
  <div id="plan_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/list">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看制定</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">计划查看与制定</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="2">
        <router-link to="list/new">
          <el-button type="primary" size="small" icon="el-icon-plus">新建计划</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable size="small" v-model="search.text" placeholder="搜索计划内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="4">
        <el-select size="small" clearable v-model="search.kind" placeholder="按类别筛选">
          <el-option label="日常检查" value="daily"></el-option>
          <el-option label="专项检查" value="special"></el-option>
          <el-option label="全量检查(风险评级)" value="risk"></el-option>
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
          <el-table-column prop="title" label="标题" min-width="120px" sortable></el-table-column>
          <el-table-column label="类别" sortable>
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.kind | planKindText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="staff" label="制定人" sortable></el-table-column>
          <el-table-column prop="department" label="制定单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定时间"></el-table-column>
          <el-table-column label="执行期限">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>~
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getPlanType(scope.row.state)">{{scope.row.state | planStateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button @click="$router.push('list/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
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
  name: "plan_list",
  data() {
    return {
      search: {
        text: "",
        kind: "",
        daterange: []
      },
      currentSearch: {
        text: "",
        kind: "",
        daterange: []
      },
      planTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {
    planStateText(state) {
      switch (state) {
        case 1:
          return "待分发";
        case 2:
          return "已分发";
        case 3:
          return "执行中";
        case 4:
          return "已完成";
        default:
          return "未知";
      }
    },

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
      let tableData = this.$store.state.plan;

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
    getPlanType(state) {
      switch (state) {
        case 1:
          return "warning";
        case 2:
          return "";
        case 3:
          return "";
        case 4:
          return "success";
        default:
          return "info";
      }
    },

    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        kind: "",
        daterange: []
      };
      this.searchSubmit();
    }
  }
};
</script>

