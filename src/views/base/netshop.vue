<template>
  <el-row id="base_netshop">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/netshop">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/netshop">网上商家</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网上商家无证备案</el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="3">
        <router-link to="netshop/new">
          <el-button size="small" type="primary" icon="el-icon-plus">网上商家备案</el-button>
        </router-link>
      </el-col>

      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索名称/联系方式/联系人等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.category" clearable placeholder="经营种类">
          <el-option label="餐馆" value="餐馆"></el-option>
          <el-option label="快餐店" value="快餐店"></el-option>
          <el-option label="小吃店" value="小吃店"></el-option>
          <el-option label="饮品店" value="饮品店"></el-option>
          <el-option label="食堂" value="食堂"></el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.licence" clearable placeholder="许可证">
          <el-option label="有许可证" :value="true"></el-option>
          <el-option label="暂无" :value="false"></el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="状态">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-col>

      <el-col :span="3">
        <el-cascader size="small" clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="search.grid" :options="$store.state.gridarea.gridarea" placeholder="网格区域" change-on-select></el-cascader>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;">
          <el-table-column prop="name" label="商家名称" sortable></el-table-column>
          <el-table-column prop="category" label="经营类别" sortable></el-table-column>
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
              <el-tag size="small" v-else>暂无许可证</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getStateType(scope.row.state)">{{scope.row.state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('netshop/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
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
  name: "base_netshop",
  data() {
    return {
      search: {
        text: "",
        category: "",
        licence: "",
        state: "",
        grid: []
      },
      currentSearch: {
        text: "",
        category: "",
        licence: "",
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
      return text == 1 ? "激活" : "停用";
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
        category: "",
        licence: "",
        state: "",
        grid: []
      };
      this.searchSubmit();
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.biz.filter(t => t.kind == "网上商家");

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

      if (this.currentSearch.category && this.currentSearch.category != "") {
        tableData = tableData.filter(
          t => t.category === this.currentSearch.category
        );
      }

      if (this.currentSearch.licence) {
        tableData = tableData.filter(t => t.licence);
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
