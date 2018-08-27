<template>
  <div id="special_notice">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/notice">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item>专项检查通知</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">专项检查通知</el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="noticedata" size="medium" stripe style="width: 100%;margin-top:20px;" border>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="staff" label="制定人员" sortable width="140"></el-table-column>
          <el-table-column prop="department" label="所属单位" sortable></el-table-column>
          <el-table-column prop="limit" label="执行期限"></el-table-column>
          <el-table-column prop="state" label="状态" sortable width="120"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('/special/post/'+scope.row.id)" size="mini" type="primary">查看和接收</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "special_notice",
  data() {
    return {
      noticedata: [
        {
          id: 1,
          title: "虞山分局肉类食品加工专项检查计划",
          staff: "张小明",
          department: "常熟市市局",
          limit: "2018-06-01 ~ 2018-12-01",
          state: "待分配"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>