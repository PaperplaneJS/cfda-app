<template>
  <div id="sms_post">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/sms/post">消息管理</el-breadcrumb-item>
      <el-breadcrumb-item>消息发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">消息发布</el-row>

    <el-row :gutter="15">
    </el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="90px">
      <el-row>
        <el-col :span="10">
          <el-form-item label="消息标题:">
            <el-input placeholder="请输入消息的标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <el-form-item label="消息内容:">
            <el-input :rows="8" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="接收主体:">
            <el-tree :expand-on-click-node="false" ref="tree" :check-strictly="true" style="margin-bottom:20px;" node-key="id" :default-expanded-keys="[2,3,4]" :data="gridtree" show-checkbox>
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button v-if="!node.isLeaf" type="text" size="mini" @click="treeSelectChild(node,data)">
                    下级全选
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
        <el-button type="primary">发布消息</el-button>
        <router-link style="margin-left:20px;" to="/sms/list">
          <el-button>返回消息列表</el-button>
        </router-link>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "sms_post",
  data() {
    return {
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
  methods: {
    treeSelectChild(node, data) {
      console.log(node);
      this.setChildrenChecked(node);
    },

    setChildrenChecked(node) {
      node.checked = true;
      if (node.childNodes) {
        node.childNodes.forEach(t => this.setChildrenChecked(t));
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