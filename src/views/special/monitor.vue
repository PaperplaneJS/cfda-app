<template>
  <div id="special_monitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/monitor">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查监督</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">专项检查监督</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索检查计划标题/类型等" prefix-icon="el-icon-search"></el-input>
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
        <el-table :data="plandata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="title" label="计划标题" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="指定单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定时间"></el-table-column>
          <el-table-column prop="limit" label="执行期限"></el-table-column>
          <el-table-column label="状态与进度">
            <template slot-scope="scope">
              <div class="progresstip">
                <el-tag size="small">
                  {{scope.row.state}}
                </el-tag>
              </div>
              <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.progress*100"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="60px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('monitor/'+scope.row.id)" type="primary" size="mini">查看记录</el-button>
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
  name: "special_monitor",
  data() {
    return {
      plandata: [
        {
          id: 1,
          title: "常熟市2018年下半年巡检计划",
          staff: "张小明",
          department: "常熟市市局",
          date: "2018-06-01",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "进行中 : 80/150",
          progress: 0.53
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.progresstip {
  margin: 5px 0;
}
</style>
