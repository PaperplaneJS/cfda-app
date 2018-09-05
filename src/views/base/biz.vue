<template>
  <el-row id="base_biz">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">企业管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">企业单位管理</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="2">
        <router-link to="biz/new">
          <el-button size="small" type="primary" icon="el-icon-plus">新建单位</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索单位名/联系方式/许可证号等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.kind" clearable placeholder="选择类别">
          <el-option value="食品销售">食品销售</el-option>
          <el-option value="食品生产">食品生产</el-option>
          <el-option value="餐饮服务">餐饮服务</el-option>
          <el-option value="保健食品生产">保健食品生产</el-option>
          <el-option value="小作坊">小作坊</el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="选择状态">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-col>

      <el-col :span="5">
        <el-cascader size="small" clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="search.grid" :options="$store.state.gridarea.gridarea" placeholder="按网格筛选" change-on-select></el-cascader>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;">
          <el-table-column prop="name" label="企业名称" sortable></el-table-column>
          <el-table-column prop="kind" label="类型" sortable></el-table-column>
          <el-table-column label="网格区域" sortable>
            <template slot-scope="scope">
              {{$store.state.gridarea.findArea(scope.row.area).name}}
            </template>
          </el-table-column>
          <el-table-column prop="contact" label="联系人" sortable></el-table-column>
          <el-table-column prop="tel" label="联系电话"></el-table-column>
          <el-table-column label="许可证编号">
            <template slot-scope="scope">
              <span v-if="scope.row.licence">{{scope.row.licence.num}}</span>
              <el-tag v-else>暂无许可证</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="licence.responsible" label="法人" sortable></el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getStateType(scope.row.state)">{{scope.row.state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('biz/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="bizTable.page" :page-size="bizTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "base_biz",
  data() {
    return {
      search: {
        text: "",
        kind: "",
        state: "",
        grid: []
      },
      currentSearch: {
        text: "",
        kind: "",
        state: "",
        grid: []
      },
      bizTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {
    stateText(text) {
      return text == 1 ? "激活" : "注销";
    }
  },

  methods: {
    getStateType(state) {
      switch (state) {
        case 1:
          return "success";
        case 2:
          return "danger";
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
        state: "",
        grid: []
      };
      this.searchSubmit();
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.biz;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.kind.includes(searchText) ||
            t.contact.includes(searchText) ||
            (t.licence && t.licence.name.includes(searchText))
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(t => t.state === this.currentSearch.state);
      }

      if (this.currentSearch.kind && this.currentSearch.kind != "") {
        tableData = tableData.filter(t => t.kind === this.currentSearch.kind);
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
        (this.bizTable.page - 1) * this.bizTable.pageSize,
        this.bizTable.page * this.bizTable.pageSize
      );
    }
  }
};
</script>
