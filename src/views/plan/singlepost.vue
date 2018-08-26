<template>
  <div id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">分发计划</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划标题:">
            <el-input v-model="currentPlan.title" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="计划类别:">
            <el-input v-model="currentPlan.kind" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制定日期:">
            <el-date-picker disabled type="date" v-model="currentPlan.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="执行期限:">
            <el-date-picker v-model="currentPlan.limit" disabled type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="检查内容:">
            <el-checkbox style="margin-bottom:10px;" v-for="item in currentPlan.content" :key="item" disabled checked :label="item" border></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="分发给:">
            <el-tree :check-strictly="true" style="margin-bottom:20px;" node-key="id" :default-expanded-keys="[2,3,4]" :data="gridtree" show-checkbox>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">确认分发</el-button>
        <router-link to="/plan/post">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "plan_singleplan",
  data() {
    return {
      title: null,
      currentPlan: null,
      gridtree: [
        {
          label: "常熟市",
          children: [
            {
              id: 2,
              label: "虞山镇",
              children: [
                { label: "虞山分局" },
                { label: "检察大队" },
                { label: "食药监分局" }
              ]
            },
            {
              id: 3,
              label: "梅里",
              children: []
            },
            {
              id: 4,
              label: "赵市",
              children: []
            }
          ]
        }
      ]
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;
    if (planid === "1") {
      this.currentPlan = {
        title: "常熟市2018年下半年巡检计划",
        kind: "日常检查",
        date: "2018-05-01",
        limit: ["2018-06-01", "2018-12-01"],
        content: ["食品生产日常监督检查要点表", "食品销售日常监督检查要点表"]
      };

      this.title = this.currentPlan.title;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
