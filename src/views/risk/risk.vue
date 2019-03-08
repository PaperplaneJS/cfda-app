<template>
  <el-row id="risk_risk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">量化评级</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">量化评级 ({{currentYear}}年度)</el-row>

    <el-row class="action">
      <el-col :span="10">
        <el-radio-group v-model="currentYear" size="small">
          <el-radio-button v-for="item of riskYears.slice(-8).reverse()" :key="item" :label="item"></el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col v-if="riskYears.slice(0,-8)&&riskYears.slice(0,-8).length>0" :span="2">
        <el-dropdown>
          <el-button size="small" type="text">
            往期年份
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item of riskYears.slice(0,-8)"
              :key="item"
              @click.native="currentYear=item"
            >{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <el-row style="margin-bottom:10px;" :gutter="15">
      <el-col :span="24">
        <el-alert title="餐饮服务行业每年度如进行量化评级检查，检查完成后，结果将汇总在本页" type="info" :closable="false" show-icon></el-alert>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          size="small"
          v-model="search.text"
          clearable
          placeholder="搜索单位名称/区域/分值/评定单位人员等"
          prefix-icon="el-icon-search"
        ></el-input>
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
        <el-date-picker
          v-model="search.daterange"
          size="small"
          clearable
          type="daterange"
          range-separator="至"
          start-placeholder="评级日期起"
          end-placeholder="截止日期"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%;margin-bottom:20px;">
          <el-table-column prop="biz.com_name" label="单位名称" sortable></el-table-column>
          <el-table-column prop="department" label="行政区域" sortable></el-table-column>
          <el-table-column label="单位类型" sortable>
            <template slot-scope="scope">{{scope.row.biz.com_kind|bizKindText}}</template>
          </el-table-column>
          <el-table-column prop="biz.lic_code" label="许可证编号"></el-table-column>
          <el-table-column prop="type" label="评级类型" sortable></el-table-column>
          <el-table-column label="检查结果" sortable>
            <template slot-scope="scope">
              <el-tag size="medium">{{scope.row.level}} | {{scope.row.point}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="staffinfo" label="检查人员" sortable></el-table-column>
          <el-table-column prop="date" label="检查时间" align="center" sortable></el-table-column>
          <el-table-column align="center" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button
                @click.native="$router.push('risk/'+scope.row.id)"
                size="mini"
                type="primary"
              >查看</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        @size-change="t=>riskTable.pageSize=t"
        :current-page.sync="riskTable.page"
        :page-sizes="riskTable.pageSizes"
        :page-size="riskTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { getAllRisks, getRisksByYear } from "@/api/old_risk.js";
import { getAreaByID } from "@/api/old_area.js";
import { getAllBizs } from "@/api/old_biz.js";
import { getStaffByID } from "@/api/old_staff.js";

export default {
  name: "risk_risk",

  data() {
    return {
      currentYear: null,
      bizData: [],
      search: {
        text: "",
        level: null,
        daterange: []
      },
      riskTable: {
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
    bizKindText(kind) {
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
    riskYears() {
      return Object.keys(getAllRisks()).map(t => t);
    },

    currentRisk() {
      let list = getRisksByYear(this.currentYear);
      let bizs = this.bizData;
      list.forEach(t => {
        t.biz = bizs.find(biz => biz.com_id == t.bizid);
        t.staffinfo = getStaffByID(t.staff).name;
        if (t.biz) {
          t.department = getAreaByID(t.biz.area).name;
        }
      });

      return list;
    },

    tableData() {
      let tableData = this.currentRisk;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.department.includes(searchText) ||
            t.level.includes(searchText) ||
            t.type.includes(searchText) ||
            t.staffinfo.includes(searchText)
        );
      }

      if (this.search.level && this.search.level != "") {
        tableData = tableData.filter(t => t.level === this.search.level);
      }

      if (
        this.search.daterange &&
        (this.search.daterange[0] || this.search.daterange[1])
      ) {
        tableData = tableData.filter(t => {
          let dt = new Date(t.date);
          return (
            dt.getTime() >= this.search.daterange[0].getTime() &&
            dt.getTime() <= this.search.daterange[1].getTime()
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
      this.bizData = getAllBizs();
      this.currentYear = `${new Date().getFullYear() + 1}`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
