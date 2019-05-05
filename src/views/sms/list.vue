<template>
  <el-row id="sms_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息列表</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="2">
        <router-link to="sms/post">
          <el-button
            style="width:100%;"
            size="small"
            type="primary"
            icon="el-icon-edit-outline"
          >发布消息</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <el-checkbox
          style="width:100%;"
          size="small"
          v-model="search.noread"
          label="只显示未读消息"
          border
        ></el-checkbox>
      </el-col>

      <el-col :span="6">
        <el-input
          size="small"
          v-model="search.text"
          clearable
          placeholder="搜索消息内容/标题/来源等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker
          size="small"
          v-model="search.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="起始日期"
          end-placeholder="截止日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :row-class-name="tableRowClassName"
          :data="pageData"
          size="medium"
          style="width: 100%"
        >
          <el-table-column label="消息标题" sortable min-width="250px">
            <template slot-scope="scope">
              <el-tag
                size="small"
                style="margin-right:10px;"
                :type="getReadStateType(scope.row)"
              >{{isRead(scope.row)?"已读":"未读"}}</el-tag>
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column label="发布状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small">接收/下发：{{scope.row.recive.length}}/{{scope.row.post.length}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="$dep.name" label="发布机构" sortable></el-table-column>
          <el-table-column prop="$staff.name" label="发布人" sortable></el-table-column>
          <el-table-column prop="date" label="发布日期" align="center" sortable></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="$router.push('sms/'+scope.row._id)" size="mini" type="primary">查看消息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        @size-change="t=>smsTable.pageSize=t"
        background
        :current-page.sync="smsTable.page"
        :page-sizes="smsTable.pageSizes"
        :page-size="smsTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { sms } from "@/api/sms.js";
import { staff } from "@/api/staff";
import { dep } from "@/api/dep";

export default {
  name: "sms_list",

  data() {
    return {
      smsData: [],
      depData: [],
      staffData: [],

      loading: true,

      search: {
        text: "",
        daterange: [],
        noread: true
      },
      smsTable: {
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

      let smsList = (await sms()).data;
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      smsList.forEach(sms => {
        sms.$dep = this.depData.find(t => t._id === sms.dep);
        sms.$staff = this.staffData.find(t => t._id === sms.staff);
      });
      this.smsData = smsList;

      this.loading = false;
    },

    getReadStateType(sms) {
      return this.isRead(sms) ? "info" : "warning";
    },

    isRead(sms) {
      return sms.recive
        .map(t => t.staff)
        .includes(this.$store.state.currentUser._id);
    },

    tableRowClassName({ row }) {
      return this.isRead(row) ? "" : "noread";
    }
  },

  computed: {
    tableData() {
      let tableData = this.smsData;

      if (this.search.noread) {
        tableData = tableData.filter(t => !this.isRead(t));
      }

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.title.includes(searchText) ||
            t.$dep.name.includes(searchText) ||
            t.$staff.name.includes(searchText)
        );
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
        (this.smsTable.page - 1) * this.smsTable.pageSize,
        this.smsTable.page * this.smsTable.pageSize
      );
    }
  }
};
</script>

<style lang="scss">
#sms_list {
  .noread {
    background: #f0f9eb !important;
  }
}
</style>

