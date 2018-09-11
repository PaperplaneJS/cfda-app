<template>
  <el-row id="risk_risk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">量化评级</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">量化评级 ({{currentYear}}年度)</el-row>

    <el-row style="margin-bottom:40px;" :gutter="15">
      <el-col :span="10">
        <el-radio-group v-model="currentYear" size="small">
          <el-radio-button v-for="item of riskYears.slice(-8)" :key="item" :label="item"></el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col v-if="riskYears.slice(0,-8)&&riskYears.slice(0,-8).length>0" :span="2">
        <el-dropdown>
          <el-button size="small" type="text">
            往期年份
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of riskYears.slice(0,-8)" :key="item" @click.native="currentYear=item">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <el-col :span="12">
        <el-alert title="餐饮服务行业每个年度需要进行全量检查，评定风险等级后，结果将汇总在本页" type="info" :closable="false" show-icon>
        </el-alert>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input size="small" v-model="search.text" clearable placeholder="搜索单位名称/区域/分值/评定单位人员等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="4">
        <el-select size="small" v-model="search.level" clearable placeholder="选择级别">
          <el-option value="优秀">优秀</el-option>
          <el-option value="良好">良好</el-option>
          <el-option value="一般">一般</el-option>
          <el-option value="不合格">不合格</el-option>
        </el-select>
      </el-col>

      <el-col :span="10">
        <el-date-picker v-model="search.daterange" size="small" clearable type="daterange" range-separator="至" start-placeholder="评级日期起" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
        <el-button @click="searchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="searchReset" size="small" round>重置</el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;margin-bottom:20px;">
          <el-table-column prop="code" label="许可证编号"></el-table-column>
          <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
          <el-table-column prop="kind" label="单位类型" sortable></el-table-column>
          <el-table-column prop="area" label="所属区域" sortable></el-table-column>
          <el-table-column label="评级结果" min-width="120px;" sortable>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result.lv">{{scope.row.result.lv}}</el-tag>
              <el-popover style="padding-left:10px;" placement="top-start" title="分值详情" width="200" trigger="hover" :content="`静态: ${scope.row.result.static}  / 动态: ${scope.row.result.active}`">
                <el-button size="small" slot="reference">风险分值: {{scope.row.result.total}}</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="staff" label="评定人" sortable></el-table-column>
          <el-table-column prop="department" label="评定单位" sortable></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('risk/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="riskTable.page" :page-size="riskTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "risk_risk",

  data() {
    return {
      currentYear: null,
      search: {
        text: "",
        level: null,
        daterange: []
      },
      currentSearch: {
        text: "",
        level: null,
        daterange: []
      },
      riskTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    riskYears() {
      return Object.keys(this.$store.state.risk).map(t => t);
    },

    currentRisk() {
      return this.$store.state.risk[this.currentYear];
    },

    tableData() {
      // let tableData = this.$store.state.risk;

      // if (
      //   this.currentSearch.text &&
      //   this.currentSearch.text.trim().length > 0
      // ) {
      //   let searchText = this.currentSearch.text;
      //   tableData = tableData.filter(
      //     t =>
      //       t.name.includes(searchText) ||
      //       t.kind.includes(searchText) ||
      //       t.contact.includes(searchText) ||
      //       (t.licence && t.licence.name.includes(searchText))
      //   );
      // }

      // if (this.currentSearch.state && this.currentSearch.state != "") {
      //   tableData = tableData.filter(t => t.state === this.currentSearch.state);
      // }

      // if (this.currentSearch.kind && this.currentSearch.kind != "") {
      //   tableData = tableData.filter(t => t.kind === this.currentSearch.kind);
      // }

      // if (this.currentSearch.grid && this.currentSearch.grid.length > 0) {
      //   let gridSearch = this.currentSearch.grid.join(",").trim();
      //   tableData = tableData.filter(t =>
      //     this.$store.state.gridarea
      //       .findAreaIDArray(t.area)
      //       .join(",")
      //       .trim()
      //       .includes(gridSearch)
      //   );
      // }

      // return tableData;
      return [];
    },

    pageData() {
      return this.tableData.slice(
        (this.riskTable.page - 1) * this.riskTable.pageSize,
        this.riskTable.page * this.riskTable.pageSize
      );
    }
  },

  methods: {
    init() {
      this.currentYear = `${new Date().getFullYear() + 1}`;
    },

    searchSubmit() {
      Object.assign(this.currentSearch, this.search);
    },

    searchReset() {
      this.search = {
        text: "",
        level: null,
        daterange: []
      };
      this.searchSubmit();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
