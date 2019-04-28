<template>
  <el-row id="base_singlebiz">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">食品单位</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="基本信息" name="base">
        <el-form
          :model="current"
          :disabled="!edit"
          label-position="left"
          style="margin-top:20px;"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="单位名称：" required>
                <el-input v-model="current.name" placeholder="请输入单位名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="行政区域：" required>
                <el-cascader
                  :show-all-levels="false"
                  :props="{label:'name',value:'_id'}"
                  v-model="current.dep"
                  :options="casecadeDepData"
                  placeholder="选择行政区域"
                  style="width:100%;"
                  change-on-select
                ></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item prop="state" label="个体状态：" required>
                <el-radio-group v-model="current.state">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="企业类型：" required>
                <el-select v-model="current.kind" style="width:100%" placeholder="请选择">
                  <el-option
                    v-for="(name,index) of bizKind"
                    :key="index+1"
                    :label="name"
                    :value="index+1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="经营类别：" required>
                <el-select v-model="current.category" style="width:100%" placeholder="请选择">
                  <el-option v-for="name of bizCategory" :key="name" :label="name" :value="name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="联系人员：" required>
                <el-input v-model="current.contact" placeholder="请输入企业联系人姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：" required>
                <el-input v-model="current.phone" placeholder="请输入企业联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="单位电话：">
                <el-input v-model="current.tel" placeholder="请输入企业单位(座机)电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="经度：">
                <el-input v-model.number="current.gps[0]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6" :push="2">
              <el-form-item label="纬度：">
                <el-input v-model.number="current.gps[1]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-alert show-icon title="经纬度是指百度地图的坐标值，用于在地图上定位商户的位置" type="info"></el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="企业地址：">
                <el-input :rows="4" type="textarea" v-model="current.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="许可证：">
                <el-checkbox @change="licToggle" v-model="hasLicence" label="有许可证" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-alert
                show-icon
                title="如果该企业单位有许可证信息，那么勾选上面的「有许可证」复选框，然后在「许可信息」一页输入其许可证内容"
                type="info"
              ></el-alert>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="hasLicence" label="许可信息" name="licence">
        <el-form
          :disabled="!edit"
          :model="current"
          label-position="left"
          style="margin-top:20px;"
          label-width="130px"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="生产者名称：" required>
                <el-input v-model="current.lic.biz" placeholder="请输入生产者名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证号：" required>
                <el-input v-model="current.lic.code" placeholder="请输许可证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="法定代理人：" required>
                <el-input v-model="current.lic.lawer" placeholder="法定代理人或负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="社会信用代码：">
                <el-input v-model="current.lic.socialnum" placeholder="请输入社会信用代码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="监管机构：" required>
                <el-cascader
                  :show-all-levels="false"
                  :props="{label:'name',value:'_id'}"
                  v-model="current.lic.dep"
                  :options="casecadeDepData"
                  placeholder="选择日常监管机构"
                  style="width:100%;"
                  change-on-select
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="监管人员：" required>
                <el-select
                  v-model="current.lic.staff"
                  :label="currentLicStaff.label"
                  style="width:100%"
                  placeholder="请选择日常监管人员"
                >
                  <el-option-group
                    v-for="group in currentLicStaff"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item of group.options"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="注册地址：">
                <el-input v-model="current.lic.logaddr" placeholder="请输入许可证的注册信息"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="生产地址：">
                <el-input
                  v-model="current.lic.bizaddr"
                  :rows="4"
                  type="textarea"
                  placeholder="请输入企业生产地址"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="发证机关：" required>
                <el-cascader
                  :show-all-levels="false"
                  :props="{label:'name',value:'_id'}"
                  v-model="current.lic.send"
                  :options="casecadeDepData"
                  placeholder="请选择此许可证颁发机关"
                  style="width:100%;"
                  change-on-select
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="颁发日期：" required>
                <el-date-picker
                  style="width:100%"
                  type="date"
                  placeholder="请选择颁发日期"
                  v-model="current.lic.date"
                  value-format="yyyy-M-d"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="许可证有效期：" required>
                <el-date-picker
                  style="width:100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="生效日期"
                  end-placeholder="截止"
                  v-model="current.lic.daterange"
                  value-format="yyyy-M-d"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="检查记录" name="record">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="getCheckRecord()"
              size="medium"
              style="width: 100%;margin-bottom:25px;"
            >
              <el-table-column label="检查时间" sortable></el-table-column>
              <el-table-column label="执法人员"></el-table-column>
              <el-table-column label="执法单位"></el-table-column>
              <el-table-column label="检查类别" sortable></el-table-column>
              <el-table-column label="检查结果" sortable></el-table-column>
              <el-table-column label="处理方式" sortable></el-table-column>
              <el-table-column label="操作" width="80px">
                <el-button size="mini">查看</el-button>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="量化评级" name="risk">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRiskRecord()" size="medium" style="width: 100%;margin-bottom:25px;">
              <el-table-column label="评级时间" sortable></el-table-column>
              <el-table-column label="评定等级" sortable></el-table-column>
              <el-table-column label="评定人员"></el-table-column>
              <el-table-column label="评定单位"></el-table-column>
              <el-table-column label="操作" min-width="80px">
                <el-button size="mini">查看</el-button>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane v-if="!isNew" label="行政处罚记录" name="refity">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="getRectifyRecord()"
              size="medium"
              style="width: 100%;margin-bottom:25px;"
            >
              <el-table-column label="执法人员"></el-table-column>
              <el-table-column label="执法单位"></el-table-column>
              <el-table-column label="处罚时间"></el-table-column>
              <el-table-column label="检查类别"></el-table-column>
              <el-table-column label="是否整改"></el-table-column>
              <el-table-column label="状态"></el-table-column>
              <el-table-column label="操作">
                <el-button size="mini">查看</el-button>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :span="24">
        <el-button @click="edit=true" v-if="!edit" icon="el-icon-edit" type="primary">编辑</el-button>
        <el-button
          @click="editOK"
          v-if="edit"
          icon="el-icon-check"
          type="primary"
        >{{isNew?"提交信息":"完成编辑"}}</el-button>
        <el-button @click="editCancel" v-if="edit&&!isNew" icon="el-icon-close">取消并还原</el-button>
        <router-link to="/base/biz">
          <el-button style="margin-left:20px;">返回食品单位管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils";
