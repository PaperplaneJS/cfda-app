<template>
  <div id="rectify_rectify">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/rectify">整改管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">整改管理</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索单位名称/区域/分值/评定单位人员等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="8">
        <el-date-picker type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
        </el-date-picker>
      </el-col>

      <el-col :span="6">
        <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
        <el-button round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="rectifydata" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column prop="staff" label="执法人员" sortable></el-table-column>
          <el-table-column prop="kind" label="监督检查类别"></el-table-column>
          <el-table-column label="检查结果">
            <template slot-scope="scope">
              <el-tag>{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="当前状态">
            <template slot-scope="scope">
              <el-tag>{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否复查">
            <template slot-scope="scope">
              <el-tag>{{scope.row.review?"是":"否"}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="复查结果">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.reviewresult">{{scope.row.reviewresult}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="action" label="操作" min-width="70px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('rectify/'+scope.row.id)" size="mini" type="primary">查看 / 编辑</el-button>
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
  name: "rectify_rectify",
  data() {
    return {
      rectifydata: [
        {
          id: 1,
          kind: "special",
          date: "2018-08-01 12:00",
          bizname: "东南大道麦当劳DT餐厅",
          staff: "张小明",
          kind: "日常检查",
          rectify: true,
          review: false,
          reviewresult: null,
          state: "已通知整改",
          result: "责令整改"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
