<template>
  <div id="rectify_singlerectify">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/rectify">整改管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-row :gutter="20">
      <el-col :span="16">
        <el-collapse style="margin-top:20px;" v-model="collapse">

          <el-collapse-item class="collapse-item" v-for="item of currentRectify.record" :key="item.id" :name="item.id">
            <template slot="title">
              <span style="font-weight:bold">{{item.plan.name}} [{{item.date}}检查记录]</span>
              <el-tag size="mini" style="margin-left:10px;">{{item.state}}</el-tag>
            </template>

            <el-row :gutter="20">
              <el-col :span="16">
                所属检查计划： {{item.plan.name}}
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                计划类别： {{item.plan.kind}}
              </el-col>

              <el-col :span="8">
                计划制定日期： {{item.plan.date}}
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="16">
                所属检查任务： {{item.task.name}}
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                执法人员： {{item.task.staff}}
              </el-col>

              <el-col :span="8">
                检查日期： {{item.date}}]
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                检查结果：
                <el-tag size="mini">{{item.result}}</el-tag>
              </el-col>

              <el-col :span="8">
                处理办法：
                <el-tag size="mini">{{item.handle}}</el-tag>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="16">
                是否复查：
                <el-tag size="mini">{{item.isrecheck?"是":"否"}}</el-tag>
              </el-col>
            </el-row>

            <el-row v-if="item.isrecheck" :gutter="20">
              <el-col :span="8">
                复查日期： {{item.recheckdate}}
              </el-col>

              <el-col :span="8">
                复查结果：
                <el-tag size="mini">{{item.recheckresult}}</el-tag>
              </el-col>
            </el-row>

          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "rectify_singlerectify",
  data() {
    return {
      title: null,
      currentRectify: null,
      collapse: null
    };
  },

  beforeMount() {
    let rectifyid = this.$route.params.rectifyid;
    if (rectifyid === "1") {
      this.currentRectify = {
        biz: {
          name: "东南大道麦当劳DT餐厅",
          contact: "王小明",
          tel: "13872663110",
          address: "东南开发区东南大道",
          code: "CS-012-3827388",
          grid: "虞山镇"
        },
        record: [
          {
            id: 1,
            plan: {
              name: "常熟市2018年下半年巡检计划",
              kind: "日常检查",
              date: "2018-05-01"
            },
            task: {
              name: "食品生产场所检查任务",
              staff: "张小明"
            },
            isrefity: true,
            isrecheck: false,
            recheckdate: null,
            recheckresult: null,
            state: "整改中",
            date: "2018-01-02 13:00",
            result: "基本符合",
            handle: "责令整改"
          },
          {
            id: 2,
            plan: {
              name: "常熟市2018年上半年巡检计划",
              kind: "日常检查",
              date: "2018-02-01"
            },
            task: {
              name: "上半年巡检检查任务",
              staff: "顾小华"
            },
            isrefity: true,
            isrecheck: true,
            recheckdate: "2018-03-03 12:00",
            recheckresult: "符合",
            state: "已整改(+复查)",
            date: "2018-1-2 13:00",
            result: "基本符合",
            handle: "责令整改"
          }
        ]
      };

      this.title = this.currentRectify.biz.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.collapse-item {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
