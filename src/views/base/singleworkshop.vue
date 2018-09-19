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

        <el-form :model="currentBizInfo" :disabled="!edit" label-position="left" style="margin-top:20px;" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="小作坊名称：" required>
                <el-input v-model="currentBizInfo.com_name" placeholder="请输入小作坊名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="网格区域：" required>
                <el-cascader :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="currentBizInfo.area" :options="department.getArea()" placeholder="选择网格区域" style="width:100%;" change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="激活状态：" required>
                <el-radio-group v-model="currentBizInfo.com_state">
                  <el-radio :label="'1'">开启</el-radio>
                  <el-radio :label="'0'">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="小作坊类型：">
                <el-select disabled v-model="currentBizInfo.com_kind" style="width:100%">
                  <el-option label="食品小作坊" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="经营类别：" required>
                <el-select v-model="currentBizInfo.com_category" style="width:100%" placeholder="请选择">
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
              <el-form-item label="联系人员：">
                <el-input v-model="currentBizInfo.com_contact" placeholder="请输入小作坊联系人姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="currentBizInfo.com_contactphone" placeholder="请输入小作坊联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="固定电话：">
                <el-input v-model="currentBizInfo.com_tel" placeholder="请输入小作坊的固定电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="经度：">
                <el-input v-model.number="currentBizInfo.pos[0]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" :push="2">
              <el-form-item label="纬度：">
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
              <el-form-item label="小作坊地址：">
                <el-input :rows="4" type="textarea" v-model="currentBizInfo.com_address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="登记证证：">
                <el-checkbox v-model="hasLicence" label="有食品小作坊登记证" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-alert show-icon title="如果该小作坊单位有小作坊登记证，那么勾选上面的「有小作坊登记证」复选框，然后在「证书信息」一页输入其证书内容" type="info">
              </el-alert>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="hasLicence" label="小作坊登记证" name="licence">

        <el-form :model="currentBizInfo.licence" label-position="left" style="margin-top:20px;" label-width="170px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="作坊名称:" required>
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_name" placeholder="请输入作坊名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证书编号:" required>
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_code" placeholder="请输入证书编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="经营者姓名:" required>
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_lawer" placeholder="法定代理人或负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会信用代码/身份证号:">
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_socialnum" placeholder="输入社会信用代码或身份证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="生产地址:">
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_business_address" :rows="4" type="textarea" placeholder="请输入小作坊生产地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="食品类别/包装形式:" required>
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_kind" placeholder="输入食品类别和包装形式"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发证机关:" required>
                <el-input :disabled="!edit" v-model="currentBizInfo.lic_send_org" placeholder="输入发证机关"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="许可证有效期：" required>
                <el-date-picker :disabled="!edit" style="width:100%" type="daterange" range-separator="至" start-placeholder="生效日期" end-placeholder="截止" v-model="currentBizInfo.daterange"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="颁发日期：" required>
                <el-date-picker :disabled="!edit" style="width:100%" type="date" placeholder="选择颁发日期" v-model="currentBizInfo.lic_date_send"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="许可证图片：">
                <el-button size="small" @click="viewImg" type="primary" icon="el-icon-view">查看</el-button>
                <el-button :disabled="!edit" size="small" type="primary" icon="el-icon-upload el-icon--right">上传新的图片</el-button>
                <el-button :disabled="!edit" size="small" type="danger" plain icon="el-icon-delete">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="检查记录" name="record">
        <el-row>
          <el-col :span="24">
            <el-table :data="getCheckRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column label="检查时间" sortable></el-table-column>
              <el-table-column label="执法人员"></el-table-column>
              <el-table-column label="执法单位"></el-table-column>
              <el-table-column label="检查类别" sortable></el-table-column>
              <el-table-column label="检查结果" sortable></el-table-column>
              <el-table-column label="处理方式" sortable></el-table-column>
              <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="量化评级记录" name="risk">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRiskRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column label="评级时间" sortable></el-table-column>
              <el-table-column label="评定等级" sortable></el-table-column>
              <el-table-column label="评定人员"></el-table-column>
              <el-table-column label="评定单位"></el-table-column>
              <el-table-column label="操作" min-width="80px">
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
              <el-table-column label="执法人员"></el-table-column>
              <el-table-column label="执法单位"></el-table-column>
              <el-table-column label="处罚时间"></el-table-column>
              <el-table-column label="检查类别"></el-table-column>
              <el-table-column label="是否整改"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
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

    <el-dialog width="35" title="小作坊登记证" v-if="popup" :visible.sync="popup">
      <img src="@/assets/img/xiaozuofang1.png" />
      <div slot="footer">
        <el-button type="primary" size="small" icon="el-icon-printer">打印</el-button>
        <el-button type="primary" size="small" icon="el-icon-download">下载</el-button>
        <el-button size="small" @click="popup = false">关闭</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { getBizByID } from "@/api/old_biz.js";
import department from "@/api/old_area.js";

export default {
  name: "base_singleworkshop",

  data() {
    return {
      department,
      tab: "base",
      edit: null,
      isNew: null,
      kind: null,
      title: null,
      hasLicence: null,

      currentBizInfo: null,
      originBizInfo: null,

      popup: false
    };
  },

  beforeMount() {
    this.init();
  },

  beforeRouteUpdate(to, from, next) {
    this.init();
    next();
  },

  methods: {
    init() {
      let bizid = this.$route.params.bizid.trim();

      this.currentBizInfo = {
        com_name: "",
        com_state: 1,
        com_category: "",
        com_kind: "",
        com_address: "",
        area: [],
        com_contact: "",
        com_contactphone: "",
        com_tel: "",

        lic_code: "",
        lic_name: "",
        lic_socialnum: "",
        lic_supervise_org: "",
        lic_supervise_staff: "",
        lic_send_org: "",
        lic_business_address: "",
        lic_register_address: "",
        lic_kind: "",
        lic_date_send: "",
        lic_date_start: "",
        lic_date_end: "",

        pos: [null, null],
        daterange: ["", ""]
      };

      if (bizid === "new") {
        this.title = "新增小作坊";
        this.hasLicence = false;
        this.isNew = true;
        this.edit = true;
      } else {
        let bizInfo = getBizByID(bizid);
        bizInfo.pos = [null, null];
        bizInfo.daterange = ["", ""];

        if (bizInfo.area) {
          bizInfo.area = department.getAreaIDArray(bizInfo.area);
        }

        if (bizInfo.com_gps) {
          let [x, y] = bizInfo.com_gps.split(",");
          bizInfo.pos = [Number(x.trim()), Number(y.trim())];
        }

        if (bizInfo.lic_date_start || bizInfo.lic_date_end) {
          bizInfo.daterange = [bizInfo.lic_date_start, bizInfo.lic_date_end];
        }

        this.currentBizInfo = bizInfo;

        this.originBizInfo = copy(this.currentBizInfo);
        this.originBizInfo.area = copy(this.currentBizInfo.area);

        this.title = this.originBizInfo.com_name;
        this.hasLicence =
          this.originBizInfo.lic_code && this.originBizInfo.lic_code.length > 0;

        this.isNew = false;
        this.edit = false;
      }
    },

    editOK() {},

    editCancel() {
      this.currentBizInfo = copy(this.originBizInfo);
      this.hasLicence =
        this.originBizInfo.lic_code && this.originBizInfo.lic_code.length > 0;
      this.edit = false;
      this.tab = "base";
    },

    viewImg() {
      this.popup = true;
    },

    getRectifyRecord() {
      return [];
    },
    getCheckRecord() {
      return [];
    },
    getRiskRecord() {
      return [];
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
