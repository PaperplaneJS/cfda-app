<template>
  <div id="daily_monitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查监督</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">日常检查监督</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索单位名称/结果等" prefix-icon="el-icon-search"></el-input>
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
        <el-table :data="monitordata" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column prop="bizname" label="单位名称" min-width="300" sortable></el-table-column>
          <el-table-column prop="staff" label="执法人员" sortable></el-table-column>
          <el-table-column prop="kind" label="监督检查类别"></el-table-column>
          <el-table-column prop="rectify" label="是否整改"></el-table-column>
          <el-table-column prop="review" label="是否复查"></el-table-column>
          <el-table-column prop="state" label="记录状态"></el-table-column>
          <el-table-column prop="reviewdate" label="检查时间"></el-table-column>
          <el-table-column prop="result" label="检查结果"></el-table-column>
          <el-table-column prop="action" label="操作" min-width="160">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('monitor/'+scope.row.id)" size="mini" type="primary">查看</el-button>
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
  name: "daily_monitor",
  data() {
    return {
      monitordata: [
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
  }
};
</script>