<template>
  <div id="grid_member">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格人员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格人员管理</el-row>
    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input clearable size="small" v-model="search.text" placeholder="搜索姓名/岗位/单位名等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="5">
        <el-cascader clearable :show-all-levels="false" size="small" :props="{label:'name',value:'id'}" v-model="search.grid" :options="$store.state.gridarea.gridarea" placeholder="按网格筛选" change-on-select></el-cascader>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column type="index" label="序号" width="80px"></el-table-column>
          <el-table-column prop="name" label="人员姓名" sortable></el-table-column>
          <el-table-column label="性别" sortable>
            <template slot-scope="scope">
              {{scope.row.sex|sex}}
            </template>
          </el-table-column>
          <el-table-column label="网格名称" sortable>
            <template slot-scope="scope">
              {{$store.state.gridarea.findArea(scope.row.area).name}}
              <el-tag size="small">{{$store.state.gridarea.findAreaIDArray(scope.row.area).length}}级网格</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="职务" sortable></el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('member/'+scope.row.id)" size="mini" type="primary">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="memberTable.page" :page-size="memberTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "grid_member",
  data() {
    return {
      search: {
        text: "",
        grid: []
      },
      currentSearch: {
        text: "",
        grid: []
      },
      memberTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {
    sex(i) {
      return i == 1 ? "男" : "女";
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.gridmember;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t => t.name.includes(searchText) || t.job.includes(searchText)
        );
      }

      if (this.currentSearch.grid && this.currentSearch.grid.length > 0) {
        let gridSearch = this.currentSearch.grid.join(",").trim();
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
    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        grid: []
      };
      this.searchSubmit();
    }
  }
};
</script>
