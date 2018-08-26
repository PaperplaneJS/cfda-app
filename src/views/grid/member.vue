<template>
  <div id="grid_member">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/member">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>网格人员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">网格人员管理</el-row>
    <el-row :gutter="15">
      <el-col :span="5" :lg="3">
        <router-link to="area/new">
          <el-button type="primary" icon="el-icon-plus">新增网格人员</el-button>
        </router-link>
      </el-col>
      <el-col :span="6">
        <el-input clearable placeholder="搜索姓名/岗位/单位名等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="5">
        <el-cascader :options="griddata" placeholder="按网格筛选" change-on-select></el-cascader>
      </el-col>

      <el-col :span="8" :lg="6">
        <el-button icon="el-icon-search" type="primary" round>查找...</el-button>
        <el-button round>重置</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table :data="memberdata" size="medium" stripe style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80"></el-table-column>
          <el-table-column prop="nme" label="人员姓名" sortable></el-table-column>
          <el-table-column prop="sex" label="性别" sortable width="80"></el-table-column>
          <el-table-column prop="department" label="网格类型" sortable></el-table-column>
          <el-table-column prop="kind" label="网格类型" sortable></el-table-column>
          <el-table-column prop="role" label="岗位类别" sortable></el-table-column>
          <el-table-column prop="job" label="职务" sortable></el-table-column>
          <el-table-column prop="action" label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">查看</el-button>
              <el-button size="mini">编辑</el-button>
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
  name: "grid_member",
  data() {
    return {
      memberdata: [
        {
          name: "王小明",
          sex: "男",
          department: "虞山镇食药监局",
          role: "食品药品监管人员",
          kind: "二级网格",
          job: "科员"
        }
      ],
      griddata: [
        {
          value: "常熟市",
          label: "常熟市",
          children: [
            {
              value: "虞山镇",
              label: "虞山镇",
              children: [
                {
                  value: "食药监分局",
                  label: "食药监分局"
                }
              ]
            },
            {
              value: "梅里镇",
              label: "梅里镇",
              children: [
                {
                  value: "食药监大队",
                  label: "食药监大队"
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
