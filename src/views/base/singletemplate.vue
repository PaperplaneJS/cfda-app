<template>
  <el-row id="base_singletemplate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">模板管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板详情</el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="模板名称：" required>
            <el-input :disabled="!edit" v-model="currentTemplate.name" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="创建人：">
            <el-input disabled v-model="currentTemplate.staff"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所属科室：">
            <el-input disabled v-model="currentTemplate.department"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="date" label="制定日期：">
            <el-date-picker disabled style="width:100%" type="date" v-model="currentTemplate.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="激活状态：">
            <el-radio-group :disabled="!edit" v-model="currentTemplate.state">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="productaddr" label="备注:">
            <el-input :disabled="!edit" v-model="currentTemplate.tips" :rows="4" type="textarea" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板内容</el-row>

    </el-form>

    <el-row>
      <el-col :span="24">
        <table id="template">
          <tr>
            <td class="tablehead">检查项目</td>
            <td class="tablehead">检查内容</td>
            <td class="tablehead">提供选项</td>
            <td v-if="edit" class="tablehead">操作</td>
          </tr>
          <template v-for="(item,index) of currentTemplate.content">
            <tr :key="index+uuid(6,16)">
              <td :rowspan="item.children.length+(edit?1:0)">
                <el-tag size="mini">{{index+1}}</el-tag>
                {{item.title}}
                <el-popover v-if="item.tips" placement="top-start" title="备注" width="350" trigger="hover" :content="item.tips">
                  <el-button style="margin:5px;" type="warning" size="mini" slot="reference" plain round>备注</el-button>
                </el-popover>
                <div style="margin-top:30px;" v-if="edit">
                  <el-button @click="deleteItem(index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button @click="editItem(index)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                </div>
              </td>

              <template v-if="item.children&&item.children[0]">
                <td>
                  <el-tag size="mini" type="info">{{index+1}}.1</el-tag>
                  <el-tag style="margin-left:5px;" v-if="item.children[0].important" size="mini" type="danger">
                    重点项
                  </el-tag>
                  {{item.children[0].content}}
                </td>
                <td style="min-width:130px;">
                  <el-tag style="margin-bottom:5px;margin-right:8px;" v-for="result of item.children[0].item" :type="result.check===null?'':(result.check?'success':'danger')" :key="result.label" size="small">
                    {{result.label}}
                    <strong v-if="result.point"> [{{result.point}}分值]</strong>
                  </el-tag>
                </td>
                <td v-if="edit" style="min-width:70px;">
                  <el-button @click="deleteDetail(index,0)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button @click="editDetail(index,0)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                </td>
              </template>
              <template v-else>
                <td :colspan="edit?4:3">
                  <el-button @click="editDetail(index)" v-if="edit" icon="el-icon-plus" size="mini" type="primary" round>添加一项</el-button>
                  <span v-else>没有内容</span>
                </td>
              </template>
            </tr>

            <tr :key="index+detailIndex+uuid(6,16)" v-for="(detailItem,detailIndex) of item.children.slice(1)">
              <td>
                <el-tag size="mini" type="info">
                  {{index+1}}.{{detailIndex+2}}
                </el-tag>
                <el-tag style="margin-left:5px;" v-if="detailItem.important" size="mini" type="danger">
                  重点项
                </el-tag>
                {{detailItem.content}}
              </td>
              <td style="min-width:130px;">
                <el-tag style="margin-bottom:5px;margin-right:8px;" v-for="result of detailItem.item" :type="result.check===null?'':(result.check?'success':'danger')" :key="result.label" size="small">
                  {{result.label}}
                  <strong v-if="result.point"> [{{result.point}}分值]</strong>
                </el-tag>
              </td>
              <td v-if="edit" style="min-width:70px;">
                <el-button @click="deleteDetail(index,detailIndex+1)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="editDetail(index,detailIndex+1)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              </td>
            </tr>

            <tr v-if="item.children.length>=1&&edit" :key="index+uuid(6,16)">
              <td :colspan="edit?4:3">
                <el-button @click="editDetail(index)" icon="el-icon-plus" size="mini" type="primary" round>添加一项</el-button>
              </td>
            </tr>
          </template>
          <tr v-if="edit">
            <td colspan="4">
              <el-button @click="editItem()" icon="el-icon-plus" size="small" type="primary">添加大项</el-button>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-button v-if="edit" icon="el-icon-check" type="primary">完成编辑</el-button>
        <el-button v-if="!edit" @click="edit=true" icon="el-icon-edit-outline" type="primary">编辑模板</el-button>
        <el-button v-if="edit" @click="editCancel" style="margin-left:20px;" icon="el-icon-refresh">取消并还原</el-button>
        <router-link to="/base/template">
          <el-button style="margin-left:20px;">返回模板管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>

</template>

<script>
import { uuid, copy } from "@/components/utils";
export default {
  name: "base_singletemplate",
  data() {
    return {
      title: "",
      edit: null,
      isnew: null,
      currentTemplate: null,
      originTemplate: null
    };
  },

  beforeMount() {
    this.init();
  },

  methods: {
    today() {
      let date = new Date();

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },

    init() {
      let tid = this.$route.params.templateid;
      if (tid.trim() === "new") {
        this.currentTemplate = {
          name: "",
          state: 1,
          checkitem: [],
          staff: this.$store.state.current.staff.name,
          department: this.$store.state.current.staff.department,
          date: this.today()
        };
        this.title = "新建检查模板";
        this.isnew = true;
        this.edit = true;
      } else {
        this.currentTemplate = copy(
          this.$store.state.template.find(t => t.id == tid)
        );
        this.originTemplate = copy(this.currentTemplate);
        this.title = this.currentTemplate.name;
        this.isnew = false;
        this.edit = false;
      }
    },

    uuid(t) {
      return uuid(t);
    },

    editCancel() {
      this.currentTemplate = copy(this.originTemplate);
      this.edit = false;
    },

    deleteDetail(index, detailIndex) {
      let i = index;
      let j = detailIndex;
      this.$confirm(`确定删除模板中的该检查项[${i}.${j}]吗？`, "确认删除", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.currentTemplate.content[i].children.splice(j, 1);
      });
    },

    editDetail(index, detailIndex) {},

    deleteItem(index) {
      let i = index;
      this.$confirm(
        `确定删除模板中的大项目[${i}]吗？它的所有内容都将会一并被删除`,
        "确认删除",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.currentTemplate.content.splice(i, 1);
      });
    },

    editItem(index) {}
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

#template {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border-collapse: collapse;
    border: 1.5px solid #000;
    padding: 8px 18px;
  }

  .tablehead {
    background-color: #e0e0e0;
  }
}
</style>
