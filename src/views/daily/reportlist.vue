<template>
  <div id="daily_reportlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/report">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/report">检查报告</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.currentPlan.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{this.currentPlan.title}}</el-row>
    <el-row  style="margin-top:20px;">
      <el-col :span="4">
        进度(70/150):
      </el-col>
      <el-col :span="10">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="47"></el-progress>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-table :data="reportdata" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column prop="bizname" label="单位名称" width="260" sortable></el-table-column>
          <el-table-column prop="staff" label="执法人员" sortable></el-table-column>
          <el-table-column prop="kind" label="检查类别"></el-table-column>
          <el-table-column prop="rectify" label="是否整改"></el-table-column>
          <el-table-column prop="review" label="是否复查"></el-table-column>
          <el-table-column prop="state" label="记录状态"></el-table-column>
          <el-table-column prop="reviewdate" label="检查时间"></el-table-column>
          <el-table-column prop="result" label="检查结果"></el-table-column>
          <el-table-column prop="action" label="操作" width="240">
            <template slot-scope="scope">
              <el-button @click.native="$router.push($route.path+'/'+scope.row.id)" size="mini" type="primary">查看/编辑</el-button>
              <el-button size="mini" type="primary">打印</el-button>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "daily_reportlist",
  data() {
    return {
      currentReport: null,
      reportdata: [
        {
          id: 1,
          date: "2018-08-01 12:00",
          bizname: "东南大道麦当劳DT餐厅",
          staff: "张小明",
          kind: "日常检查",
          rectify: "是",
          review: "否",
          state: "已通知整改",
          reviewdate: "未复查",
          result: "责令整改"
        }
      ]
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;
    if (planid === "1") {
      this.currentPlan = {
        title: "虞山分局2018年下半年巡检计划"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
