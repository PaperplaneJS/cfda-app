<template>
  <div id="plan_recive">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/recive">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>计划接收</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">计划接收</el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="plandata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定时间" width="120"></el-table-column>
          <el-table-column prop="limit" label="执行期限" width="120"></el-table-column>
          <el-table-column prop="state" label="状态" sortable width="120"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看和接收</el-button>
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
  name: "plan_recive",
  data() {
    return {
      startDate: null,
      endDate: null,
      plandata: [
        {
          title: "常熟市2018年下半年巡检计划",
          staff: "张小明",
          department: "常熟市市局",
          date: "2018-06-01",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "待接收"
        }
      ]
    };
  }
};
</script>

