<template>
  <el-row id="sms_post">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息发布</el-row>

    <el-row :gutter="15"></el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="消息标题：" required>
            <el-input placeholder="请输入消息的标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="消息内容：" required>
            <el-input :rows="8" placeholder="请输入消息的内容" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="发布单位：">
            <el-input disabled v-model="department.getAreaByID($store.state.currentUser.area).name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :push="2" :span="6">
          <el-form-item label="发布人：">
            <el-input disabled :value="$store.state.currentUser.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="接收主体:" required>
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
        <el-button type="primary" icon="el-icon-check">发布消息</el-button>
        <router-link style="margin-left:20px;" to="/sms/list">
          <el-button>返回消息列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import department from "@/oldAPI/old_area.js";

export default {
  name: "sms_post",

  data() {
    return { department };
  },

  computed: {
    treeData() {
      return department.getArea();
    }
  },

  methods: {
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