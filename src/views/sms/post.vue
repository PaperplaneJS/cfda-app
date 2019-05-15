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
            <el-input v-model="current.title" placeholder="请输入消息的标题"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="16">
          <el-form-item label="消息内容：" required>
            <el-input :rows="8" v-model="current.content" placeholder="请输入消息的内容" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="发布单位：">
            <el-input disabled :value="dep.name"></el-input>
          </el-form-item>
        </el-col>

        <el-col :push="2" :span="6">
          <el-form-item label="发布人：">
            <el-input disabled :value="staff.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="发布时间：">
            <el-date-picker
              disabled
              style="width:100%"
              type="datetime"
              placeholder="发布于"
              v-model="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="接收主体:" required>
            <el-tree
              @check="checkChange"
              :expand-on-click-node="false"
              ref="depTree"
              :check-strictly="true"
              :default-expanded-keys="defaultExpanded"
              :props="{label:'name'}"
              style="margin-bottom:20px;margin-top:10px;"
              node-key="_id"
              :data="cascadeDep"
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
        <el-button @click="postSms" type="primary" icon="el-icon-check">发布消息</el-button>
        <router-link style="margin-left:20px;" to="/sms">
          <el-button>返回消息列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { sms, emptySms } from "@/api/sms.js";
import { dep } from "@/api/dep.js";
import { staff } from "@/api/staff.js";
import { datetime } from "@/utils/utils.js";
import { Promise } from "q";

export default {
  name: "sms_post",

  data() {
    return {
      current: emptySms(),
      dep: {},
      staff: {},
      datetime: datetime(),

      cascadeDep: [],
      defaultExpanded: []
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      this.cascadeDep = (await dep(null, "cascade=1")).data;
      this.dep = (await dep(this.$store.state.currentUser.dep)).data;
      this.staff = this.$store.state.currentUser;

      this.defaultExpanded.push(this.cascadeDep[0]._id);
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
    },

    async postSms() {
      let postDeps = [];
      let treeRoot = this.$refs.depTree.getNode(this.defaultExpanded[0]);
      function getId(node) {
        if (node.checked) {
          postDeps.push(node.data._id);
          return;
        }
        if (node.childNodes) {
          node.childNodes.forEach(t => getId(t));
        }
      }

      getId(treeRoot);

      let postStaffs = [];
      await Promise.all(
        postDeps.map(async depId => {
          (await staff(null, `dep=${depId}`, "under=1")).data.forEach(staff =>
            postStaffs.push(staff._id)
          );
        })
      );

      if (!postStaffs.includes(this.$store.state.currentUser._id)) {
        postStaffs.push(this.$store.state.currentUser._id);
      }

      let currentSms = Object.assign(this.current, {
        dep: this.dep._id,
        staff: this.staff._id,
        date: this.datetime,
        post: postStaffs,
        recive: [
          { staff: this.$store.state.currentUser._id, date: this.datetime }
        ]
      });

      await sms(currentSms);
      this.$router.push(`/sms`);
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