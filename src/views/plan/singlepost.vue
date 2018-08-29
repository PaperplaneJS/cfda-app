<template>
  <div id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">检查计划管理</el-breadcrumb-item>
      <el-breadcrumb-item to="/plan/post">分发计划</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划详情</el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划标题:">
            <el-input v-model="currentPlan.title" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="计划类别:">
            <el-input v-model="currentPlan.kind" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="制定日期:">
            <el-date-picker disabled type="date" v-model="currentPlan.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="执行期限:">
            <el-date-picker v-model="currentPlan.limit" disabled type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="检查描述:">
            <el-input v-model="currentPlan.desc" :rows="4" type="textarea" disabled placeholder="选填,检查工作的简要描述"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="备注:">
            <el-input v-model="currentPlan.remark" :rows="4" type="textarea" disabled placeholder="选填,工作备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">分发对象</el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分发给:">
            <el-tree :expand-on-click-node="false" ref="tree" :check-strictly="true" style="margin-bottom:20px;" node-key="id" :default-expanded-keys="[2,3,4]" :data="gridtree" show-checkbox>
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button v-if="!node.isLeaf" type="text" size="mini" @click="treeSelectChild(node,data)">
                    下级全选
                  </el-button>
                  <el-button v-if="!node.isLeaf" type="text" size="mini" @click="treeEmptyChild(node,data)">
                    清空
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">确认分发</el-button>
        <el-button>编辑计划</el-button>
        <router-link to="/plan/post">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "plan_singleplan",
  data() {
    return {
      title: null,
      currentPlan: null,
      gridtree: [
        {
          label: "常熟市",
          children: [
            {
              id: 2,
              label: "虞山镇",
              children: [
                { label: "虞山分局" },
                { label: "检察大队" },
                { label: "食药监分局" }
              ]
            },
            {
              id: 3,
              label: "梅里",
              children: []
            },
            {
              id: 4,
              label: "赵市",
              children: []
            }
          ]
        }
      ]
    };
  },
  beforeMount() {
    let planid = this.$route.params.planid;
    if (planid === "1") {
      this.currentPlan = {
        title: "常熟市2018年下半年巡检计划",
        kind: "日常检查",
        date: "2018-05-01",
        limit: ["2018-06-01", "2018-12-01"],
        desc: "请按照检查要点表和相关法规执行",
        remark: "完成后及时上报结果"
      };

      this.title = this.currentPlan.title;
    }
  },
  methods: {
    treeSelectChild(node, data) {
      this.setChildren(node, true);
    },

    treeEmptyChild(node, data) {
      this.setChildren(node, false);
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
