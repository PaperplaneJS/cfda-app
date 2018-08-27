<template>
  <div id="daily_report">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/report">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查报告</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">日常检查报告</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索计划标题/制定单位/指定人等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="10">
        <el-date-picker type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="8" :lg="6">
        <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
        <el-button round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="reportdata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable width="140"></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
          <el-table-column prop="limit" label="执行期限"></el-table-column>
          <el-table-column prop="state" label="状态" sortable width="160"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('report/'+scope.row.id)" type="primary" size="mini">进入查看</el-button>
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
  name: "daily_report",
  data() {
    return {
      reportdata: [
        {
          id: 1,
          title: "虞山分局2018年下半年巡检计划",
          staff: "张小明",
          department: "常熟市市局",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "进行中 70/150"
        }
      ]
    };
  }
};
</script>