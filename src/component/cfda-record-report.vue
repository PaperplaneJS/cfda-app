<template>
  <div>
    <div id="report_main">
      <div class="title">
        <h3>{{province}}{{city}}{{getAreaByID(record.biz.area).name}}食品药品监督管理局</h3>
        <h1>食品生产经营日常监督检查结果记录表</h1>
        <p>编号:{{record.num}}</p>
      </div>

      <table>
        <tr class="info">
          <td class="label">名称:</td>
          <td>{{record.biz.name}}</td>
          <td class="label">地址:</td>
          <td>{{record.biz.com_address}}</td>
        </tr>
        <tr class="info">
          <td class="label">联系人:</td>
          <td>{{record.biz.contact}}</td>
          <td class="label">联系方式:</td>
          <td>{{record.biz.phone}}</td>
        </tr>
        <tr class="info">
          <td class="label">许可证编号:</td>
          <td>{{record.biz.lic?record.biz.lic.code:""}}</td>
          <td class="label">检查次数:</td>
          <td>{{record.yearcount?`本年度第${record.yearcount}次检查`:``}}</td>
        </tr>
        <tr>
          <td class="content" colspan="4">
            <p>检查内容：</p>
            <p>{{province}}{{city}}{{record.$dep.name}}食品药品监督管理局检查人员{{staffName[0]}}、{{staffName[1]}}根据《中华人民共和国食品安全法》及其实施条例、《{{currentTemplate.name}}》的规定，于{{record.date}}对你单位进行了监督检查。本次监督检查按照表《{{currentTemplate.name}}》开展，共检查了{{record.content.length}}项内容。其中:</p>
            <p>重点项{{checkItems[0].length}}项，项目序号分别是：{{checkItems[0].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[0].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[0].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。</p>
            <p>一般项{{checkItems[1].length}}项，项目序号分别是：{{checkItems[1].map(t=>t.num).join(", ")}} ；发现问题{{checkItems[1].filter(t=>!t.checked).length}}项，项目序号分别是：{{checkItems[1].filter(t=>!t.checked).map(t=>t.num).join(", ")}} 。</p>
          </td>
        </tr>
        <tr>
          <td class="result" colspan="4">
            <p>
              检查结果：
              <span class="resultselected">
                <span :class="{'checked':record.result===1}"></span>
                符合
              </span>
              <span class="resultselected">
                <span :class="{'checked':record.result===2}"></span>
                基本符合
              </span>
              <span class="resultselected">
                <span :class="{'checked':record.result===3}"></span>
                不符合
              </span>
            </p>
            <p>
              结果处理：
              <span class="resultselected">
                <span :class="{'checked':record.handle===1}"></span>
                通过
              </span>
              <span class="resultselected">
                <span :class="{'checked':record.handle===2}"></span>
                书面限期整改
              </span>
              <span class="resultselected">
                <span :class="{'checked':record.handle===3}"></span>
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
            <p
              style="text-align:right;margin-top:90px;"
            >年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
          </td>
          <td colspan="2">
            <p>被检查单位意见：</p>
            <p style="margin-top:40px;">法人或责任人意见：</p>
            <p
              style="text-align:right;margin-top:30px;"
            >年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { copy } from "@/utils/utils.js";

export default {
  name: "cfda-record-report",
  props: ["content"],
  data() {
    return {
      province: process.env.VUE_APP_PROVINCE_NAME,
      city: process.env.VUE_APP_CITY_NAME,
      record: {}
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      this.record = this.content;
    }
  }
};
</script>

<style lang="scss" scoped>
#report_main {
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

