<template>
  <div id="grid_area">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/area">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格区域</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格区域</el-row>
    <el-row :gutter="15">
      <el-col :span="3">
        <router-link to="area/new">
          <el-button type="primary" icon="el-icon-plus">新建网格区域</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable v-model="search" placeholder="搜索网格名称/代码等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select v-model="state" clearable placeholder="按状态筛选">
          <el-option label="正常" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%" border>
          <el-table-column prop="code" label="主体代码" sortable></el-table-column>
          <el-table-column prop="name" label="网格化主体名称" sortable></el-table-column>
          <el-table-column label="状态" sortabl>
            <template slot-scope="scope">
              <el-tag :type="getStateType(scope.row.state)">{{scope.row.state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('area/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
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
  name: "grid_area",
  data() {
    return {
      state: null,
      search: "",
      page: 1,
      pageSize: 10
    };
  },

  methods: {
    getStateType(text) {
      switch (text) {
        case 1:
          return "success";
        default:
          return "danger";
      }
    }
  },

  filters: {
    stateText(text) {
      return text == 1 ? "正常" : "停用";
    }
  },

  computed: {
    areaData() {
      let areas = this.$store.state.demoData.gridArea;
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
      let areasArray = this.areaData;
      if (this.search.trim().length > 0) {
        areasArray = areasArray.filter(
          t => t.code.includes(this.search) || t.name.includes(this.search)
        );
      }

      if (this.state !== null && this.state !== "") {
        areasArray = areasArray.filter(t => t.state === this.state);
      }

      return areasArray;
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
