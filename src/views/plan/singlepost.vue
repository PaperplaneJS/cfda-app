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
      <el-button @click="$router.push('/plan/list/'+currentPlan.id)" type="text">编辑计划</el-button>
    </el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划详情</el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="计划标题：">
            <el-input v-model="currentPlan.title" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="计划类别：">
            <el-select style="width:100%;" disabled v-model="currentPlan.kind" placeholder="请选择">
              <el-option label="日常检查" value="daily"></el-option>
              <el-option label="专项检查" value="special"></el-option>
              <el-option label="全量检查(风险评级)" value="risk"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制定日期：">
            <el-date-picker style="width:100%;" disabled type="date" v-model="currentPlan.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="执行期限：">
            <el-date-picker
              style="width:100%;"
              v-model="currentPlan.limit"
              disabled
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
          <el-form-item label="选择模板：" required>
            <el-select disabled style="width:100%;" v-model="currentPlan.template">
              <el-option
                v-for="item of taskTemplate"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="检查描述：">
            <el-input
              v-model="currentPlan.desc"
              :rows="4"
              type="textarea"
              disabled
              placeholder="选填,检查工作的简要描述"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="备注：">
            <el-input
              v-model="currentPlan.remark"
              :rows="4"
              type="textarea"
              disabled
              placeholder="选填,工作备注"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">分发对象</el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="分发给：" required>
            <el-tree
              @check="checkChange"
              :expand-on-click-node="false"
              ref="tree"
              :check-strictly="true"
              :default-expanded-keys="[treeData[0].id]"
              :props="{label:'name'}"
              style="margin-bottom:20px;"
              node-key="id"
              :data="treeData"
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
        <el-button icon="el-icon-check" type="primary">确认分发</el-button>
        <router-link to="/plan/post">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { getArea } from "@/api/old_area.js";
import { getPlanByID } from "@/api/old_plan.js";
import { getTemplates } from "@/api/old_template.js";

export default {
  name: "plan_singleplan",

  data() {
    return {
      title: null,
      currentPlan: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    treeData() {
      return getArea();
    },

    planDetail() {
      return this.$refs.tree.getCheckedNodes().map(t => "" + t.id);
    },

    taskTemplate() {
      return getTemplates().map(t => {
        return { id: t.id, name: t.name };
      });
    }
  },

  methods: {
    init() {
      let planid = this.$route.params.planid;
      this.currentPlan = getPlanByID(planid);
      this.title = this.currentPlan.title;
    },

    checkChange(data) {
      let node = this.$refs.tree.getNode(data);
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
