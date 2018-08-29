<template>
  <div id="special_reportlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">检查报告</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.currentPlan.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{this.currentPlan.title}}</el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-table :data="reportdata" size="medium" style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
          <el-table-column prop="staff" label="执法人员" sortable></el-table-column>
          <el-table-column prop="kind" label="检查类别"></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column label="检查结果">
            <template slot-scope="scope">
              <el-tag :type="getResultType(scope.row.result)">{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="handle" label="处理方式">
            <template slot-scope="scope">
              <el-tag :type="getHandleType(scope.row.handle)">{{scope.row.handle}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button @click.native="$router.push($route.path+'/'+scope.row.id)" size="mini" type="primary">查看报告</el-button>
              <el-button size="mini" type="primary">打印</el-button>
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
  name: "special_reportlist",
  data() {
    return {
      currentReport: null,
      reportdata: [
        {
          id: 1,
          date: "2018-08-01 12:00",
          bizname: "东南大道麦当劳DT餐厅",
          staff: "张小明",
          kind: "专项检查",
          result: "符合",
          handle: "通过"
        },
        {
          id: 2,
          date: "2018-08-01 12:00",
          bizname: "东南理工娇娇饭店",
          staff: "张小明",
          kind: "专项检查",
          result: "不符合",
          handle: "立即停止经营"
        },
        {
          id: 3,
          date: "2018-08-01 12:00",
          bizname: "东兴园饭店",
          staff: "张小明",
          kind: "专项检查",
          result: "基本符合",
          handle: "书面限期整改"
        }
      ]
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;
    if (planid === "1") {
      this.currentPlan = {
        title: "虞山分局2018年下半年巡检计划"
      };
    }
  },
  methods: {
    getResultType(text) {
      return {
        ["符合"]:"success",["基本符合"]:"warning",["不符合"]:"danger"
      }[text];
    },
    getHandleType(text) {
      return {
        ["通过"]:"success",["书面限期整改"]:"warning",["立即停止经营"]:"danger"
      }[text];
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
