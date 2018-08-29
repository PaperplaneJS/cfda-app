<template>
  <div id="special_singlemonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/report">检查报告</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/special/report/${currentReport.plan.id}`">{{currentReport.plan.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentReport.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="main">
      <div class="title">
        <h3>江苏省苏州市常熟市{{currentReport.biz.grid}}食品药品监督管理局</h3>
        <h1>食品生产经营专项监督检查结果记录表</h1>
        <p>编号:{{currentReport.num}}</p>
      </div>

      <table>
        <tr>
          <td class="label">名称:</td>
          <td>{{currentReport.biz.name}}</td>
          <td class="label">地址:</td>
          <td>{{currentReport.biz.address}}</td>
        </tr>
        <tr>
          <td class="label">联系人:</td>
          <td>{{currentReport.biz.contact}}</td>
          <td class="label">联系方式:</td>
          <td>{{currentReport.biz.tel}}</td>
        </tr>
        <tr>
          <td class="label">许可证编号:</td>
          <td>{{currentReport.biz.code}}</td>
          <td class="label">检查次数:</td>
          <td>本年度第{{currentReport.count}}次检查</td>
        </tr>
        <tr>
          <td class="content" colspan="4">
            <p>检查内容：</p>
            <p>江苏省苏州市常熟市{{currentReport.biz.grid}}食品药品监督管理局检查人员{{currentReport.staff}}根据《中华人民共和国食品安全法》及其实施条例、《食品生产经营专项监督检查管理办法》的规定，于{{currentReport.date}}对你单位进行了监督检查。本次监督检查按照表{{currentReport.checkContent}}开展，共检查了{{getResult.count}}项内容。其中:
            </p>
            <p>
              重点项{{getResult.important.count}}项，项目序号分别是：{{getResult.important.num.join(", ")}} ；发现问题{{getResult.important.problem.length}}项，项目序号分别是：{{getResult.important.problem.join(", ")}} 。
            </p>
            <p>
              一般项{{getResult.normal.count}}项，项目序号分别是：{{getResult.normal.num.join(", ")}} ；发现问题{{getResult.normal.problem.length}}项，项目序号分别是：{{getResult.normal.problem.join(", ")}} 。
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
            <p class="desc">{{currentReport.desc}}</p>
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
  name: "special_singlemonitor",
  data() {
    return {
      currentReport: null
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;
    let reportid = this.$route.params.reportid;

    let plan = {};
    if (planid === "1") {
      plan = {
        name: "虞山分局2018年下半年巡检计划",
        staff: "张强",
        kind: "专项检查",
        date: "2018-05-01",
        id: 1
      };
    }

    if (reportid === "1") {
      this.currentReport = {
        title: "东南大道麦当劳DT餐厅",
        num: "10002383",
        count: 1,
        plan,
        task: {
          title: "食品生产场所检查任务",
          staff: "张小明",
          date: "2018-07-01",
          id: 1
        },
        checkContent: "食品生产专项监督检查要点表",
        biz: {
          name: "东南大道麦当劳DT餐厅",
          contact: "王小明",
          tel: "13872663110",
          address: "东南开发区东南大道",
          code: "CS-012-3827388",
          grid: "虞山镇"
        },
        date: "2018-07-01",
        staff: "顾小华",
        department: "综合办公室",
        result: "基本符合",
        handle: "责令整改",
        desc: "整改期限3个月",
        checkdetail: {
          "一、场所环境": [
            {
              num: 1,
              check:
                "生产加工场所周围25米内无虫害大量孳生的潜在场所；无有害废弃物以及粉尘、有害气体、放射性物质和其他扩散性污染源等有毒有害及潜在污染源；各类污染源难以避开时应当有必要的防范措施，有效清除污染源造成的影响。",
              result: "基本符合",
              point: 5,
              remark: "附近有鱼塘，昆虫较多",
              isimportant: true
            },
            {
              num: 2,
              check:
                "生产加工场所应当环境整洁、平整无积水，不得散发出异味,不得有各种杂物堆放；道路应当铺设混泥土、沥青或者其他硬质材料；垃圾应当密闭式存放，并远离生产区，排污沟渠也应为密闭式。",
              result: "符合",
              point: 10,
              remark: null,
              isimportant: true
            },
            {
              num: 3,
              check:
                "生活区、生产区应当相互隔离；生产区内不得饲养家禽、家畜；不得设立坑式厕所。",
              result: "符合",
              point: 10,
              remark: null,
              isimportant: false
            }
          ],
          "二、布局": [
            {
              num: 4,
              check:
                "生产加工场所的面积和空间应当与生产能力相适应，便于设备安置、消毒清洁、物料存储及人员操作。",
              result: "基本符合",
              point: 10,
              remark: null,
              isimportant: false
            },
            {
              num: 5,
              check:
                "按照生产工艺的先后次序和产品特点合理布局，设立原辅料、生产、成品等功能间，按序排列生产设备。",
              result: "不符合",
              point: 0,
              remark: null,
              isimportant: true
            }
          ]
        }
      };

      this.title = this.currentReport.title;
    }
  },
  computed: {
    getResult() {
      let resultobj = {
        count: 0,
        important: {
          count: 0,
          num: [],
          problem: []
        },
        normal: {
          count: 0,
          num: [],
          problem: []
        }
      };

      Object.entries(this.currentReport.checkdetail).forEach(
        ([checkItemName, checkDetail]) => {
          checkDetail.forEach(detail => {
            if (detail.result) {
              resultobj.count += 1;

              let counter = detail.isimportant
                ? resultobj.important
                : resultobj.normal;

              counter.count += 1;
              counter.num.push(detail.num);
              if (detail.result === "不符合") {
                counter.problem.push(detail.num);
              }
            }
          });
        }
      );

      return resultobj;
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
