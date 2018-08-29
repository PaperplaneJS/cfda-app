<template>
  <div id="base_singletemplate">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板详情</el-row>

      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="模板名称:">
            <el-input v-model="currentTemplate.name" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="12">
          <el-form-item label="激活状态:">
            <el-radio-group v-model="currentTemplate.active">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">模板检查项</el-row>
      <el-row>
        <el-col style="margin:10px 0;" :span="16">
          <el-collapse v-model="currentCheckItem">

            <el-collapse-item v-for="item of currentTemplate.checkitem" :key="item.id" :name="item.id">
              <template slot="title">
                <span>{{item.name}}</span>
                <el-tag size="mini" style="margin:0 10px;">{{item.items.length}}子项</el-tag>
                <el-button @click.native.stop="addCheckDetail(item)" type="text">添加子项</el-button>
                <el-button @click.native.stop="deleteCheckItem(item)" type="text">删除本项</el-button>
              </template>
              <el-alert style="margin-top:8px;" @close="deleteDetail(item,detail)" :title="detail.content" v-for="detail of item.items" :key="detail.id" type="info" :description="detailDesc(detail)">
              </el-alert>
            </el-collapse-item>

          </el-collapse>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="设置检查内容:">
            <el-input size="medium" v-model="inputCheckItemName" placeholder="输入检查内容(无需编号)，然后点击添加"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button size="medium" @keypress.enter="addCheckItem" @click.native="addCheckItem" type="primary" round>添加一项</el-button>
        </el-col>
      </el-row>

    </el-form>

    <el-dialog title="添加模板检查项目" :visible.sync="isPopup">
      <el-form>
        <el-row>
          <el-form-item label="检查项内容:">
            <el-input :rows="4" placeholder="请输入检查项详细内容" type="textarea" v-model="popupInput.content"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="必填否:">
            <el-radio-group v-model="popupInput.isrequired">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="重点项:">
            <el-radio-group v-model="popupInput.isimportant">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="可选项:">
            <el-checkbox-group v-model="popupInput.activeItem">
              <el-checkbox-button label="符合" name="type">符合</el-checkbox-button>
              <el-checkbox-button label="基本符合" name="type">基本符合</el-checkbox-button>
              <el-checkbox-button label="不符合" name="type">不符合</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-row>

        <el-row :gutter="15">
          <el-col :span="4" v-for="t of popupInput.activeItem" :key="t">
            <el-form-item :label="`${t}分值:`">
              <el-input v-model.number="popupInput.selectItem[t]" placeholder="请输入分值"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="isPopup=false">取消</el-button>
        <el-button @click.native="acceptDetail" type="primary">确定</el-button>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">提交</el-button>
        <el-button type="primary" icon="el-icon-view">预览</el-button>
        <router-link to="/base/template">
          <el-button style="margin-left:20px;">返回模板管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UUID from "@/components/UUID";
export default {
  name: "base_singletemplate",
  data() {
    return {
      title: "",
      currentTemplate: null,
      currentCheckItem: "",
      inputCheckItemName: "",
      isPopup: false,
      popupInput: {}
    };
  },
  beforeMount() {
    let tid = this.$route.params.templateid;
    if (tid.trim() === "new") {
      this.currentTemplate = {
        name: "",
        active: true,
        checkitem: []
      };
      this.title = "新建检查模板";
    } else {
      this.title = "";
    }
  },
  methods: {
    addCheckItem() {
      this.currentTemplate.checkitem.push({
        id: UUID(8, 16),
        name: this.inputCheckItemName,
        items: []
      });
      this.inputCheckItemName = "";
    },

    deleteCheckItem(item) {
      let index = this.currentTemplate.checkitem.findIndex(
        t => t.id === item.id
      );
      this.currentTemplate.checkitem.splice(index, 1);
    },

    addCheckDetail(checkItem) {
      this.popupInput = {
        id: checkItem.id,
        content: "",
        isrequired: true,
        isimportant: false,
        activeItem: [],
        selectItem: { ["符合"]: 0, ["基本符合"]: 0, ["不符合"]: 0 }
      };
      this.isPopup = true;
    },

    acceptDetail() {
      let check = this.currentTemplate.checkitem.find(
        t => t.id === this.popupInput.id
      );
      check.items.push({
        id: UUID(8, 16),
        content: this.popupInput.content,
        isrequired: this.popupInput.isrequired,
        activeItem: this.popupInput.activeItem,
        selectItem: this.popupInput.selectItem
      });
      this.popupInput = {};
      this.isPopup = false;
    },

    deleteDetail(item, detail) {
      let index = item.items.findIndex(t => t.id === detail.id);
      item.items.splice(index, 1);
    },

    detailDesc(detail) {
      let str = `${detail.isrequired ? "必填" : "非必填"} / ${
        detail.isimportant ? "重点" : "普通"
      } / `;
      detail.activeItem.forEach(t => {
        str += `${t}=${detail.selectItem[t]}; `;
      });
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
