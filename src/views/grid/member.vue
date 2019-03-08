<template>
  <el-row id="grid_member">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>行政人员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">行政人员管理</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="4">
        <router-link to="member/new">
          <el-button type="primary" size="small" icon="el-icon-plus">新增行政人员</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          clearable
          size="small"
          v-model="search.text"
          placeholder="搜索姓名/岗位/单位名等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="5">
        <el-cascader
          clearable
          :show-all-levels="false"
          size="small"
          :props="{label:'name',value:'id'}"
          v-model="search.grid"
          :options="department.getArea()"
          placeholder="按网格筛选"
          change-on-select
        ></el-cascader>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column prop="name" label="人员姓名" sortable></el-table-column>
          <el-table-column label="性别" sortable>
            <template slot-scope="scope">{{scope.row.sex|sex}}</template>
          </el-table-column>
          <el-table-column label="单位名称" sortable>
            <template slot-scope="scope">
              {{department.getAreaByID(scope.row.area).name}}
              <el-tag size="small">{{department.getAreaIDArray(scope.row.area).length}}级网格</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="职务" sortable></el-table-column>
          <el-table-column label="状态" align="center" sortabl>
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="getStateType(scope.row.state)"
              >{{scope.row.state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-button
                @click.native="$router.push('member/'+scope.row.id)"
                size="mini"
                type="primary"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        @size-change="t=>memberTable.pageSize=t"
        background
        :current-page.sync="memberTable.page"
        :page-sizes="memberTable.pageSizes"
        :page-size="memberTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import staff from "@/api/old_staff.js";
import department from "@/api/old_area.js";

export default {
  name: "grid_member",

  data() {
    return {
      department,
      search: {
        text: "",
        grid: []
      },
      memberTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    sex(i) {
      return i == 1 ? "男" : "女";
    },
    stateText(state) {
      return state == 1 ? "激活" : "停用";
    }
  },

  computed: {
    tableData() {
      let tableData = staff.getAllStaffs();

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t => t.name.includes(searchText) || t.job.includes(searchText)
        );
      }

      if (this.search.grid && this.search.grid.length > 0) {
        let gridSearch = this.search.grid.join(",").trim();
        tableData = tableData.filter(t =>
          this.$store.state.gridarea
            .findAreaIDArray(t.area)
            .join(",")
            .trim()
            .includes(gridSearch)
        );
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.memberTable.page - 1) * this.memberTable.pageSize,
        this.memberTable.page * this.memberTable.pageSize
      );
    }
  },

  methods: {
    getStateType(state) {
      switch (state) {
        case 1:
          return "success";
        default:
          return "danger";
      }
    }
  }
};
</script>
