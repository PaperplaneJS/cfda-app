<template>
  <el-row id="daily_record">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/monitor/${plan._id}`">{{plan.title}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/monitor/${plan._id}/${task._id}`">{{task.title}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{biz.name}} (详情)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{biz.name}} (检查详情)</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="检查计划与任务" name="info">
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
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="检查结果：">
                <template v-if="edit">
                  <el-select size="medium" v-model="current.result" clearable placeholder="选择结果">
                    <el-option
                      v-for="(name,index) in recordResult()"
                      :key="index+1"
                      :label="name"
                      :value="index+1"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-tag size="medium">{{recordResult(current.result)}}</el-tag>
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="处理方式：">
                <template v-if="edit">
                  <el-select size="medium" v-model="current.handle" clearable placeholder="选择处理方式">
                    <el-option
                      v-for="(name,index) in recordHandle()"
                      :key="index+1"
                      :label="name"
                      :value="index+1"
                    ></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-tag size="medium">{{recordHandle(current.handle)}}</el-tag>
                </template>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="检查结果："></el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <cfda-record-template
          v-if="current.detail&&plan.template"
          v-model="current.detail"
          :template="plan.template.content"
          :edit="edit"
        ></cfda-record-template>
      </el-tab-pane>
      <el-tab-pane v-if="!edit" label="检查报告" name="report">
        <!-- <cfda-record-report :data="current"></cfda-record-report> -->
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import {
  record,
  emptyRecord,
  recordResult,
  recordHandle
} from "@/api/record.js";
import { plan, planKind } from "@/api/plan.js";
import { task } from "@/api/task.js";
import { biz } from "@/api/biz.js";
import { datetime } from "@/utils/utils.js";

export default {
  name: "daily_record",

  data() {
    return {
      tab: "info",

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
        this.current.staff1 = this.$store.state.currentUser._id;
        this.current.$staff1 = this.$store.state.currentUser;
        this.current.date = datetime();
      }
    }
  },

  computed: {
    resultInfo() {
      let t = this.plan.template.content;
      let r = this.current.detail[i][j];
      let record = {
        ["是"]: 0,
        ["否"]: 0,
        ["符合"]: 0,
        ["基本符合"]: 0,
        ["不符合"]: 0,
        ["主观评分"]: 0
      };
      for (let i = 0; i < t.length; i++) {
        for (let j = 0; j < t[i].detail.length; j++) {
          let item = t[i].detail[j];
          let result = r[i][j];
          if (!result) {
            continue;
          }

          if (item.type === 1) {
            record["是"] += result == 1;
            record["否"] += result == 2;
          }
          if (item.type === 2) {
            record["符合"] += result == 1;
            record["基本符合"] += result == 2;
            record["不符合"] += result == 3;
          }
          if (item.type === 3) {
            record["主观评分"] += result && result.length && !isNaN(result);
          }
        }
      }

      return record;
    },

    pointInfo() {
      let t = this.plan.template.content;
      let r = this.current.detail[i][j];
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
            point += Math.max(...item.val);
            point += [0, ...item.val][result];
          }
          if (item.type === 2 && item.val) {
            point += Math.max(...item.val);
            point += [0, ...item.val][result];
          }
          if (item.type === 3 && result && result.length && !isNaN(result)) {
            point += result;
          }
        }
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
