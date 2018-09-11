<template>
  <el-row id="base_template">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>模板管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-row class="title">检查项目模板管理</el-row>
          <el-row type="flex" :gutter="15">
            <el-col :span="3">
              <el-dropdown size="small" split-button type="primary" @click="$router.push('/base/template/new')">
                新建常规模板
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="$router.push('/base/risktemplate/new')">新建量化分级模板</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="6">
              <el-input v-model="search.text" size="small" clearable placeholder="搜索模板名/创建人等" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="3">
              <el-input v-model="search.kind" size="small" clearable placeholder="筛选类别" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="search.state" clearable placeholder="筛选状态">
                <el-option label="激活" :value="1"></el-option>
                <el-option label="停用" :value="2"></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left:auto;display:flex;justify-content:flex-end;" :span="6">
              <el-button @click="searchSubmit" size="small" icon="el-icon-search" type="primary" round>搜索</el-button>
              <el-button @click="searchReset" size="small" round>重置</el-button>
            </el-col>
          </el-row>

          <el-row style="margin-top: -10px;">
            <el-col :span="24">
              <el-table :data="pageData" size="medium" style="width: 100%">
                <el-table-column prop="name" label="模板名称" sortable min-width="120px;"></el-table-column>
                <el-table-column prop="kind" label="类别" sortable>
                  <template slot-scope="scope">
                    <el-tag size="small">{{scope.row.kind | kindText}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="department" label="制定部门" sortable></el-table-column>
                <el-table-column prop="staff" label="制定人" sortable></el-table-column>
                <el-table-column prop="date" label="创建日期" sortable></el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-tag size="small" :type="getStateType(scope.row.state)">{{scope.row.state|stateText}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="right" prop="action" label="操作" min-width="90px">
                  <template slot-scope="scope">
                    <el-button @click="$router.push(`${scope.row.kind=='risk'?'risk':''}template/${scope.row.id}`)" size="mini" type="primary">查看 / 编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row>
            <el-pagination :current-page.sync="templateTable.page" :page-size="templateTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
            </el-pagination>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "base_template",
  data() {
    return {
      search: {
        text: "",
        state: null,
        kind: null
      },
      currentSearch: {
        text: "",
        state: null,
        kind: null
      },
      templateTable: {
        page: 1,
        pageSize: 10
      },
      templatedata: [
        {
          id: 1,
          name: "食品生产日常监督检查要点表",
          state: 1,
          department: "常熟市食药监局",
          staff: "张小明",
          date: "2017-12-31"
        }
      ]
    };
  },

  filters: {
    stateText(state) {
      return state === 1 ? "激活" : "停用";
    },

    kindText(kind) {
      return kind === "daily" ? "日常检查" : "全量检查";
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.template;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.department.includes(searchText) ||
            t.staff.includes(searchText)
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(t => t.state === this.currentSearch.state);
      }

      if (this.currentSearch.kind && this.currentSearch.kind != "") {
        tableData = tableData.filter(t => t.kind === this.currentSearch.kind);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.templateTable.page - 1) * this.templateTable.pageSize,
        this.templateTable.page * this.templateTable.pageSize
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
        state: null,
        kind: null
      };
      this.searchSubmit();
    },

    getStateType(state) {
      switch (state) {
        case 1:
          return "success";
        case 2:
          return "danger";
        default:
          return "info";
      }
    }
  }
};
</script>