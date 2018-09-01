<template>
  <div id="grid_member">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格人员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格人员管理</el-row>
    <el-row :gutter="15">
      <el-col :span="3">
        <router-link to="member/new">
          <el-button type="primary" icon="el-icon-plus">新增网格人员</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable v-model="search" placeholder="搜索姓名/岗位/单位名等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="5">
        <el-cascader clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="grid" :options="$store.state.demoData.gridArea" placeholder="按网格筛选" change-on-select></el-cascader>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%" border>
          <el-table-column type="index" label="序号" min-width="30px"></el-table-column>
          <el-table-column prop="name" label="人员姓名" sortable></el-table-column>
          <el-table-column label="性别" sortable>
            <template slot-scope="scope">
              {{scope.row.sex|sex}}
            </template>
          </el-table-column>
          <el-table-column label="网格名称" sortable>
            <template slot-scope="scope">
              {{$store.state.demoData.findArea(scope.row.area).name}}
              <el-tag size="small">{{$store.state.demoData.findAreaIDArray(scope.row.area).length}}级网格</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="job" label="职务" sortable></el-table-column>
          <el-table-column prop="action" label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('member/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="page" :page-size="pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "grid_member",
  data() {
    return {
      search: "",
      grid: null,
      page: 1,
      pageSize: 10
    };
  },

  filters: {
    sex(i) {
      return i == 1 ? "男" : "女";
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.demoData.gridMember;
      if (this.search.trim().length > 0) {
        tableData = tableData.filter(
          t => t.name.includes(this.search) || t.job.includes(this.search)
        );
      }

      if (this.grid && this.grid.trim().length > 0) {
        let gridSearch = this.grid.slice(-1);

        tableData = tableData.filter(t => t.area == gridSearch);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    }
  }
};
</script>
