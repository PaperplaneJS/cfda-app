<template>
  <div id="daily_monitorlist">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <el-input clearable placeholder="搜索单位名称/结果等" prefix-icon="el-icon-search"></el-input>
      </el-col>

      <el-col :span="10">
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
        <el-table :data="monitordata" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
          <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
          <el-table-column prop="staff" label="执法人员" sortable></el-table-column>
          <el-table-column prop="kind" label="监督检查类别"></el-table-column>
          <el-table-column prop="date" label="检查时间" sortable></el-table-column>
          <el-table-column label="检查结果">
            <template slot-scope="scope">
              <el-tag :type="getResultType(scope.row.result)">{{scope.row.result}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="处理方式">
            <template slot-scope="scope">
              <el-tag :type="getResultType(scope.row.handle)">{{scope.row.handle}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="rectify" label="是否整改">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.rectify!==null" :type="scope.row.rectify?'success':'warning'">{{scope.row.rectify?"是":"否"}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="review" label="是否复查">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.review!==null" :type="scope.row.review?'success':'warning'">{{scope.row.review?"是":"否"}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="action" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button @click.native="$router.push($route.path+'/'+scope.row.id)" size="mini" type="primary">查看和编辑</el-button>
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
  name: "daily_monitorlist",
  data() {
    return {
      title: null,
      currentPlan: null,
      monitordata: [
        {
          id: 1,
          date: "2018-08-01 12:00",
          bizname: "东南大道麦当劳DT餐厅",
          staff: "张小明",
          kind: "日常检查",
          rectify: null,
          review: null,
          handle: "通知整改",
          result: "基本符合"
        },
        {
          id: 2,
          date: "2018-08-02 12:00",
          bizname: "娇娇饭店(东南理工分店)",
          staff: "张小明",
          kind: "日常检查",
          rectify: null,
          review: null,
          handle: "停业整顿",
          result: "不符合"
        }
      ]
    };
  },
  beforeMount() {
    let planid = this.$route.params.monitorid;
    if (planid === "1") {
      this.currentPlan = {
        title: "常熟市2018年下半年巡检计划",
        kind: "日常检查",
        date: "2018-05-01",
        limit: ["2018-06-01", "2018-12-01"],
        desc: "请按照检查要点表和相关法规执行",
        remark: "完成后及时上报结果"
      };

      this.title = this.currentPlan.title;
    }
  },

  methods: {
    getResultType(text) {
      switch (text) {
        case "基本符合":
        case "通知整改":
          return "warning";

        case "符合":
        case "通过":
          return "success";

        case "不符合":
        case "停业整顿":
          return "danger";
      }
    }
  }
};
</script>