import {
  biz,
  emptyBiz,
  emptyLic,
  bizKind,
  bizCategory,
  bizState
} from "@/api/biz";
import { dep } from "@/api/dep";
import { staff, staffByDep } from "@/api/staff";

export default {
  name: "base_singlebiz",

  data() {
    return {
      tab: "base",
      edit: false,
      isNew: false,

      title: "",
      hasLicence: false,

      current: emptyBiz(),
      origin: emptyBiz(),

      depData: [],
      casecadeDepData: [],
      staffData: [],

      bizKind,
      bizCategory
    };
  },

  async beforeMount() {
    await this.init();
  },

  async beforeRouteUpdate(to, from, next) {
    next();
    await this.init();
  },

  methods: {
    async init() {
      const bizid = this.$route.params.bizid;
      this.isNew = bizid === "new";
      this.edit = bizid === "new";

      this.depData = (await dep()).data;
      this.casecadeDepData = (await dep(null, false, true)).data;
      this.staffData = (await staff()).data;

      if (!this.isNew) {
        let currentBiz = (await biz(bizid)).data;
        currentBiz.dep =
          currentBiz.dep && currentBiz.dep !== ""
            ? this.depData.find(dep => dep._id === currentBiz.dep)._rel
            : [];

        if (currentBiz.lic) {
          currentBiz.lic.dep =
            currentBiz.lic.dep && currentBiz.lic.dep !== ""
              ? this.depData.find(dep => dep._id === currentBiz.lic.dep)._rel
              : [];

          currentBiz.lic.send =
            currentBiz.lic.send && currentBiz.lic.send !== ""
              ? this.depData.find(dep => dep._id === currentBiz.lic.send)._rel
              : [];
        }

        this.origin = currentBiz;
      } else {
        this.origin = emptyBiz();
      }
      this.current = copy(this.origin);
      this.title = this.isNew ? "新增食品单位" : this.origin.name;
      this.hasLicence = this.current.lic !== null;
    },

    async editOK() {
      this.origin = (await biz(this.result)).data;

      if (this.isNew) {
        this.$router.push(`/base/biz/${this.origin._id}`);
      } else {
        this.init();
      }
    },

    editCancel() {
      this.current = copy(this.origin);
      this.title = this.origin.name;
      this.hasLicence = this.origin.lic !== null;

      this.tab = "base";
      this.edit = false;
    },

    licToggle(lic) {
      this.current.lic = lic ? emptyLic() : null;
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

  computed: {
    result() {
      let resultBiz = copy(this.current);
      resultBiz.dep = resultBiz.dep.slice(-1)[0];

      if (resultBiz.lic) {
        resultBiz.lic.dep = resultBiz.lic.dep.slice(-1)[0];
        resultBiz.lic.send = resultBiz.lic.send.slice(-1)[0];
      }

      return resultBiz;
    },

    currentLicStaff() {
      const currentDep =
        this.current.lic.dep && this.current.lic.dep.length
          ? this.current.lic.dep.slice(-1)[0]
          : "";

      return [
        {
          label: "当前监管机构职员：",
          options: this.staffData.filter(staff => staff.dep === currentDep)
        },
        {
          label: "不属于当前监管机构的：",
          options: this.staffData.filter(staff => staff.dep !== currentDep)
        }
      ];
    }
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
