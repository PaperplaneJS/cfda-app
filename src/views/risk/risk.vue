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

      <el-col :span="3">
        <el-select size="small" v-model="search.level" clearable placeholder="评级结果">
          <el-option value="优秀">优秀 (90+)</el-option>
          <el-option value="良好">良好 (75+)</el-option>
          <el-option value="一般">一般 (60+)</el-option>
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
          <el-table-column prop="biz.name" label="单位名称" sortable></el-table-column>
          <el-table-column prop="biz.kind" label="单位类型" sortable></el-table-column>
          <el-table-column prop="type" label="评级类型" sortable></el-table-column>
          <el-table-column prop="biz.licence.num" label="许可证编号"></el-table-column>
          <el-table-column prop="department" label="所属网格" sortable></el-table-column>
          <el-table-column label="检查结果" sortable>
            <template slot-scope="scope">
              <el-tag size="medium">{{scope.row.level}} | {{scope.row.point}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="staffinfo" label="检查人员" sortable></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column align="right" prop="action" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('risk/'+scope.row.id)" size="mini" type="primary">查看</el-button>
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
      let list = this.$store.state.risk[this.currentYear];
      list.forEach(t => {
        t.biz = this.$store.state.biz.find(biz => biz.id == t.bizid);
        t.staffinfo = this.$store.state.gridmember.find(
          staff => staff.id == t.staff
        ).name;
        t.department = this.$store.state.gridarea.findArea(t.biz.area).name;
      });

      return list;
    },

    tableData() {
      let tableData = this.currentRisk;

      if (
        this.currentSearch.text &&
        this.currentSearch.text.trim().length > 0
      ) {
        let searchText = this.currentSearch.text;
        tableData = tableData.filter(
          t =>
            t.department.includes(searchText) ||
            t.level.includes(searchText) ||
            t.type.includes(searchText) ||
            t.staffinfo.includes(searchText)
        );
      }

      if (this.currentSearch.level && this.currentSearch.level != "") {
        tableData = tableData.filter(t => t.level === this.currentSearch.level);
      }

      if (
        this.currentSearch.daterange &&
        (this.currentSearch.daterange[0] || this.currentSearch.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.date);
          return (
            dt.getTime() >= this.currentSearch.daterange[0].getTime() &&
            dt.getTime() <= this.currentSearch.daterange[1].getTime()
          );
        });
      }

      return tableData;
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
