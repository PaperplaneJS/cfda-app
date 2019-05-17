<template>
  <el-row>
    <el-col :span="24">
      <table id="template">
        <tr>
          <td class="tablehead">检查项目</td>
          <td class="tablehead">检查内容</td>
          <td class="tablehead">结果记录</td>
        </tr>

        <template v-for="(mainItem,mainIndex) in template">
          <!-- 整行 -->
          <tr :key="`${mainIndex}-${index}`" v-for="index in mainItem.detail.length||1">
            <!-- 检查大项列，需要跨越所有小项行 -->
            <td
              style="max-width:180px;min-width:160px;"
              v-if="index===1"
              :rowspan="mainItem.detail.length"
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

              <!-- 评分操作区 -->
              <td class="result" style="min-width:200px;">
                <template v-if="mainItem.detail[index-1].type===1">
                  <el-radio-group v-if="edit" v-model="value[mainIndex][index-1]" size="small">
                    <el-radio
                      :label="1"
                      size="mini"
                      border
                    >是 {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[0]}]`:''}}</el-radio>
                    <el-radio
                      :label="2"
                      size="mini"
                      border
                    >否 {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[1]}]`:''}}</el-radio>
                  </el-radio-group>
                  <el-tag :type="['info','success','danger'][value[mainIndex][index-1]||0]" v-else>
                    {{['留空','是','否'][value[mainIndex][index-1]||0]}}
                    <template
                      v-if="mainItem.detail[index-1].val"
                    >{{`[分值${mainItem.detail[index-1].val[value[mainIndex][index-1]-1]}]`}}</template>
                  </el-tag>
                </template>

                <template v-if="mainItem.detail[index-1].type===2">
                  <el-radio-group v-if="edit" v-model="value[mainIndex][index-1]" size="small">
                    <el-radio
                      :label="1"
                      size="mini"
                      border
                    >符合 {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[0]}]`:''}}</el-radio>
                    <el-radio
                      :label="2"
                      size="mini"
                      border
                    >基本符合 {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[1]}]`:''}}</el-radio>
                    <el-radio
                      :label="3"
                      size="mini"
                      border
                    >不符合 {{mainItem.detail[index-1].val?`[分值${mainItem.detail[index-1].val[2]}]`:''}}</el-radio>
                  </el-radio-group>
                  <el-tag
                    :type="['info','success','warning','danger'][value[mainIndex][index-1]||0]"
                    v-else
                  >
                    {{['留空','符合','基本符合','不符合'][value[mainIndex][index-1]||0]}}
                    <template
                      v-if="mainItem.detail[index-1].val"
                    >{{`[分值${mainItem.detail[index-1].val[value[mainIndex][index-1]-1]}]`}}</template>
                  </el-tag>
                </template>

                <template v-if="mainItem.detail[index-1].type===3">
                  <template v-if="edit&&value[mainIndex][index-1]">
                    <span>评分[{{mainItem.detail[index-1].val[0]}}-{{mainItem.detail[index-1].val[1]}}]：</span>
                    <el-input
                      style="margin:5px;width:60px;"
                      size="mini"
                      :readonly="!edit"
                      v-model.number="value[mainIndex][index-1]"
                      placeholder="评分"
                    ></el-input>
                  </template>
                  <el-tag type="info" v-else-if="edit&&!value[mainIndex][index-1]">留空</el-tag>
                  <el-tag
                    v-else
                  >评分[{{mainItem.detail[index-1].val[0]}}-{{mainItem.detail[index-1].val[1]}}]： {{value[mainIndex][index-1]}}</el-tag>
                </template>

                <el-button
                  v-if="edit && !mainItem.detail[index-1].required"
                  size="mini"
                  @click="() => {$set(value[mainIndex], index-1, null)}"
                  type="text"
                >为空</el-button>
              </td>
            </template>

            <!-- 没有内容时候的替代 -->
            <template v-else>
              <td colspan="4">
                <span>没有内容</span>
              </td>
            </template>
          </tr>
        </template>
      </table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "cfda-record-template",
  props: ["value", "edit", "template"],
  data() {
    return {};
  },

  beforeMount() {
    this.init();
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.init();
  },

  watch: {
    value: function(newValue) {
      this.$emit("input", newValue);
    }
  },

  methods: {
    init() {
      for (let i = 0; i < this.template.length; i++) {
        this.value.push([]);
        for (let j = 0; j < this.template[i].detail.length; j++) {
          this.value[i].push(null);
        }
      }

      this.$emit("init");
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

  .result {
    .el-radio {
      margin-left: 0;
      margin: 5px;
    }
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
