<template>
  <el-row id="risk_singlerisk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">量化分级</el-breadcrumb-item>
      <el-breadcrumb-item>{{biz.name}} ({{risk.year}}年度记录)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{biz.name}} ({{risk.year}}年度记录)</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">
        企业单位信息
        <router-link :to="`/base/biz/${biz._id}`">
          <el-button type="text" size="mini">前往查看</el-button>
        </router-link>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="单位名:">
            <el-input :value="biz.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="许可证编号:">
            <el-input :value="biz.lic?biz.lic.code:''" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="负责人:">
            <el-input :value="biz.lic?biz.lic.lawer:''" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位类型:">
            <el-input v-if="biz.kind" :value="bizKind(biz.kind)" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="经营类别:">
            <el-input :value="biz.category" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="联系人:">
            <el-input :value="biz.contact" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="联系电话:">
            <el-input :value="biz.phone" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">量化检查详情</el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="检查人:">
            <el-input v-if="risk.$staff" :value="risk.$staff.name" readonly></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="检查时间:">
            <el-input :value="risk.date" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="使用模板:">
            <el-input :value="template.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="服务类别:">
            <el-select size="medium" v-model="risk.kind" clearable placeholder="选择餐饮服务类别">
              <el-option
                v-for="(name,index) in riskKind()"
                :key="index+1"
                :label="name"
                :value="index+1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <cfda-record-risk-template
            v-if="template.content&&risk.detail"
            @init="()=>{loading=false}"
            v-model="risk.detail"
            :edit="edit"
            :kind="risk.kind"
            :template="template.content"
          ></cfda-record-risk-template>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="!loading" :span="16">
          <el-form-item label="结果统计：">
            <el-tag style="margin:5px;" v-for="(v,k) in resultInfo" :key="k">
              {{k}}：
              <strong>{{v}}</strong>
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-if="!loading" :span="16">
          <el-form-item label="分值统计：">
            <el-tag v-if="pointInfo" style="margin:5px;">
              实得分/应得分：
              <strong>{{pointInfo[0]|format}}/{{pointInfo[1]}}</strong>
            </el-tag>
            <el-tag v-if="pointInfo" style="margin:5px;">
              最终量化得分：
              <strong>{{(pointInfo[0]/pointInfo[1]*100)|format}}</strong>
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="检查结果:">
            <template v-if="edit===true">
              <el-select size="medium" v-model="risk.level" clearable placeholder="检查结果评分为">
                <el-option
                  v-for="(name,index) in riskLv()"
                  :key="index+1"
                  :label="name"
                  :value="index+1"
                ></el-option>
              </el-select>
            </template>
            <template v-if="edit===false">
              <el-tag :type="getLevelType(risk.level)">
                <strong>{{riskLv(risk.level)}}</strong>
              </el-tag>
            </template>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="edit">
        <el-col :span="16">
          <el-form-item label="提交结果：">
            <el-button type="primary" size="small" @click="submit()">提交检查结果</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
import { risk, emptyRisk, riskKind, riskLv } from "@/api/risk.js";
import { biz, bizKind, bizCategory } from "@/api/biz.js";
import { staff } from "@/api/staff.js";
import { plan } from "@/api/plan.js";
import { datetime } from "@/utils/utils.js";

export default {
  name: "risk_singlerisk",

  data() {
    return {
      edit: null,
      loading: true,

      risk: emptyRisk(),
      plan: {},
      biz: {},
      template: {},
      kind: 1,

      riskLv,
      riskKind,
      bizKind,
      bizCategory
    };
  },

  async beforeMount() {
    await this.init();
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.init();
  },

  filters: {
    format(num) {
      return Number(num.toFixed(2));
    }
  },

  methods: {
    async init() {
      this.loading = true;

      const bizId = this.$route.params.bizid;
      const planId = this.$route.params.planid;
      const year = this.$route.params.year;

      this.biz = (await biz(bizId)).data;
      this.plan = (await plan(planId)).data;
      this.template = this.plan.template;

      let r = undefined;
      try {
        r = (await risk(bizId, `plan=${planId}`, `year=${year}`)).data;
      } catch {
        r = undefined;
      }

      if (r) {
        this.risk = r;
        this.risk.$staff = (await staff(this.risk.staff)).data;
      } else {
        this.risk.date = datetime();
        this.risk.staff = this.$store.state.currentUser._id;
        this.risk.$staff = this.$store.state.currentUser;
        this.risk._biz = bizId;
        this.risk._plan = planId;
      }
      this.edit = !r;
    },

    async submit() {
      if (!this.check()) {
        return;
      }

      let result = this.risk;
      let numStr = ((this.pointInfo[0] / this.pointInfo[1]) * 100).toFixed(2);
      result.point = Number(numStr);
      delete result["$staff"];

      this.risk = (await risk(result)).data;
      window.history.go();
    },

    getLevelType(lv) {
      return ["info", "success", "success", "warning", "danger"][lv];
    },

    check() {
      let t = this.template.content;
      let r = this.risk.detail;

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];

          if (item.required) {
            let isCheckOk =
              item.type === 1 &&
              !(
                ![1, 2].includes(result.val) ||
                isNaN(result.point) ||
                result.point === null
              );

            let isPointOk =
              item.type === 3 &&
              !(
                result.point === null ||
                isNaN(result.point) ||
                result.point > 100 ||
                result.point < 0
              );

            if (!isCheckOk && !isPointOk) {
              this.$alert(
                "未通过校验！请确保所有必填项已填写检查结果，且在正确范围内。",
                "出现错误",
                {
                  confirmButtonText: "确定"
                }
              );
              return false;
            }
          }
        }
      }

      if (![1, 2, 3, 4].includes(this.risk.level)) {
        this.$alert(
          "未通过校验！检查项录入完毕后，请选择一个结果评级。",
          "未给出结果级别",
          {
            confirmButtonText: "确定"
          }
        );
        return false;
      }

      return true;
    }
  },

  computed: {
    resultInfo() {
      if (this.loading) {
        return null;
      }

      let t = this.template.content;
      let r = this.risk.detail;
      let k = this.risk.kind;
      let record = {};

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];
          if (!item.val[k] || isNaN(result.point)) {
            continue;
          }

          if (item.type === 1) {
            record["是"] = record["是"] ? record["是"] : 0;
            record["否"] = record["否"] ? record["否"] : 0;

            record["是"] += result.val === 1 && !isNaN(result.point) ? 1 : 0;
            record["否"] += result.val === 2 && !isNaN(result.point) ? 1 : 0;
          }
          if (item.type === 3) {
            record["主观评分"] = record["主观评分"] ? record["主观评分"] : 0;

            record["主观评分"] += !isNaN(result.point) ? 1 : 0;
          }
        }
      }

      return record;
    },

    pointInfo() {
      if (this.loading) {
        return null;
      }

      let t = this.plan.template.content;
      let r = this.risk.detail;
      let k = this.risk.kind;

      let point = 0,
        all = 0;

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];
          let cent = item.val[k];

          if (!item.val[k]) {
            continue;
          }

          if (
            item.type === 1 &&
            ((!isNaN(result.point) && result.val) || item.required)
          ) {
            all += cent;
            if (result.val && !isNaN(result.point)) {
              point += (result.point * cent) / 100;
            }
          }

          if (
            item.type === 3 &&
            ((!isNaN(result.point) && result.point !== null) || item.required)
          ) {
            all += cent;
            if (!isNaN(result.point)) {
              point += (result.point * cent) / 100;
            }
          }
        }
      }

      if (all === 0) {
        return null;
      }
      return [point, all];
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
