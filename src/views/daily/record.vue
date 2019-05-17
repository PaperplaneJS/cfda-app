<template>
  <el-row id="daily_record">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/${plan._id}`">{{plan.title}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/${plan._id}/${task._id}`">{{task.title}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{biz.name}} (详情)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{biz.name}} (检查详情)</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="检查计划与任务" name="info">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row style="font-size:18px;margin-bottom:15px;" class="section">
            检查计划相关信息
            <el-button @click="$router.push(`/daily/${plan._id}`)" type="text" size="mini">查看计划</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查计划：">
                <el-input :value="plan.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划类别：">
                <el-input v-if="plan.kind" :value="planKind(plan.kind)" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制定人员：">
                <el-input v-if="plan.__staff" :value="plan.__staff.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划期限：">
                <el-date-picker
                  style="width:100%;"
                  :value="plan.limit"
                  readonly
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="接收日期：">
                <el-date-picker
                  v-if="plan.$recive"
                  style="width:100%;"
                  readonly
                  :value="plan.$recive.date"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  type="datetime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="使用模板：">
                <el-input v-if="plan.template" :value="plan.template.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="计划备注：">
                <el-input :value="plan.remark" :rows="4" readonly type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">
            分派任务详情
            <el-button
              @click="$router.push(`/daily/${plan._id}/${task._id}`)"
              type="text"
              size="mini"
            >查看任务</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="任务标题：">
                <el-input :value="task.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分派日期：">
                <el-date-picker style="width:100%;" readonly :value="task.date" type="datetime"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="任务期限：">
                <el-date-picker
                  style="width:100%;"
                  :value="task.limit"
                  readonly
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="任务描述:">
                <el-input :value="task.desc" :rows="6" type="textarea" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">
            被检查单位信息
            <el-button @click="$router.push(`/base/biz/${biz._id}`)" type="text" size="mini">查看单位</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查单位名：">
                <el-input :value="biz.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="联系人：">
                <el-input :value="biz.contact" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input :value="biz.phone" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="biz.lic">
            <el-col :span="8">
              <el-form-item label="许可证号：">
                <el-input :value="biz.lic.code" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="单位地址：">
                <el-input :value="biz.address" :rows="4" readonly type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="详细结果" name="detail">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row style="font-size:18px;margin-bottom:15px;" class="section">现场检查结果</el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="主检查人：">
                <el-input v-if="current.$staff1" :value="current.$staff1.name" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="current.staff2&&current.$staff2">
              <el-form-item label="协同检查：">
                <el-input :value="current.$staff2.name" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="检查时间：">
                <el-date-picker
                  style="width:100%;"
                  :value="current.date"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyy-MM-dd HH:mm"
                  type="datetime"
                  readonly
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <cfda-record-template
          v-if="current.detail&&plan.template"
          v-model="current.detail"
          :template="plan.template.content"
          :edit="edit"
          @init="loading=false"
        ></cfda-record-template>

        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row style="margin-bottom:35px;" :gutter="20">
            <el-col :span="8">
              <el-form-item label="检查结果：">
                <template v-if="edit">
                  <el-select
                    :readonly="!edit"
                    size="medium"
                    v-model="current.result"
                    clearable
                    placeholder="选择结果"
                  >
                    <el-option
                      v-for="(name,index) in recordResult()"
                      :key="index+1"
                      :label="name"
                      :value="index+1"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-tag :type="getStateType(current.result)">
                    <strong>{{recordResult(current.result)}}</strong>
                  </el-tag>
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="处理方式：">
                <template v-if="edit">
                  <el-select
                    :readonly="!edit"
                    size="medium"
                    v-model="current.handle"
                    clearable
                    placeholder="选择处理方式"
                  >
                    <el-option
                      v-for="(name,index) in recordHandle()"
                      :key="index+1"
                      :label="name"
                      :value="index+1"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-tag :type="getStateType(current.handle)">
                    <strong>{{recordHandle(current.handle)}}</strong>
                  </el-tag>
                </template>
              </el-form-item>
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
                  <strong>{{pointInfo[0]}}/{{pointInfo[1]}}</strong>
                </el-tag>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="!loading">
            <el-col :span="16">
              <el-form-item label="检查说明：">
                <el-input
                  :readonly="!edit"
                  v-model="current.report.remark"
                  :rows="4"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15" v-if="!loading">
            <el-col :span="8">
              <el-form-item label="检查编号：">
                <el-input :readonly="!edit" v-model="current.report.num"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="检查次数：">
                <el-input :readonly="!edit" v-model.number="current.report.count"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="!loading">
            <el-col :span="16">
              <el-form-item :readonly="!edit" label="单位意见：">
                <el-input v-model="current.report.bizopinion" :rows="2" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="!loading">
            <el-col :span="16">
              <el-form-item :readonly="!edit" label="法人意见：">
                <el-input v-model="current.report.laweropinion" :rows="2" type="textarea"></el-input>
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
      </el-tab-pane>

      <el-tab-pane v-if="!edit" label="检查报告" name="report">
        <cfda-record-report v-if="!loading" :current="current" :biz="biz" :task="task" :plan="plan"></cfda-record-report>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import {
  record,
  emptyRecord,
  emptyRecordReport,
  recordResult,
  recordHandle
} from "@/api/record.js";
import { plan, planKind } from "@/api/plan.js";
import { task } from "@/api/task.js";
import { staff } from "@/api/staff.js";
import { biz } from "@/api/biz.js";
import { datetime } from "@/utils/utils.js";

