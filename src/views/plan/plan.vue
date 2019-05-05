<template>
  <el-row id="plan_plan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有计划</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">查看与制定检查计划</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="2">
        <router-link to="/plan/new">
          <el-button type="primary" size="small" icon="el-icon-plus">制定新的计划</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          clearable
          size="small"
          v-model="search.text"
          placeholder="搜索计划内容/标题/来源等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="4">
        <el-select size="small" clearable v-model="search.state" placeholder="按状态筛选">
          <el-option
            v-for="(name,index) in planState()"
            :key="index+1"
            :label="name"
            :value="index+1"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="small" clearable v-model="search.kind" placeholder="按类别筛选">
          <el-option v-for="(v,k) in planKind()" :label="v" :value="k" :key="k"></el-option>
        </el-select>
      </el-col>

      <el-col :span="6">
        <el-date-picker
          size="small"
          clearable
          v-model="search.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="制定日期范围"
          end-placeholder="截止"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table v-loading="loading" :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" min-width="120px" sortable></el-table-column>
          <el-table-column label="类别" align="center" sortable>
            <template slot-scope="scope">
              <el-tag :type="getKindType(scope.row.kind)" size="small">{{planKind(scope.row.kind)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="$staff.name" label="制定人" sortable></el-table-column>
          <el-table-column prop="$dep.name" label="制定单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定日期" sortable align="center"></el-table-column>
          <el-table-column label="执行期限" align="center">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag
                size="mini"
                :type="getStateType(scope.row.state)"
              >{{planState(scope.row.state)}}</el-tag>
              <el-popover
                v-if="scope.row.state!==1"
                placement="top-start"
                title="分发情况"
                width="600"
                trigger="hover"
              >
                <table>
                  <tr>
                    <td>
                      <strong>已接收单位：</strong>
                    </td>
                    <td>
                      <template v-if="scope.row.recive.length>0">
                        <el-tag
                          v-for="d in scope.row.recive"
                          :key="d.dep"
                          size="mini"
                          type="primary"
                          style="margin:5px;"
                        >{{getDepName(d.dep)}} | {{d.date}}</el-tag>
                      </template>
                      <el-tag v-else size="mini" type="info" style="margin:5px;">无</el-tag>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>未接收单位：</strong>
                    </td>
                    <td>
                      <template v-if="norecive(scope.row).length>0">
                        <el-tag
                          v-for="d in norecive(scope.row)"
                          :key="d.staff"
                          size="mini"
                          type="warning"
                          style="margin:5px;"
                        >{{getDepName(d)}}</el-tag>
                      </template>
                      <el-tag v-else size="mini" type="info" style="margin:5px;">无</el-tag>
                    </td>
                  </tr>
                </table>
                <el-button
                  type="text"
                  size="small"
                  slot="reference"
                >接收/分发：{{scope.row.recive.length}}/{{scope.row.post.length}}</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button
                @click="$router.push(`/plan/${scope.row._id}`)"
                size="mini"
                type="primary"
              >查看 / 编辑</el-button>
              <el-button
                @click="deleteDialog=scope.row"
                :disabled="scope.row.state!==1"
                size="mini"
                type="danger"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        @size-change="t=>planTable.pageSize=t"
        background
        :current-page.sync="planTable.page"
        :page-sizes="planTable.pageSizes"
        :page-size="planTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>

    <el-dialog title="确认删除" v-if="deleteDialog" :visible="true" width="30%">
      <span>确定要删除检查计划 {{deleteDialog.name}} 吗？</span>
      <br>
      <span>只有待分发状态的计划可以删除。此操作无法复原。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog=null" type="normal">取消</el-button>
        <el-button @click="deletePlan()" type="danger">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { plan, del, planState, planKind } from "@/api/plan.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";

export default {
  name: "plan_plan",

  data() {
    return {
      planData: [],
      staffData: [],
      depData: [],

      loading: true,
      deleteDialog: null,

      search: {
        text: "",
        kind: "",
        state: "",
        daterange: []
      },
      planTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      planState,
      planKind
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      this.loading = true;

      let planList = (await plan()).data;
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      planList.forEach(plan => {
        plan.$dep = this.depData.find(t => t._id === plan.dep);
        plan.$staff = this.staffData.find(t => t._id === plan.staff);
      });
      this.planData = planList;

      this.loading = false;
    },

    async deletePlan() {
      if (!this.deleteDialog) {
        return;
      }
      await del(this.deleteDialog._id);
      this.deleteDialog = null;
      this.init();
    },

    getDepName(depId) {
      return this.depData.find(t => t._id === depId).name;
    },

    norecive(plan) {
      if (!plan.recive) {
        return [];
      }
      let reciveDepIds = plan.recive.map(t => t.dep);
      return plan.post.filter(t => !reciveDepIds.includes(t));
    },

    getStateType: state =>
      ["info", "warning", "primary", "primary", "success", "", ""][state],

    getKindType(kind) {
      return {
        daily: "primary",
        special: "warning",
        risk: "danger"
      }[kind];
    }
  },

  computed: {
    tableData() {
      let tableData = this.planData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.title.includes(searchText) ||
            t.$dep.name.includes(searchText) ||
            t.$staff.name.includes(searchText)
        );
      }

      if (this.search.kind && this.search.kind != "") {
        tableData = tableData.filter(t => t.kind === this.search.kind);
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state === this.search.state);
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
        (this.planTable.page - 1) * this.planTable.pageSize,
        this.planTable.page * this.planTable.pageSize
      );
    }
  }
};
</script>

