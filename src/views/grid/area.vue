<template>
  <el-row id="grid_area">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/area">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格区域</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格区域</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="3">
        <router-link to="area/new">
          <el-button style="width:100%;" type="primary" size="small" icon="el-icon-plus">新建网格区域</el-button>
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link to="area/new">
          <el-button style="width:100%;" type="primary" size="small" icon="el-icon-sort">对接同步网格信息</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input clearable v-model="search.text" size="small" placeholder="搜索网格名称/代码等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select v-model="search.state" size="small" clearable placeholder="按状态筛选">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="code" label="主体代码" sortable></el-table-column>
          <el-table-column prop="name" label="网格化主体名称" sortable></el-table-column>
          <el-table-column label="状态" align="center" sortabl>
            <template slot-scope="scope">
              <el-tag size="small" :type="getStateType(scope.row.state)">{{scope.row.state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="110px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('area/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination @size-change="t=>areaTable.pageSize=t" background :current-page.sync="areaTable.page" :page-sizes="areaTable.pageSizes" :page-size="areaTable.pageSize" layout="total, prev, pager, next, sizes" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "grid_area",
  
  data() {
    return {
      search: {
        text: "",
        state: ""
      },
      currentSearch: {
        text: "",
        state: ""
      },
      areaTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    stateText(state) {
      return state == 1 ? "激活" : "停用";
    }
  },

  computed: {
    areaData() {
      let areas = this.$store.state.gridarea.gridarea;
      let areasArray = [];

      let getAreas = function(item) {
        areasArray.push({
          id: item.id,
          code: item.code,
          name: item.name,
          state: item.state
        });
        if (item.children) {
          item.children.forEach(t => getAreas(t));
        }
      };

      areas.forEach(t => getAreas(t));
      return areasArray;
    },

    tableData() {
      let tableData = this.areaData;
      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t => t.name.includes(searchText) || t.code.includes(searchText)
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(t => t.state === this.currentSearch.state);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.areaTable.page - 1) * this.areaTable.pageSize,
        this.areaTable.page * this.areaTable.pageSize
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
  }
};
</script>
