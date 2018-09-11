<template>
  <el-row id="base_singleworkshop">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">食品小作坊</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="基本信息" name="base">

        <el-form :rules="bizRules" ref="currentBizInfo" :model="currentBizInfo" :disabled="!edit" label-position="left" style="margin-top:20px;" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item prop="name" label="小作坊名称：" required>
                <el-input v-model="currentBizInfo.name" placeholder="请输入小作坊名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="area" label="网格区域：" required>
                <el-cascader :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="currentBizInfo.area" :options="$store.state.gridarea.gridarea" placeholder="选择网格区域" style="width:100%;" change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="state" label="激活状态：" required>
                <el-radio-group v-model="currentBizInfo.state">
                  <el-radio :label="1">激活</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="kind" label="小作坊类型：">
                <el-select disabled v-model="currentBizInfo.kind" style="width:100%">
                  <el-option label="食品小作坊" value="食品小作坊"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="kind" label="经营类别：" required>
                <el-select v-model="currentBizInfo.category" style="width:100%" placeholder="请选择">
                  <el-option label="餐馆" value="餐馆"></el-option>
                  <el-option label="快餐店" value="快餐店"></el-option>
                  <el-option label="小吃店" value="小吃店"></el-option>
                  <el-option label="饮品店" value="饮品店"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="contact" label="联系人员：">
                <el-input v-model="currentBizInfo.contact" placeholder="请输入小作坊联系人姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="tel" label="联系电话：">
                <el-input v-model="currentBizInfo.tel" placeholder="请输入小作坊联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item prop="posx" label="经度：">
                <el-input v-model.number="currentBizInfo.pos[0]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" :push="2">
              <el-form-item prop="posy" label="纬度：">
                <el-input v-model.number="currentBizInfo.pos[1]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-alert show-icon title="经纬度是指百度地图的坐标值，用于在地图上定位商户的位置" type="info">
              </el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item prop="address" label="小作坊地址：">
                <el-input :rows="4" type="textarea" v-model="currentBizInfo.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="许可证：">
                <el-checkbox v-model="hasLicence" @change="licenceToggle" label="有许可证" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-alert show-icon title="如果该小作坊单位有许可证信息，那么勾选上面的「有许可证」复选框，然后在「许可信息」一页输入其许可证内容" type="info">
              </el-alert>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="currentBizInfo.licence" label="许可信息" name="licence">

        <el-form :rules="licenceRules" ref="currentBizInfo.licence" :disabled="!edit" :model="currentBizInfo.licence" label-position="left" style="margin-top:20px;" label-width="130px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="name" label="生产者名称:" required>
                <el-input v-model="currentBizInfo.licence.name" placeholder="请输入生产者名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="num" label="许可证号:" required>
                <el-input v-model="currentBizInfo.licence.num" placeholder="请输许可证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="responsible" label="法定代理人:" required>
                <el-input v-model="currentBizInfo.licence.responsible" placeholder="法定代理人或负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="supervise" label="日常监管机构:" required>
                <el-input v-model="currentBizInfo.licence.supervise" placeholder="日常监管机构名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="socialcode" label="社会信用代码:">
                <el-input v-model="currentBizInfo.licence.socialcode" placeholder="请输入社会信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="superviser" label="日常监管人员:" required>
                <el-input v-model="currentBizInfo.licence.superviser" placeholder="日常监管人员名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item prop="address" label="住所:">
                <el-input v-model="currentBizInfo.licence.address" placeholder="请输入许可证的住所信息"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item prop="productaddr" label="生产地址:">
                <el-input v-model="currentBizInfo.licence.productaddr" :rows="4" type="textarea" placeholder="请输入小作坊生产地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="foodkind" label="类别:" required>
                <el-input v-model="currentBizInfo.licence.foodkind" placeholder="输入食品类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="issue" label="发证机关:" required>
                <el-input v-model="currentBizInfo.licence.issue" placeholder="输入发证机关"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="licenceissue" label="许可证颁发日期:" required>
                <el-date-picker style="width:100%" type="date" placeholder="选择颁发日期" v-model="currentBizInfo.licence.licenceissue"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="licenceuntil" label="许可证有效期至:" required>
                <el-date-picker style="width:100%" type="date" placeholder="选择到期日期" v-model="currentBizInfo.licence.licenceuntil"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="检查记录" name="record">
        <el-row>
          <el-col :span="24">
            <el-table :data="getCheckRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column prop="date" label="检查时间" sortable></el-table-column>
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="grid" label="所属区域"></el-table-column>
              <el-table-column prop="officer" label="执法人员"></el-table-column>
              <el-table-column prop="kind" label="监督检查类别" sortable></el-table-column>
              <el-table-column prop="checkresult" label="检查结果" sortable></el-table-column>
              <el-table-column prop="handleresult" label="处理结果" sortable></el-table-column>
              <el-table-column prop="action" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="量化评级" name="risk">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRiskRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column prop="year" label="评级年" sortable></el-table-column>
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="grid" label="所属区域"></el-table-column>
              <el-table-column prop="riskresult" label="评定等级" sortable></el-table-column>
              <el-table-column prop="riskpoint" label="量化评分" sortable></el-table-column>
              <el-table-column prop="officer" label="评定人员"></el-table-column>
              <el-table-column prop="department" label="评定单位"></el-table-column>
              <el-table-column prop="last" label="最后评定于" sortable></el-table-column>
              <el-table-column prop="action" label="操作" min-width="80px">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="行政处罚记录" name="refity">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRectifyRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="officer" label="执法人员"></el-table-column>
              <el-table-column prop="department" label="执法单位"></el-table-column>
              <el-table-column prop="kind" label="监督检查类别"></el-table-column>
              <el-table-column prop="isrefity" label="是否整改"></el-table-column>
              <el-table-column prop="isrecheck" label="是否复查"></el-table-column>
              <el-table-column prop="state" label="状态"></el-table-column>
              <el-table-column prop="update" label="更新时间"></el-table-column>
              <el-table-column prop="result" label="检查结果"></el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :span="24">
        <el-button @click="edit=true" v-if="!edit" icon="el-icon-edit" type="primary">编辑</el-button>
        <el-button @click="editOK" v-if="edit" icon="el-icon-check" type="primary">{{isNew?"提交审核":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/base/biz">
          <el-button style="margin-left:20px;">返回小作坊管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "base_singleworkshop",
  data() {
    return {
      tab: "base",
      edit: null,
      isNew: null,
      kind: null,
      title: null,
      hasLicence: null,
      currentBizInfo: null,
      originBizInfo: null,
      bizRules: {
        name: [
          {
            required: true,
            message: "必须输入小作坊单位名称",
            trigger: ["blur", "change"]
          }
        ],
        state: [
          {
            required: true,
            message: "必须设置小作坊单位状态",
            trigger: ["blur", "change"]
          }
        ],
        kind: [
          {
            required: true,
            message: "必须选择小作坊单位类型",
            trigger: ["blur", "change"]
          }
        ],
        area: [
          {
            required: true,
            message: "必须设置小作坊单位网格区域",
            trigger: ["blur", "change"]
          }
        ]
      },
      licenceRules: {
        name: [
          {
            required: true,
            message: "必须输入许可中的生产者名称",
            trigger: ["blur", "change"]
          }
        ],
        num: [
          {
            required: true,
            message: "必须输入许可证号码",
            trigger: ["blur", "change"]
          }
        ],
        responsible: [
          {
            required: true,
            message: "必须输入法定代理人",
            trigger: ["blur", "change"]
          }
        ],
        supervise: [
          {
            required: true,
            message: "必须输入日常监管机构",
            trigger: ["blur", "change"]
          }
        ],
        superviser: [
          {
            required: true,
            message: "必须输入日常监管人员",
            trigger: ["blur", "change"]
          }
        ],
        foodkind: [
          {
            required: true,
            message: "必须输入许可证的类别",
            trigger: ["blur", "change"]
          }
        ],
        issue: [
          {
            required: true,
            message: "必须输入发证机关",
            trigger: ["blur", "change"]
          }
        ],
        licenceissue: [
          {
            required: true,
            message: "必须输入许可证颁发日期",
            trigger: ["blur", "change"]
          }
        ],
        licenceuntil: [
          {
            required: true,
            message: "必须输入许可证有效期限",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  methods: {
    getRectifyRecord() {
      return [];
    },
    getCheckRecord() {
      return [];
    },
    getRiskRecord() {
      return [];
    },

    editOK() {},

    editCancel() {
      this.currentBizInfo = copy(this.originBizInfo);
      this.currentBizInfo.licence = copy(this.originBizInfo.licence);
      this.hasLicence = this.currentBizInfo.licence !== null;
      this.edit = false;
    },

    licenceToggle(val) {
      if (val) {
        this.currentBizInfo.licence = {};
        let defaultLincence =
          this.originBizInfo && this.originBizInfo.licence
            ? copy(this.originBizInfo.licence)
            : {
                name: "",
                num: "",
                socialcode: "",
                supervise: "",
                superviser: "",
                responsible: "",
                address: "",
                productaddr: "",
                issue: "",
                licenceissue: null,
                licenceuntil: null
              };

        this.currentBizInfo.licence = defaultLincence;
      } else {
        this.currentBizInfo.licence = null;
      }
    },

    init() {
      let bizid = this.$route.params.bizid;

      if (bizid.trim() === "new") {
        this.currentBizInfo = {
          name: "",
          state: 1,
          category: "",
          kind: "食品小作坊",
          pos: [null, null],
          address: "",
          area: [],
          contact: "",
          tel: "",
          licence: null
        };

        this.title = "新增小作坊";
        this.isNew = true;
        this.edit = true;
        this.hasLicence = false;
      } else {
        this.currentBizInfo = copy(
          this.$store.state.biz.find(t => t.id == bizid)
        );

        this.originBizInfo = copy(
          this.$store.state.biz.find(t => t.id == bizid)
        );

        if (this.currentBizInfo.area) {
          this.currentBizInfo.area = this.$store.state.gridarea.findAreaIDArray(
            this.currentBizInfo.area
          );
        }

        if (this.originBizInfo.area) {
          this.originBizInfo.area = this.$store.state.gridarea.findAreaIDArray(
            this.originBizInfo.area
          );
        }

        this.title = this.currentBizInfo.name;
        this.hasLicence = this.currentBizInfo.licence !== null;
        this.isNew = false;
        this.edit = false;
      }
    }
  },

  beforeMount() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.el-alert {
  margin-bottom: 20px;
}
</style>
