<template>
  <div id="risk_risk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">风险评级</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">风险管控
      <el-select style="margin-left:15px;" v-model="year" placeholder="请选择年度">
        <el-option v-for="item in allYears" :key="item.value" :label="`${item.label}年度`" :value="item.value">
        </el-option>
      </el-select>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索单位名称/区域/分值/评定单位人员等" prefix-icon="el-icon-search"></el-input>
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
        <el-table :data="riskdata[year]" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="code" label="许可证编号"></el-table-column>
          <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
          <el-table-column prop="kind" label="单位类型" sortable></el-table-column>
          <el-table-column prop="area" label="所属区域" sortable></el-table-column>
          <el-table-column prop="static" label="静态风险分值" sortable></el-table-column>
          <el-table-column prop="active" label="动态风险分值" sortable></el-table-column>
          <el-table-column prop="point" label="风险评分" sortable></el-table-column>
          <el-table-column prop="staff" label="评定人" sortable></el-table-column>
          <el-table-column prop="department" label="评定单位" sortable></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column prop="action" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button @click.native="$router.push('risk/'+scope.row.id)" size="mini" type="primary">查看和编辑</el-button>
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
  name: "risk_risk",
  data() {
    return {
      year: 2018,
      allYears: [
        { label: "2016", value: 2016 },
        { label: "2017", value: 2017 },
        { label: "2018", value: 2018 }
      ],
      riskdata: {
        ["2018"]: [
          {
            id: 1,
            code: "CS-012-552320",
            bizname: "东南大道麦当劳DT餐厅",
            kind: "食品生产",
            area: "虞山镇",
            static: "40",
            active: "80",
            point: "75",
            staff: "张小明",
            department: "虞山食药监分局",
            date: "2018-08-01 12:00"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
