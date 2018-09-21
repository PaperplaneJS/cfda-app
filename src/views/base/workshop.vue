<template>
  <el-row id="base_workshop">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/workshop">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>食品小作坊</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">食品小作坊备案</el-row>

    <el-row type="flex" class="action" :gutter="15">
      <el-col :span="3">
        <router-link to="workshop/new">
          <el-button size="small" type="primary" icon="el-icon-plus">小作坊备案登记</el-button>
        </router-link>
      </el-col>

      <el-col :span="8" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button size="small" icon="el-icon-download" type="primary" plain>导出为Excel</el-button>
        <el-button size="small" icon="el-icon-upload2" type="primary" plain>导入Excel</el-button>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索小作坊名称/联系方式/联系人等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="4">
        <el-cascader size="small" clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="search.grid" :options="department.getArea()" placeholder="网格区域" change-on-select></el-cascader>
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
          <el-option label="正常" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;">
          <el-table-column prop="com_name" label="小作坊名称" sortable></el-table-column>
          <el-table-column prop="com_category" label="经营类别" sortable></el-table-column>
          <el-table-column label="网格区域" sortable>
            <template slot-scope="scope">
              {{department.getAreaByID(scope.row.area).name}}
            </template>
          </el-table-column>
          <el-table-column prop="com_contact" label="联系人" sortable></el-table-column>
          <el-table-column prop="com_tel" label="联系电话"></el-table-column>
          <el-table-column label="小作坊登记证">
            <template slot-scope="scope">
              <span v-if="scope.row.lic_code">{{scope.row.lic_code}}</span>
              <el-tag size="small" type="warning" v-else>暂无登记证</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getStateType(scope.row.com_state)">{{scope.row.com_state|stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="110px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('workshop/'+scope.row.com_id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination @size-change="t=>bizTable.pageSize=t" background :current-page.sync="bizTable.page" :page-sizes="bizTable.pageSizes" :page-size="bizTable.pageSize" layout="total, prev, pager, next, sizes" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { getAllBizs } from "@/api/old_biz.js";
import department from "@/api/old_area.js";

export default {
  name: "base_workshop",

  data() {
    return {
      bizData: [],
      department,
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
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  beforeMount() {
    this.init();
  },

  filters: {
    stateText(text) {
      return text == "1" ? "正常" : "关闭";
    },

    kindText(kind) {
      switch (kind) {
        case "1":
          return "食品经营";
        case "2":
          return "食品小作坊";
        case "3":
          return "网上商家";
        case "4":
          return "餐饮服务";
      }
    }
  },

  computed: {
    tableData() {
      let tableData = this.bizData.filter(t => t.com_kind === "2");

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.com_name.includes(searchText) ||
            t.com_kind.includes(searchText) ||
            t.com_contact.includes(searchText) ||
            t.com_tel.includes(searchText) ||
            (t.lic_code && t.lic_code.includes(searchText))
        );
      }

      if (this.currentSearch.state && this.currentSearch.state != "") {
        tableData = tableData.filter(
          t => t.com_state == this.currentSearch.state
        );
      }

      if (this.currentSearch.category && this.currentSearch.category != "") {
        tableData = tableData.filter(
          t => t.com_category === this.currentSearch.category
        );
      }

      if (this.currentSearch.licence !== "") {
        if (this.currentSearch.licence === true) {
          tableData = tableData.filter(t => t.lic_code);
        } else {
          tableData = tableData.filter(t => !t.lic_code);
        }
      }

      if (this.currentSearch.grid && this.currentSearch.grid.length > 0) {
        let gridSearch = this.currentSearch.grid.join(",");
        tableData = tableData.filter(t =>
          department
            .getAreaIDArray(t.area)
            .join(",")
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
  },

  methods: {
    init() {
      this.bizData = getAllBizs();
    },

    getStateType(state) {
      switch (state) {
        case "1":
          return "success";
        case "0":
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
  }
};
</script>
