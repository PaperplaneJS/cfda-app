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
        <el-table :data="plandata" size="medium" style="width: 100%">
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="kind" label="计划类别" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定时间"></el-table-column>
          <el-table-column label="执行期限">
            <template slot-scope="scope">
              {{scope.row.limit[0]}} ~ {{scope.row.limit[1]}}
            </template>
          </el-table-column>
          <el-table-column label="状态" sortable>
            <template slot-scope="scope">
              <el-tag :type="getType(scope.row.state)">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click.native="recivePlan(scope.row)" size="mini" type="primary">查看和接收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </el-row>

    <el-dialog title="查看和接收计划" v-if="isPopup" :visible.sync="isPopup">
      <el-form id="popup" label-position="left" label-width="100px">
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="计划标题:">
              <el-input v-model="popupItem.title" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="制定科室:">
              <el-input v-model="popupItem.department" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="制定人员:">
              <el-input v-model="popupItem.staff" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="计划类别:">
              <el-input v-model="popupItem.kind" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="制定日期:">
              <el-date-picker disabled type="date" v-model="popupItem.date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="执行期限:">
              <el-date-picker v-model="popupItem.limit" readonly type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input v-model="popupItem.remark" resize="none" :rows="4" type="textarea" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="isPopup=false">取消</el-button>
        <el-button @click.native="acceptPlan" type="primary">确定接收</el-button>
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
      plandata: [
        {
          title: "常熟市2018年下半年巡检计划",
          staff: "张小明",
          kind: "日常检查",
          department: "常熟市市局",
          date: "2018-06-01",
          limit: ["2018-06-01", "2018-12-01"],
          state: "待接收",
          remark: "完成后及时上报结果"
        }
      ]
    };
  },

  methods: {
    getType(text) {
      return { ["待接收"]: "warning" }[text];
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

