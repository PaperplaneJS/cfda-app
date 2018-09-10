<template>
  <div id="plan_recive">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/recive">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>计划接收</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">计划接收</el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" sortable min-width="180px"></el-table-column>
          <el-table-column label="计划类别" sortable>
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.kind | planKindText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="制定单位" sortable></el-table-column>
          <el-table-column prop="post" label="下发时间"></el-table-column>
          <el-table-column label="执行期限">
            <template slot-scope="scope">
              <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
              <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag size="small" :type="getPlanType(scope.row.state)">{{scope.row.state | planStateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right" label="操作">
            <template slot-scope="scope">
              <el-button @click.native="recivePlan(scope.row)" size="mini" type="primary">查看和接收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination :current-page.sync="planTable.page" :page-size="planTable.pageSize" background layout="total, prev, pager, next" :total="tableData.length">
      </el-pagination>
    </el-row>

    <el-dialog title="查看和接收计划" v-if="isPopup" :visible.sync="isPopup">
      <el-form id="popup" label-position="left" label-width="100px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="计划标题:">
              <el-input v-model="popupItem.title" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="制定科室:">
              <el-input v-model="popupItem.department" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="制定人员:">
              <el-input v-model="popupItem.staff" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="计划类别:">
              <el-select style="width:100%;" disabled v-model="popupItem.kind">
                <el-option label="日常检查" value="daily"></el-option>
                <el-option label="专项检查" value="special"></el-option>
                <el-option label="全量检查(风险评级)" value="risk"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制定日期:">
              <el-date-picker style="width:100%;" disabled type="datetime" v-model="popupItem.date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="下发日期:">
              <el-date-picker style="width:100%;" disabled type="date" v-model="popupItem.post"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用模板：">
              <el-select disabled style="width:100%;" v-model="popupItem.templateid">
                <el-option v-for="item of taskTemplate" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="执行期限:">
              <el-date-picker v-model="popupItem.limit" disabled type="daterange" range-separator="至">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input v-model="popupItem.remark" resize="none" :rows="4" type="textarea" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="isPopup=false">取消</el-button>
        <el-button @click.native="acceptPlan" icon="el-icon-check" type="primary">确定接收</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "plan_recive",
  data() {
    return {
      isPopup: false,
      popupItem: null,
      planTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {
    planStateText(state) {
      switch (state) {
        case 1:
          return "待分发";
        case 2:
          return "待接收";
        case 3:
          return "执行中";
        case 4:
          return "已完成";
        default:
          return "未知";
      }
    },

    planKindText(kind) {
      switch (kind) {
        case "daily":
          return "日常检查";
        case "special":
          return "专项检查";
        case "risk":
          return "全量检查";
        default:
          return kind;
      }
    }
  },

  computed: {
    tableData() {
      let tableData = this.$store.state.plan.filter(t => t.state === 2);

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.planTable.page - 1) * this.planTable.pageSize,
        this.planTable.page * this.planTable.pageSize
      );
    },

    taskTemplate() {
      return this.$store.state.template.map(t => {
        return { id: t.id, name: t.name };
      });
    }
  },

  methods: {
    getPlanType(state) {
      switch (state) {
        case 1:
          return "warning";
        case 2:
          return "warning";
        case 3:
          return "";
        case 4:
          return "success";
        default:
          return "info";
      }
    },

    acceptPlan() {},

    recivePlan(item) {
      this.popupItem = item;
      this.isPopup = true;
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

