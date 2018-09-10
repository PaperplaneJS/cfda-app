<template>
  <div id="daily_singlemonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">{{planTitle}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/monitor/${taskID}`">{{taskTitle}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentDetail.biz.name}} (报告页)</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="main">
      <div class="title">
        <h3>江苏省苏州市常熟市{{$store.state.gridarea.findArea(currentDetail.biz.area).name}}食品药品监督管理局</h3>
        <h1>食品生产经营日常监督检查结果记录表</h1>
        <p>编号:{{currentDetail.num}}</p>
      </div>

      <table>
        <tr>
          <td class="label">名称:</td>
          <td>{{currentDetail.biz.name}}</td>
          <td class="label">地址:</td>
          <td>{{currentDetail.biz.address}}</td>
        </tr>
        <tr>
          <td class="label">联系人:</td>
          <td>{{currentDetail.biz.contact}}</td>
          <td class="label">联系方式:</td>
          <td>{{currentDetail.biz.tel}}</td>
        </tr>
        <tr>
          <td class="label">许可证编号:</td>
          <td>{{currentDetail.biz.licence?currentDetail.biz.licence.code:""}}</td>
          <td class="label">检查次数:</td>
          <td>本年度第{{currentDetail.yearcount}}次检查</td>
        </tr>
        <tr>
          <td class="content" colspan="4">
            <p>检查内容：</p>
            <p>江苏省苏州市常熟市{{departmentName}}食品药品监督管理局检查人员{{staffName[0]}}、{{staffName[1]}}根据《中华人民共和国食品安全法》及其实施条例、《{{templateTitle}}》的规定，于{{currentDetail.date}}对你单位进行了监督检查。本次监督检查按照表《{{templateTitle}}》开展，共检查了{{currentDetail.content.length}}项内容。其中:
            </p>
            <p>
              重点项{{checkCount}}项，项目序号分别是：{{getResult.important.num.join(", ")}} ；发现问题{{getResult.important.problem.length}}项，项目序号分别是：{{getResult.important.problem.join(", ")}} 。
            </p>
            <p>
              一般项{{checkCount}}项，项目序号分别是：{{getResult.normal.num.join(", ")}} ；发现问题{{getResult.normal.problem.length}}项，项目序号分别是：{{getResult.normal.problem.join(", ")}} 。
            </p>
          </td>
        </tr>
        <tr>
          <td class="result" colspan="4">
            <p>检查结果：
              <span class="resultselected">
                <span class="check"></span>
                符合</span>
              <span class="resultselected">
                <span class="check checked"></span>
                基本符合</span>
              <span class="resultselected">
                <span class="check"></span>
                不符合</span>
            </p>
            <p>结果处理：
              <span class="resultselected">
                <span class="check"></span>
                通过</span>
              <span class="resultselected">
                <span class="check checked"></span>
                书面限期整改</span>
              <span class="resultselected">
                <span class="check"></span>
                食品生产经营者立即停止食品生产经营活动</span>
            </p>
            <p style="margin-top:10px;">说明：</p>
            <p class="desc">{{currentDetail.desc}}</p>
          </td>
        </tr>
        <tr class="sign">
          <td colspan="2">
            <p>执法人员(签名)：</p>
            <p style="text-align:right;margin-top:90px;">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
          </td>
          <td colspan="2">
            <p>被检查单位意见：</p>
            <p style="margin-top:40px;">法人或责任人意见：</p>
            <p style="text-align:right;margin-top:30px;">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
          </td>
        </tr>
      </table>
    </div>

    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-button type="primary">打印</el-button>
        <router-link :to="$route.path.replace('report','monitor')">
          <el-button style="margin-left:20px;">查看各项详情</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "daily_singlemonitor",

  data() {
    return {
      currentDetail: null,
      taskID: null,
      taskTitle: null,
      planTitle: null,
      templateTitle: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    checkCount() {

    },

    staffName() {
      return [
        this.$store.state.gridmember.find(
          t => t.id == this.currentDetail.staff[0].id
        ).name,
        this.$store.state.gridmember.find(
          t => t.id == this.currentDetail.staff[1].id
        ).name
      ];
    },

    departmentName() {
      return this.$store.state.gridarea.findArea(this.currentDetail.biz.area)
        .name;
    }
  },

  methods: {
    init() {
      let taskid = this.$route.params.taskid;
      let taskrecordid = this.$route.params.taskrecordid;

      this.$store.state.task.forEach(t => {
        let taskItem = t.tasklist.find(ti => ti.id == taskid);
        if (taskItem) {
          this.taskTitle = taskItem.title;
          this.taskID = taskid;
          this.planTitle = this.$store.state.plan.find(
            p => p.id == t.planid
          ).title;
          this.templateTitle = this.$store.state.template.find(
            t => t.id == this.currentPlan.templateid
          ).title;
          this.currentDetail = this.currentTask.detail.find(
            d => d.id == taskrecordid
          );

          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#main {
  width: 700px;
  margin-top: 20px;

  .title {
    h3 {
      font-size: 22px;
      text-align: center;
      font-weight: normal;
      margin: 5px 0;
    }

    h1 {
      text-align: center;
    }

    p {
      text-align: right;
      margin: 5px 0;
      font-size: 15px;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border-collapse: collapse;
      border: 1.5px solid #000;
      padding: 8px 18px;
    }

    .label {
      width: 90px;
    }

    .content {
      p {
        margin: 10px 0;
        text-indent: 30px;

        &:first-child {
          text-indent: 0;
        }
      }
    }

    .result {
      p {
        margin: 0;
      }
      .resultselected {
        margin-right: 10px;
      }
      .check {
        width: 8px;
        height: 8px;
        border: 1px solid #000;
        display: inline-block;
      }
      .checked {
        background-color: #000;
      }
      .desc {
        text-indent: 30px;
        min-height: 140px;
      }
    }

    .sign {
      p {
        margin: 0;
      }
    }
  }
}
</style>
