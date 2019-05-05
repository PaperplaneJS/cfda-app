<template>
  <el-row id="plan_recive">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/recive">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>计划接收</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title action">计划接收</el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table v-loading="loading" :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" sortable min-width="180px"></el-table-column>
          <el-table-column label="计划类别" align="center" sortable>
            <template slot-scope="scope">
              <el-tag :type="getKindType(scope.row.kind)" size="small">{{planKind(scope.row.kind)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="$staff.name" label="制定人员" sortable></el-table-column>
          <el-table-column prop="$dep.name" label="制定单位" sortable></el-table-column>
          <el-table-column prop="postdate" label="下发日期" sortable align="center"></el-table-column>
          <el-table-column label="执行期限" align="center">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" sortable>
            <template slot-scope="scope">
              <el-tag size="small">{{planState(scope.row.state)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="()=>{currentPlan=scope.row;isPopup=true;}"
                size="mini"
                type="primary"
              >查看和接收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        @size-change="t=>planTable.pageSize=t"
        :current-page.sync="planTable.page"
        :page-sizes="planTable.pageSizes"
        :page-size="planTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="planData.length"
      ></el-pagination>
    </el-row>

    <el-dialog title="查看和接收计划" v-if="isPopup" :visible.sync="isPopup">
      <el-form id="popup" label-position="left" label-width="140px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="计划标题:">
              <el-input v-model="currentPlan.title" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="制定科室:">
              <el-input v-model="currentPlan.$dep.name" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="制定人员:">
              <el-input v-model="currentPlan.$staff.name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="制定日期:">
              <el-date-picker
                style="width:100%;"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                readonly
                type="datetime"
                v-model="currentPlan.date"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="计划类别:">
              <el-input :value="planKind(currentPlan.kind)" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="下发日期:">
              <el-date-picker
                style="width:100%;"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                readonly
                type="date"
                v-model="currentPlan.postdate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用模板：">
              <el-input :value="currentPlan.template.name" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="执行期限:">
              <el-date-picker
                style="width:100%;"
                v-model="currentPlan.limit"
                readonly
                type="daterange"
                range-separator="至"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input
                v-model="currentPlan.remark"
                resize="none"
                :rows="4"
                type="textarea"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="currentPlan.kind==='special'">
          <el-col :span="24">
            <el-form-item label="专项通告:">
              <el-input
                v-model="currentPlan.special"
                resize="none"
                :rows="4"
                type="textarea"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item :label="`辖区内单位(${bizData.length}):`">
              <el-tag
                style="margin:5px;"
                size="small"
                :type="item.state===1?'primary':'danger'"
                v-for="item in bizData"
                :key="item._id"
              >{{item.name}}</el-tag>
              <el-tag
                style="margin:5px;"
                size="small"
                type="info"
                v-if="bizData.length<=0"
              >没有单位</el-tag>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="()=>{isPopup=false;currentPlan=null}">取消</el-button>
        <el-button @click="acceptPlan" icon="el-icon-check" type="primary">确定接收</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { plan, planState, planKind } from "@/api/plan.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";
import { biz } from "@/api/biz.js";
import { copy, datetime } from "@/utils/utils.js";

export default {
  name: "plan_recive",

  data() {
    return {
      isPopup: false,
      currentPlan: null,

      loading: true,

      planData: [],
      depData: [],
      staffData: [],
      bizData: [],

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
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      let bizList = (await biz()).data;
      this.bizData = bizList.filter(biz =>
        this.depData
          .find(t => t._id === biz.dep)
          ._rel.includes(this.$store.state.currentUser.dep)
      );

      let planList = (await plan(
        null,
        `recive=${this.$store.state.currentUser.dep}`
      )).data;
      planList.forEach(plan => {
        plan.$staff = this.staffData.find(t => t._id === plan.staff);
        plan.$dep = this.depData.find(t => t._id === plan.dep);
      });

      this.planData = planList;

      this.loading = false;
    },

    async acceptPlan() {
      let current = copy(this.currentPlan);
      delete current["$staff"];
      delete current["$dep"];

      current.recive.push({
        dep: this.$store.state.currentUser.dep,
        date: datetime(),
        biz: this.bizData.map(t => t._id)
      });

      await plan(current);
      this.isPopup = false;
      this.currentPlan = null;

      await this.init();
    },

    getKindType(kind) {
      return {
        daily: "primary",
        special: "warning",
        risk: "danger"
      }[kind];
    }
  },

  computed: {
    pageData() {
      return this.planData.slice(
        (this.planTable.page - 1) * this.planTable.pageSize,
        this.planTable.page * this.planTable.pageSize
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#popup {
  .el-row {
    margin-bottom: 0;
  }
}
</style>

