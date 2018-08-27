<template>
  <div id="sms_list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms/list">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息列表</el-row>
    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索消息内容/标题/来源等" prefix-icon="el-icon-search"></el-input>
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
        <el-table :data="smsdata" size="medium" stripe style="width: 100%" border>
          <el-table-column prop="num" label="序号" width="120"></el-table-column>
          <el-table-column prop="title" label="标题" sortable></el-table-column>
          <el-table-column prop="origin" label="来源" sortable width="200"></el-table-column>
          <el-table-column prop="date" label="时间" width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看</el-button>
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
  name: "sms_list",
  data() {
    return {
      smsdata: [
        {
          num: 1,
          title: "关于餐饮行业加强检查工作的通知",
          origin: "虞山分局",
          date: "2016-08-01"
        }
      ]
    };
  }
};
</script>
