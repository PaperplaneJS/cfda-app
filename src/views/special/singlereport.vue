<template>
  <el-row id="special_singlereport">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">{{planTitle}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/special/report/${taskID}`">{{taskTitle}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentDetail.biz.name}} (报告页)</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="main">
      <div class="title">
        <h3>江苏省苏州市常熟市{{$store.state.gridarea.findArea(currentDetail.biz.area).name}}食品药品监督管理局</h3>
        <h1>食品生产经营专项监督检查结果记录表</h1>
        <p>编号:{{currentDetail.num}}</p>
      </div>

      <table>
        <tr class="info">
          <td class="label">名称:</td>
          <td>{{currentDetail.biz.name}}</td>
          <td class="label">地址:</td>
          <td>{{currentDetail.biz.address}}</td>
        </tr>
        <tr class="info">
          <td class="label">联系人:</td>
          <td>{{currentDetail.biz.contact}}</td>
          <td class="label">联系方式:</td>
          <td>{{currentDetail.biz.tel}}</td>
        </tr>
        <tr class="info">
          <td class="label">许可证编号:</td>
          <td>{{currentDetail.biz.licence?currentDetail.biz.licence.num:""}}</td>
          <td class="label">检查次数:</td>
          <td>本年度第{{currentDetail.yearcount}}次检查</td>
        </tr>
        <tr>
          <td class="content" colspan="4">
            <p>检查内容：</p>
            <p>江苏省苏州市常熟市{{departmentName}}食品药品监督管理局检查人员{{staffName[0]}}、{{staffName[1]}}根据《中华人民共和国食品安全法》及其实施条例、《{{currentTemplate.name}}》的规定，于{{currentDetail.date}}对你单位进行了监督检查。本次监督检查按照表《{{currentTemplate.name}}》开展，共检查了{{currentDetail.content.length}}项内容。其中:
            </p>
            <p>
              重点项{{checkItems[0].length}}项，项目序号分别是：{{checkItems[0].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[0].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[0].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。
            </p>
            <p>
              一般项{{checkItems[1].length}}项，项目序号分别是：{{checkItems[1].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[1].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[1].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。
            </p>
          </td>
        </tr>
        <tr>
          <td class="result" colspan="4">
            <p>检查结果：
              <span class="resultselected">
                <span :class="{'checked':currentDetail.result=='符合'}"></span>
                符合
              </span>
              <span class="resultselected">
                <span :class="{'checked':currentDetail.result=='基本符合'}"></span>
                基本符合
              </span>
              <span class="resultselected">
                <span :class="{'checked':currentDetail.result=='不符合'}"></span>
                不符合
              </span>
            </p>
            <p>结果处理：
              <span class="resultselected">
                <span :class="{'checked':currentDetail.handle=='通过'}"></span>
                通过
              </span>
              <span class="resultselected">
                <span :class="{'checked':currentDetail.handle=='通知整改'}"></span>
                书面限期整改
              </span>
              <span class="resultselected">
                <span :class="{'checked':currentDetail.handle=='停业整顿'}"></span>
                食品生产经营者立即停止食品生产经营活动
              </span>
            </p>
            <p style="margin-top:10px;">说明：</p>
            <p class="desc"></p>
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
  </el-row>
</template>

<script>
export default {
  name: "special_singlereport",

  data() {
    return {
      currentDetail: null,
      currentTemplate: null,
      taskID: null,
      taskTitle: null,
      planTitle: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    checkItems() {
      let result = [[], []];
      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];
          let checkItem = this.currentDetail.content[`${i + 1}.${j + 1}`];
          if (checkItem) {
            let r = {
              num: `${i + 1}.${j + 1}`,
              checked: checkItem.checked
            };

            if (templateItem.important) {
              result[0].push(r);
            } else {
              result[1].push(r);
            }
          }
        }
      }
      return result;
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

          let plan = this.$store.state.plan.find(p => p.id == t.planid);

          this.planTitle = plan.title;
          this.currentTemplate = this.$store.state.template.find(
            t => t.id == plan.templateid
          );
          let detail = taskItem.detail.find(d => d.id == taskrecordid);
          detail.biz = this.$store.state.biz.find(t => t.id == detail.bizid);
          this.currentDetail = detail;

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
      padding: 5px 8px;
    }

    tr.info {
      td {
        width: 34%;
      }

      .label {
        width: 16%;
      }
    }

    .content {
      p {
        margin: 0 0 8px;
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

        span {
          width: 8px;
          height: 8px;
          border: 1px solid #000;
          display: inline-block;
        }

        .checked {
          background-color: #000;
        }
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
