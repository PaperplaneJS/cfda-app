<template>
  <div id="plan_post">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item>计划分发</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">计划分发</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索计划内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="5">
        <el-date-picker type="date" placeholder="按最早日期筛选" v-model="startDate"></el-date-picker>
      </el-col>

      <el-col :span="5">
        <el-date-picker type="date" placeholder="最晚日期" v-model="endDate"></el-date-picker>
      </el-col>

      <el-col :span="8" :lg="6">
        <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
        <el-button round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="plandata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
          <el-table-column prop="date" label="制定时间" width="120"></el-table-column>
          <el-table-column prop="limit" label="执行期限" width="120"></el-table-column>
          <el-table-column prop="state" label="状态" sortable width="120"></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('post/'+scope.row.id)" size="mini" type="primary">分发计划</el-button>
              <el-button size="mini">查看</el-button>
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
  name: "plan_post",
  data() {
    return {
      startDate: null,
      endDate: null,
      plandata: [
        {
          id: 1,
          title: "常熟市2018年下半年巡检计划",
          staff: "张小明",
          department: "常熟市市局",
          date: "2018-06-01",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "待分发"
        }
      ]
    };
  }
};
</script>