export default {
  name: "daily_record",

  data() {
    return {
      tab: "info",
      loading: true,

      edit: null,
      plan: {},
      task: {},
      biz: {},
      current: {},

      recordResult,
      recordHandle,
      planKind
    };
  },

  async beforeMount() {
    await this.init();
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.init();
  },

  methods: {
    async init() {
      this.loading = true;

      const planId = this.$route.params.planid;
      const taskId = this.$route.params.taskid;
      const bizId = this.$route.params.bizid;

      this.plan = (await plan(planId, "ref=dep+staff")).data;
      this.task = (await task(taskId)).data;
      this.biz = (await biz(bizId)).data;

      this.edit = !this.task.completebiz.includes(bizId);
      this.current = this.edit
        ? emptyRecord()
        : (await record([taskId, bizId])).data;

      this.plan.$recive = this.plan.recive.find(
        t => t.dep === this.$store.state.currentUser.dep
      );

      if (this.edit) {
        this.current._task = taskId;
        this.current._biz = bizId;
        this.current.staff1 = this.$store.state.currentUser._id;
        this.current.date = datetime();
        this.current.report = emptyRecordReport();
      }

      this.$set(
        this.current,
        "$staff1",
        (await staff(this.current.staff1)).data
      );
    },

    check() {
      let t = this.plan.template.content;
      let r = this.current.detail;

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];

          if (item.required) {
            if (
              (item.type === 1 && ![1, 2].includes(result)) ||
              (item.type === 2 && ![1, 2, 3].includes(result)) ||
              (item.type === 3 &&
                (result > item.val[1] || result < item.val[0]))
            ) {
              this.$alert(
                "未通过校验！请确保所有必填项已填写检查结果，确保主观评分在正确范围内。",
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

      if (
        ![1, 2, 3].includes(this.current.result) ||
        ![1, 2, 3].includes(this.current.handle)
      ) {
        this.$alert(
          "未通过校验！检查项录入完毕后，请在页面顶部输入检查结果/处理方式。",
          "未提供检查结果/处理方式",
          {
            confirmButtonText: "确定"
          }
        );
        return false;
      }

      return true;
    },

    async submit() {
      if (!this.check()) {
        return;
      }

      let result = this.current;
      delete result["$staff1"];
      delete result["$staff2"];

      this.current = (await record(result)).data;
      this.edit = false;
      window.history.go();
    },

    getStateType: state => ["info", "success", "warning", "danger"][state]
  },

  computed: {
    resultInfo() {
      if (this.loading) {
        return null;
      }

      let t = this.plan.template.content;
      let r = this.current.detail;
      let record = {};

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];
          if (!result) {
            continue;
          }

          if (item.type === 1) {
            record["是"] = record["是"] ? record["是"] : 0;
            record["否"] = record["否"] ? record["否"] : 0;

            record["是"] += result == 1 ? 1 : 0;
            record["否"] += result == 2 ? 1 : 0;
          }
          if (item.type === 2) {
            record["符合"] = record["符合"] ? record["符合"] : 0;
            record["基本符合"] = record["基本符合"] ? record["基本符合"] : 0;
            record["不符合"] = record["不符合"] ? record["不符合"] : 0;

            record["符合"] += result == 1 ? 1 : 0;
            record["基本符合"] += result == 2 ? 1 : 0;
            record["不符合"] += result == 3 ? 1 : 0;
          }
          if (item.type === 3) {
            record["主观评分"] = record["主观评分"] ? record["主观评分"] : 0;

            record["主观评分"] += !isNaN(result) ? 1 : 0;
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
      let r = this.current.detail;
      let point = 0,
        all = 0;

      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];
          if (!result) {
            continue;
          }

          if (item.type === 1 && item.val) {
            all += Math.max(...item.val);
            point += [0, ...item.val][result];
          }
          if (item.type === 2 && item.val) {
            all += Math.max(...item.val);
            point += [0, ...item.val][result];
          }
          if (item.type === 3 && !isNaN(result)) {
            all += Math.max(...item.val);
            point += result;
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
</style>
