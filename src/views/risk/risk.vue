<template>
  <el-row id="risk_risk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">量化评级</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">量化评级 ({{currentYear}}年度)</el-row>

    <el-row class="action" :gutter="15">
      <el-select size="small" v-model="currentPlan" placeholder="选择一个检查计划">
        <el-option v-for="item in planData" :key="item._id" :value="item._id" :label="item.title"></el-option>
      </el-select>

      <el-radio-group
        style="margin-left:15px;"
        @change="getData()"
        v-model="currentYear"
        size="small"
      >
        <el-radio-button v-for="item of riskYears" :key="item" :value="item" :label="item"></el-radio-button>
      </el-radio-group>
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
          <el-option v-for="(k,i) in riskLv()" :key="i+1" :value="i+1" :label="k"></el-option>
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
        <el-table
          v-loading="loading"
          :data="pageData"
          size="medium"
          style="width: 100%;margin-bottom:20px;"
        >
          <el-table-column prop="$biz.name" label="单位名称" sortable></el-table-column>
          <el-table-column prop="$dep.name" label="行政区域" sortable></el-table-column>
          <el-table-column prop="$biz.lic.code" label="许可证编号"></el-table-column>
          <el-table-column label="单位类型" sortable>
            <template
              v-if="scope.row.isChecked"
              slot-scope="scope"
            >{{riskKind(scope.row.$risk.kind)}}</template>
          </el-table-column>
          <el-table-column label="检查结果" sortable>
            <template v-if="scope.row.isChecked" slot-scope="scope">
              <el-tag
                :type="getResultType(scope.row.$risk.level)"
                size="medium"
              >{{scope.row.$risk.point}} | {{riskLv(scope.row.$risk.level)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="$staff.name" label="检查人员" sortable></el-table-column>
          <el-table-column prop="$risk.date" label="检查时间" align="center" sortable></el-table-column>
          <el-table-column align="center" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.isChecked"
                @click.native="$router.push(`/risk/${scope.row.$biz._id}/${scope.row.$risk._plan}/${currentYear}`)"
                size="mini"
                type="primary"
              >查看结果</el-button>
              <el-button
                v-else-if="currentYear>=new Date().getFullYear()"
                @click.native="$router.push(`/risk/${scope.row.$biz._id}/${scope.row.$risk._plan}/${currentYear}`)"
                size="mini"
                type="primary"
                :disabled="!currentPlan"
              >{{currentPlan?"录入检查结果":"未选计划"}}</el-button>
              <el-tag v-else type="info" size="mini">往年未完成检查</el-tag>
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
import { risk, riskKind, riskLv } from "@/api/risk.js";
import { biz } from "@/api/biz.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";
import { plan } from "@/api/plan.js";

export default {
  name: "risk_risk",

  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentPlan: null,
      loading: true,

      bizData: [],
      riskData: [],
      depData: [],
      staffData: [],
      planData: [],

      search: {
        text: "",
        level: null,
        daterange: []
      },
      riskTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      riskKind,
      riskLv
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      await this.getData();
    },

    async getData() {
      this.loading = true;

      let risks = (await risk(null, `year=${this.currentYear}`)).data;
      this.planData = (await plan(null, `kind=risk`)).data;
      this.bizData = (await biz(null, `kind=4`)).data;
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      let riskList = [];
      this.bizData.forEach(b => {
        let r = risks.find(t => t._biz === b._id);
        let item = {
          $biz: b,
          $dep: this.depData.find(t => t._id === b.dep)
        };
        if (r) {
          item.isChecked = true;
          item.$staff = this.staffData.find(t => t._id === r.staff);
          item.$risk = r;
        } else {
          item.isChecked = false;
        }
        riskList.push(item);
      });
      this.riskData = riskList;

      this.loading = false;
    },

    getResultType(lv) {
      return ["info", "success", "success", "warning", "danger"][lv];
    }
  },

  computed: {
    riskYears() {
      let t = [];
      for (
        let year = new Date().getFullYear();
        year > new Date().getFullYear() - 8;
        year--
      ) {
        t.push(year);
      }

      return t;
    },

    tableData() {
      let tableData = this.riskData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.$biz.name.includes(searchText) ||
            t.$staff.name.includes(searchText) ||
            t.$dep.name.includes(searchText) ||
            t.level.includes(searchText)
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
  }
};
</script>

<style lang="scss" scoped>
</style>
