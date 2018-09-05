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
            <tr :key="item.title">
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
                    <strong v-if="result.point!==undefined"> [{{result.point | itemText}}]</strong>
                  </el-tag>
                  <el-tag v-if="!item.children[0].required" style="margin-bottom:5px;margin-right:8px;" size="small" type="info">留空</el-tag>
                </td>
                <td v-if="edit" style="min-width:70px;">
                  <el-button @click="deleteDetail(index,0)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                  <el-button @click="editDetail(index,0)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                </td>
              </template>
              <template v-else>
                <td colspan="4">
                  <el-button @click="editDetail(index)" v-if="edit" icon="el-icon-plus" size="mini" type="primary" round>添加一项</el-button>
                  <span v-else>没有内容</span>
                </td>
              </template>
            </tr>

            <tr :key="detailIndex.label" v-for="(detailItem,detailIndex) of item.children.slice(1)">
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
                  <strong v-if="result.point!==undefined"> [{{result.point | itemText}}]</strong>
                </el-tag>
                <el-tag v-if="!detailItem.required" style="margin-bottom:5px;margin-right:8px;" size="small" type="info">留空</el-tag>
              </td>
              <td v-if="edit" style="min-width:70px;">
                <el-button @click="deleteDetail(index,detailIndex+1)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                <el-button @click="editDetail(index,detailIndex+1)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              </td>
            </tr>

            <tr v-if="item.children.length>=1&&edit" :key="item.title+'-add'">
              <td colspan="4">
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

    <el-dialog v-if="itemPopup" title="编辑大检查项" :visible.sync="itemPopup" width="50%" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题：" required>
              <el-input v-model="itemPopupData.title" placeholder="输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input :rows="4" type="textarea" placeholder="输入备注信息" v-model="itemPopupData.tips"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{itemPopup = false;itemPopupData=null;}">取消</el-button>
        <el-button type="primary" @click="itemPopupOK(itemPopupData.index)">完成</el-button>
      </span>
    </el-dialog>

    <el-dialog v-if="detailPopup" title="编辑详细检查项" :visible.sync="detailPopup" width="50%" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="内容：" required>
              <el-input :rows="4" type="textarea" placeholder="输入检查项内容" v-model="detailPopupData.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="必填项：">
              <el-checkbox v-model="detailPopupData.required" label="是必填项" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="重点项：">
              <el-checkbox v-model="detailPopupData.important" label="是重点项" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="分值：">
              <el-checkbox :disabled="detailPopupData.type==='pingfen'" v-model="detailPopupData.point" label="有分值" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="可选项：" required>
              <el-radio-group @change="detailTypeChange" v-model="detailPopupData.type" size="small">
                <el-radio-button label="shifou">是/否</el-radio-button>
                <el-radio-button label="fuhe">符合/基本符合/不符合</el-radio-button>
                <el-radio-button label="pingfen">灵活评分</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="['shifou','fuhe'].includes(detailPopupData.type)">
          <el-col :push="3" :span="18">
            <div v-for="item of detailPopupData.item" :key="item.label" class="detailitem">
              <el-tag :type="item.check?'success':'danger'" style="margin-right:5px;">「{{item.label}}」选项</el-tag>
              <span v-if="detailPopupData.point">
                分值：
                <el-input v-model.number="item.point" size="small" style="width:60px;"></el-input>
              </span>
            </div>
          </el-col>
        </el-row>

        <el-row v-if="['pingfen'].includes(detailPopupData.type)">
          <el-col :push="3" :span="18">
            <el-tag style="margin-right:5px;">灵活评分</el-tag>
            <div style="margin-top:20px;">
              设置评分的上下限范围： 当前 [ {{detailPopupData.limit[0]}} - {{detailPopupData.limit[1]}} ]
              <el-slider v-model="detailPopupData.limit" range show-stops :min="0" :max="20">
              </el-slider>
            </div>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{detailPopup = false;detailPopupData=null;}">取消</el-button>
        <el-button @click="detailPopupOK(detailPopupData.index)" type="primary">完成</el-button>
      </span>
    </el-dialog>

    <el-row>
      <el-col :span="24">
        <el-button v-if="edit" @click="editOK" icon="el-icon-check" type="primary">{{isNew?"完成创建":"完成编辑"}}</el-button>
        <el-button v-if="!edit" @click="edit=true" icon="el-icon-edit-outline" type="primary">编辑模板</el-button>
        <el-button v-if="edit && !isNew" @click="editCancel" style="margin-left:20px;" icon="el-icon-refresh">取消并还原</el-button>
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
      isNew: null,
      currentTemplate: null,
      originTemplate: null,

      itemPopup: false,
      itemPopupData: null,
      detailPopup: false,
      detailPopupData: null
    };
  },

  beforeMount() {
    this.init();
  },

  filters: {
    itemText(t) {
      if (Array.isArray(t)) {
        return `限评${t[0]}-${t[1]}分值`;
      } else {
        return `${t}分值`;
      }
    }
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
          content: [],
          staff: this.$store.state.current.staff.name,
          department: this.$store.state.current.staff.department,
          date: this.today(),
          tips: ""
        };
        this.title = "新建检查模板";
        this.isNew = true;
        this.edit = true;
      } else {
        this.currentTemplate = copy(
          this.$store.state.template.find(t => t.id == tid)
        );
        this.originTemplate = copy(this.currentTemplate);
        this.title = this.currentTemplate.name;
        this.isNew = false;
        this.edit = false;
      }
    },

    uuid(t) {
      return uuid(t);
    },

    editOK() {},

    editCancel() {
      this.currentTemplate = copy(this.originTemplate);
      this.edit = false;
    },

    deleteDetail(index, detailIndex) {
      let i = index;
      let j = detailIndex;
      this.$confirm(
        `确定删除模板中的该检查项[${i + 1}.${j + 1}]吗？`,
        "确认删除",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.currentTemplate.content[i].children.splice(j, 1);
      });
    },

    editDetail(index, detailIndex) {
      let i = index;
      let j = detailIndex;

      if (j !== undefined && j !== null) {
        let popupData = copy(this.currentTemplate.content[i].children[j]);
        popupData.index = [i, j];
        popupData.limit = [0, 10];
        if (popupData.type === "pingfen") {
          popupData.limit = popupData.item[0].point;
          popupData.item[0].point = 0;
        }
        this.detailPopupData = popupData;
      } else {
        this.detailPopupData = {
          content: "",
          important: false,
          required: false,
          point: false,
          item: [
            {
              label: "是",
              check: true,
              point: 0
            },
            {
              label: "否",
              check: false,
              point: 0
            }
          ],
          type: "shifou",
          index: [i],
          limit: [0, 10]
        };
      }

      this.detailPopup = true;
    },

    deleteItem(index) {
      let i = index;
      this.$confirm(
        `确定删除模板中的大项目[${i + 1}]吗？它的所有内容都将会一并被删除`,
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

    editItem(index) {
      if (index !== undefined && index !== null) {
        this.itemPopupData = copy(this.currentTemplate.content[index]);
        this.itemPopupData.index = index;
      } else {
        this.itemPopupData = {
          title: "",
          tips: "",
          children: [],
          limit: [0, 10]
        };
      }

      this.itemPopup = true;
    },

    itemPopupOK(index) {
      let i = index;
      Reflect.deleteProperty(this.itemPopupData, "index");
      if (i !== undefined && i !== null) {
        this.currentTemplate.content.splice(index, 1, copy(this.itemPopupData));
      } else {
        this.currentTemplate.content.push(copy(this.itemPopupData));
      }

      this.itemPopup = false;
      this.itemPopupData = null;
    },

    detailPopupOK([itemIndex, detailIndex]) {
      let i = itemIndex,
        j = detailIndex,
        newDetail = this.editToDetail(copy(this.detailPopupData));

      if (j !== undefined && j !== null) {
        this.currentTemplate.content[i].children.splice(j, 1, newDetail);
      } else {
        this.currentTemplate.content[i].children.push(newDetail);
      }
      this.detailPopup = false;
      this.detailPopupData = null;
    },

    detailTypeChange(type) {
      switch (type) {
        case "shifou":
          this.detailPopupData.item = [
            {
              label: "是",
              check: true,
              point: 0
            },
            {
              label: "否",
              check: false,
              point: 0
            }
          ];
          break;

        case "fuhe":
          this.detailPopupData.item = [
            {
              label: "符合",
              check: true,
              point: 0
            },
            {
              label: "基本符合",
              check: true,
              point: 0
            },
            {
              label: "不符合",
              check: false,
              point: 0
            }
          ];
          break;

        case "pingfen":
          this.detailPopupData.point = true;
          this.detailPopupData.item = [
            {
              label: "灵活评分",
              check: true,
              point: 0
            }
          ];
          break;
      }
    },

    editToDetail(editDetail) {
      if (!editDetail.point) {
        editDetail.item.forEach(t => Reflect.deleteProperty(t, "point"));
      }
      if (editDetail.type === "pingfen") {
        editDetail.item[0].point = editDetail.limit;
      }

      let detail = {
        content: editDetail.content,
        important: editDetail.important,
        required: editDetail.required,
        point: editDetail.point,
        item: editDetail.item,
        type: editDetail.type
      };

      return detail;
    }
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

.detailitem {
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
}
</style>
