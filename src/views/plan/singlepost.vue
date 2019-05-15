<template>
  <el-row id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">分发计划</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">
      {{title}}
      <el-button @click="$router.push(`/plan/${current._id}`)" type="text">查看计划</el-button>
    </el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划详情</el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="计划标题：">
            <el-input v-model="current.title" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="计划类别：">
            <el-input :value="planKind(current.kind)" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制定日期：">
            <el-date-picker
              style="width:100%;"
              readonly
              :value="current.date"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="计划制定日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="执行期限：">
            <el-date-picker
              style="width:100%;"
              v-model="current.limit"
              readonly
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="计划标题：">
            <el-input v-model="current.template.name" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="备注：">
            <el-input
              v-model="current.remark"
              :rows="4"
              type="textarea"
              readonly
              placeholder="选填,工作备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="current.kind==='special'">
        <el-col :span="16">
          <el-form-item label="专项通知：">
            <el-input
              v-model="current.special"
              :rows="4"
              type="textarea"
              readonly
              placeholder="专项检查相关通告"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="分发日期：">
            <el-date-picker
              style="width:100%;"
              readonly
              :value="current.postdate"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="计划分发日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:10px;" class="section">分发对象</el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="分发到：" required>
            <el-tree
              @check="checkChange"
              :expand-on-click-node="false"
              ref="depTree"
              v-model="current.post"
              :check-strictly="true"
              :default-expanded-keys="defaultExpanded"
              :props="{label:'name'}"
              style="margin-bottom:20px;margin-top:20px;"
              node-key="_id"
              :data="cascadeDepData"
              show-checkbox
            >
              <span class="custom-tree-node" slot-scope="{ node }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    v-if="!node.isLeaf"
                    type="text"
                    size="mini"
                    @click="node.checked=true"
                  >单个选中</el-button>
                </span>
              </span>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button @click="postPlan" icon="el-icon-check" type="primary">确认分发</el-button>
        <router-link to="/plan/post">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { plan, emptyPlan, planKind } from "@/api/plan.js";
import { dep } from "@/api/dep.js";
import { copy, datetime } from "@/utils/utils.js";

export default {
  name: "plan_singleplan",

  data() {
    return {
      title: null,

      depData: [],
      cascadeDepData: [],
      staffData: [],

      dep: {},

      defaultExpanded: [],
      current: emptyPlan(),

      planKind
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      const planId = this.$route.params.planid;

      let currentPlan = (await plan(planId)).data;
      currentPlan.postdate = datetime();
      this.dep = (await dep(currentPlan.dep)).data;

      this.cascadeDepData = (await dep(
        currentPlan.dep,
        "under=1",
        "cascade=1"
      )).data;

      this.current = currentPlan;
      this.title = this.current.title;
      this.defaultExpanded.push(this.cascadeDepData[0]._id);
    },

    async postPlan() {
      let planData = copy(this.current);
      planData.state = 2;
      planData.post = this.$refs.depTree.getCheckedKeys();

      await plan(planData);
      this.$router.push(`/plan/${this.current._id}`);
    },

    checkChange(data) {
      let node = this.$refs.depTree.getNode(data);
      this.setChildren(node, node.checked);
      if (node.checked) {
        node.expanded = true;
      }
    },

    setChildren(node, target) {
      node.checked = target;
      if (node.childNodes) {
        node.childNodes.forEach(t => this.setChildren(t, target));
      }
    }
  },

  computed: {
    planDetail() {
      return this.$refs.depTree.getCheckedNodes().map(t => "" + t.id);
    },

    taskTemplate() {
      return getTemplates().map(t => {
        return { id: t.id, name: t.name };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
