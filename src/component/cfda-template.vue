<template>
  <el-row>
    <el-col :span="24">
      <table id="template">
        <tr>
          <td class="tablehead">检查项目</td>
          <td class="tablehead">检查内容</td>
          <td class="tablehead">提供选项</td>
          <td v-if="edit" class="tablehead">操作</td>
        </tr>

        <template v-for="(mainItem,mainIndex) in value">
          <!-- 整行 -->
          <tr :key="`${mainIndex}-${index}`" v-for="index in mainItem.detail.length||1">
            <!-- 检查大项列，需要跨越所有小项行 -->
            <td
              style="max-width:180px;min-width:160px;"
              v-if="index===1"
              :rowspan="mainItem.detail.length + (edit ? 1 : 0)"
            >
              <el-tag size="mini">{{mainIndex + 1}}</el-tag>
              {{mainItem.title}}
              <el-popover
                v-if="mainItem.remark"
                placement="top-start"
                title="备注"
                width="350"
                trigger="hover"
                :content="mainItem.remark"
              >
                <el-button
                  style="margin:5px;"
                  type="warning"
                  size="mini"
                  slot="reference"
                  plain
                  round
                >备注</el-button>
              </el-popover>

              <div style="margin-top:30px;" v-if="edit">
                <el-button
                  @click="deleteMain(mainIndex)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
                <el-button
                  @click="mainEdit(mainIndex)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </div>
            </td>

            <!-- 后面3列有内容的时候-->
            <template v-if="mainItem.detail && mainItem.detail[0]">
              <!-- 详细内容 -->
              <td style="min-width:300px;">
                <el-tag size="mini" type="info">{{mainIndex+1}}.{{index}}</el-tag>
                <el-tag
                  style="margin-left:5px;"
                  v-if="mainItem.detail[index-1].important"
                  size="mini"
                  type="danger"
                >重点项</el-tag>
                {{mainItem.detail[index-1].content}}
              </td>

              <!-- 接受选项 -->
              <td style="min-width:140px;">
                <template v-if="mainItem.detail[index-1].type===1">
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="success">
                    <strong>是</strong>
                    {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[0]}]`:''}}
                  </el-tag>
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="danger">
                    <strong>否</strong>
                    {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[1]}]`:''}}
                  </el-tag>
                </template>
                <template v-if="mainItem.detail[index-1].type===2">
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="success">
                    <strong>符合</strong>
                    {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[0]}]`:''}}
                  </el-tag>
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="warning">
                    <strong>基本符合</strong>
                    {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[1]}]`:''}}
                  </el-tag>
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="danger">
                    <strong>不符合</strong>
                    {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[2]}]`:''}}
                  </el-tag>
                </template>
                <template v-if="mainItem.detail[index-1].type===3">
                  <el-tag style="margin-bottom:5px;margin-right:8px;" size="small" type="success">
                    <strong>灵活评分</strong>
                    [限评{{mainItem.detail[index-1].val[0]}}-{{mainItem.detail[index-1].val[1]}}分值]
                  </el-tag>
                </template>
                <el-tag
                  v-if="!mainItem.detail[index-1].required"
                  style="margin-bottom:5px;margin-right:8px;"
                  size="small"
                  type="info"
                >可留空</el-tag>
              </td>

              <!-- 操作区 -->
              <td v-if="edit" style="min-width:70px;">
                <el-button
                  @click="deleteSub(mainIndex,index-1)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
                <el-button
                  @click="subEdit(mainIndex,index-1)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </td>
            </template>

            <!-- 没有内容时候的替代 -->
            <template v-else>
              <td colspan="4">
                <el-button
                  @click="subEdit(mainIndex)"
                  v-if="edit"
                  icon="el-icon-plus"
                  size="mini"
                  type="primary"
                  round
                >添加一项</el-button>
                <span v-else>没有内容</span>
              </td>
            </template>
          </tr>

          <!-- 添加子项按钮 -->
          <tr v-if="mainItem.detail.length >= 1 && edit" :key="`${mainIndex}-add`">
            <td colspan="4">
              <el-button
                @click="subEdit(mainIndex)"
                icon="el-icon-plus"
                size="mini"
                type="primary"
                round
              >添加子项</el-button>
            </td>
          </tr>
        </template>

        <!-- 添加大项行按钮 -->
        <tr v-if="edit">
          <td colspan="4">
            <el-button @click="mainEdit()" icon="el-icon-plus" size="small" type="primary">添加大项</el-button>
          </td>
        </tr>
      </table>
    </el-col>

    <!-- 主项编辑弹窗 -->
    <el-dialog
      v-if="mainPopup"
      title="编辑大检查项"
      :visible.sync="mainPopup"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题：" required>
              <el-input v-model="mainPopupData.title" placeholder="输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input
                :rows="4"
                type="textarea"
                placeholder="输入备注信息"
                v-model="mainPopupData.remark"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{mainPopup = false ; mainPopupData=null;}">取消</el-button>
        <el-button type="primary" @click="mainPopupOK()">完成</el-button>
      </span>
    </el-dialog>

    <!-- 检查子项编辑弹窗 -->
    <el-dialog
      v-if="subPopup"
      title="编辑详细检查项"
      :visible.sync="subPopup"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="100px">
        <el-row>
          <el-col :span="22">
            <el-form-item label="内容：" required>
              <el-input
                :rows="4"
                type="textarea"
                placeholder="输入检查项内容"
                v-model="subPopupData.content"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="必填项：">
              <el-checkbox v-model="subPopupData.required" label="是必填项" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="重点项：">
              <el-checkbox v-model="subPopupData.important" label="是重点项" border></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="subPopupData.type < 3">
          <el-col :span="24">
            <el-form-item label="分值：">
              <el-checkbox
                :value="subPopupData.val!=null"
                @change="subWithPointChange"
                label="有分值"
                border
              ></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="可选项：" required>
              <el-radio-group @change="subTypeChange" v-model="subPopupData.type" size="small">
                <el-radio-button :label="1">是/否</el-radio-button>
                <el-radio-button :label="2">符合/基本符合/不符合</el-radio-button>
                <el-radio-button :label="3">主观评分</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col v-if="subPopupData.type === 1" :push="3" :span="18">
            <div class="detailitem">
              <el-tag type="success" style="margin-right:5px;">「是」选项</el-tag>
              <span v-if="subPopupData.val!==null">
                分值：
                <el-input v-model.number="subPopupData.val[0]" size="small" style="width:60px;"></el-input>
              </span>
            </div>
            <div class="detailitem">
              <el-tag type="danger" style="margin-right:5px;">「否」选项</el-tag>
              <span v-if="subPopupData.val!==null">
                分值：
                <el-input v-model.number="subPopupData.val[1]" size="small" style="width:60px;"></el-input>
              </span>
            </div>
          </el-col>

          <el-col v-if="subPopupData.type === 2" :push="3" :span="18">
            <div class="detailitem">
              <el-tag type="success" style="margin-right:5px;">「符合」选项</el-tag>
              <span v-if="subPopupData.val!==null">
                分值：
                <el-input v-model.number="subPopupData.val[0]" size="small" style="width:60px;"></el-input>
              </span>
            </div>
            <div class="detailitem">
              <el-tag type="warning" style="margin-right:5px;">「基本符合」选项</el-tag>
              <span v-if="subPopupData.val!==null">
                分值：
                <el-input v-model.number="subPopupData.val[1]" size="small" style="width:60px;"></el-input>
              </span>
            </div>
            <div class="detailitem">
              <el-tag type="danger" style="margin-right:5px;">「不符合」选项</el-tag>
              <span v-if="subPopupData.val!==null">
                分值：
                <el-input v-model.number="subPopupData.val[2]" size="small" style="width:60px;"></el-input>
              </span>
            </div>
          </el-col>

          <el-col v-if="subPopupData.type===3&&subPopupData.val!==null" :push="3" :span="18">
            <el-tag style="margin-right:5px;">灵活评分</el-tag>
            <div style="margin-top:20px;">
              设置评分的上下限范围： 当前 [ {{subPopupData.val[0]}} - {{subPopupData.val[1]}} ]
              <el-slider v-model="subPopupData.val" range show-stops :min="0" :max="20"></el-slider>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="() => {subPopup = false; subPopupData = null;}">取消</el-button>
        <el-button @click="subPopupOK()" type="primary">完成</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { uuid, copy } from "@/utils/utils.js";
import { emptyMainItem, emptySubItem } from "@/api/template.js";
export default {
  name: "cfda-template",
  props: ["value", "edit"],
  data() {
    return {
      mainPopup: false,
      mainPopupData: null,

      subPopup: false,
      subPopupData: null,

      uuid,
      copy
    };
  },

  watch: {
    value: function(newValue) {
      this.$emit("input", newValue);
    }
  },

  methods: {
    subEdit(mainIndex, subIndex) {
      let i = mainIndex;
      let j = subIndex;

      let popupData = emptySubItem();
      if (j !== undefined && j !== null) {
        popupData = copy(this.value[i].detail[j]);
      }
      popupData._index = [i, j];

      this.subPopupData = popupData;
      this.subPopup = true;
    },

    subPopupOK() {
      let [i, j] = this.subPopupData._index;
      this.$delete(this.subPopupData, "_index");

      let newSub = copy(this.subPopupData);

      if (j !== undefined && j !== null) {
        this.value[i].detail.splice(j, 1, newSub);
      } else {
        this.value[i].detail.push(newSub);
      }

      this.subPopup = false;
      this.subPopupData = null;
    },

    deleteSub(index, detailIndex) {
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
        this.value[i].detail.splice(j, 1);
      });
    },

    mainEdit(mainIndex) {
      if (mainIndex !== undefined && mainIndex !== null) {
        let popupData = copy(this.value[mainIndex]);
        popupData._mainIndex = mainIndex;
        this.mainPopupData = popupData;
      } else {
        this.mainPopupData = emptyMainItem();
      }

      this.mainPopup = true;
    },

    mainPopupOK() {
      let i = this.mainPopupData._mainIndex;
      this.$delete(this.mainPopupData, "_mainIndex");

      if (i !== undefined && i !== null) {
        this.value.splice(i, 1, copy(this.mainPopupData));
      } else {
        this.value.push(copy(this.mainPopupData));
      }

      this.mainPopup = false;
      this.mainPopupData = null;
    },

    deleteMain(index) {
      let i = index;
      this.$confirm(
        `确定删除模板中的大项目[${i + 1}]吗？它的子检查项内容都将会一并被删除`,
        "确认删除",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(
        () => {
          this.value.splice(i, 1);
        },
        () => {}
      );
    },

    subWithPointChange(withPoint) {
      this.subPopupData.val = withPoint ? [0, 0, 0] : null;
    },

    subTypeChange(typeCode) {
      this.subPopupData.val =
        this.subPopupData.val || typeCode === 3 ? [0, 0, 0] : null;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.el-row {
  margin-bottom: 0;
}
</style>

