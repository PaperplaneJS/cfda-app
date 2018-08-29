<template>
  <div id="special_report">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item>检查报告</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">专项检查报告</el-row>

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
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
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
              <el-dropdown>
                <el-button size="mini" type="primary">
                  查看记录
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item of scope.row.task" :key="item.id" @click.native="$router.push('report/'+item.id)">{{item.title}} [{{item.progress}}]</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  name: "special_report",
  data() {
    return {
      reportdata: [
        {
          id: 1,
          title: "虞山分局2018年下半年巡检计划",
          staff: "张小明",
          department: "常熟市市局",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "进行中 : 80/150",
          progress: 0.53,
          task: [
            { id: 1, title: "食品生产场所检查任务", progress: "57/125" },
            { id: 2, title: "小作坊巡查检查任务", progress: "23/25" }
          ]
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
