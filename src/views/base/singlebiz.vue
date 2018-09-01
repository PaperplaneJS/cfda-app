<template>
  <el-row id="base_singlebiz">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="基本信息" name="base">

        <el-form label-position="left" :model="currentBizInfo" style="margin-top:20px;" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称:" required="">
                <el-input v-model="currentBizInfo.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="激活状态:" required>
                <el-radio-group v-model="currentBizInfo.state">
                  <el-radio :label="1">启用</el-radio>
                  <el-radio :label="2">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="企业类型:" required="">
                <el-select v-model="currentBizInfo.kind" placeholder="请选择">
                  <el-option label="食品生产" value="食品生产"></el-option>
                  <el-option label="食品销售" value="食品销售"></el-option>
                  <el-option label="餐饮服务" value="餐饮服务"></el-option>
                  <el-option label="保健食品生产" value="保健食品生产"></el-option>
                  <el-option label="小作坊" value="小作坊"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="网格区域:" required>
                <el-cascader :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="currentBizInfo.area" :options="$store.state.demoData.gridArea" placeholder="选择网格区域" change-on-select>
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="联系人员:">
                <el-input v-model="currentBizInfo.contact" placeholder="请输入企业联系人姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-input v-model="currentBizInfo.tel" placeholder="请输入企业联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="地理经度:">
                <el-input v-model.number="currentBizInfo.pos[0]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="纬度:">
                <el-input v-model.number="currentBizInfo.pos[1]" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址:">
                <el-input :rows="4" type="textarea" v-model="currentBizInfo.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="许可信息" name="licence">

        <el-form :model="currentBizInfo.licence" label-position="left" style="margin-top:20px;" label-width="130px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="生产者名称:" required>
                <el-input v-model="currentBizInfo.licence.name" placeholder="请输入生产者名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证号:" required>
                <el-input v-model="currentBizInfo.licence.num" placeholder="请输许可证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="社会信用代码:">
                <el-input v-model="currentBizInfo.licence.socialcode" placeholder="请输入社会信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日常监管机构:" required>
                <el-input v-model="currentBizInfo.licence.supervise" placeholder="日常监管机构名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="法定代理人:" required>
                <el-input v-model="currentBizInfo.licence.responsible" placeholder="法定代理人或负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日常监管人员:" required>
                <el-input v-model="currentBizInfo.licence.superviser" placeholder="日常监管人员名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="住所:">
                <el-input v-model="currentBizInfo.licence.address" placeholder="请输入许可证的住所信息"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="生产地址:">
                <el-input v-model="currentBizInfo.licence.productaddr" :rows="4" type="textarea" placeholder="请输入企业生产地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="食品类别:">
                <el-input v-model="currentBizInfo.licence.foodkind" placeholder="输入食品类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发证机关:" required>
                <el-input v-model="currentBizInfo.licence.issue" placeholder="输入发证机关"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="许可证颁发日期:" required>
                <el-date-picker type="date" placeholder="选择颁发日期" v-model="currentBizInfo.licence.licenceissue"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证有效期至:" required>
                <el-date-picker type="date" placeholder="选择到期日期" v-model="currentBizInfo.licence.licenceuntil"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane v-if="!isnew" label="检查记录" name="record">
        <el-row>
          <el-col :span="24">
            <el-table :data="getCheckRecord()" size="medium" style="width: 100%;margin-bottom:25px;" border>
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

      <el-tab-pane v-if="!isnew" label="风险评级" name="risk">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRiskRecord()" size="medium" style="width: 100%;margin-bottom:25px;" border>
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

      <el-tab-pane v-if="!isnew" label="整改记录" name="refity">
        <el-row>
          <el-col :span="24">
            <el-table :data="getRectifyRecord()" size="medium" style="width: 100%;margin-bottom:25px;" border>
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
        <el-button type="primary">提交审核</el-button>
        <router-link to="/base/biz">
          <el-button style="margin-left:20px;">返回企业管理</el-button>
        </router-link>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "base_singlebiz",
  data() {
    return {
      tab: "base",
      isnew: null,
      title: null,
      currentBizInfo: null
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
    }
  },
  beforeMount() {
    let bizid = this.$route.params.bizid;

    if (bizid.trim() === "new") {
      this.currentBizInfo = {
        name: "",
        state: 1,
        kind: "",
        pos: [null, null],
        address: "",
        area: null,
        contact: "",
        tel: "",
        licence: {
          name: "",
          num: "",
          socialcode: "",
          supervise: "",
          superviser: "",
          responsible: "",
          address: "",
          productaddr: "",
          foodkind: "",
          issue: "",
          licenceissue: null,
          licenceuntil: null
        }
      };

      this.title = "新增企业";
      this.isnew = true;
    } else {
      this.currentBizInfo = this.$store.state.demoData.copy(
        this.$store.state.demoData.bizs.find(t => t.id == bizid)
      );

      if (this.currentBizInfo.area) {
        this.currentBizInfo.area = this.$store.state.demoData.findAreaIDArray(
          this.currentBizInfo.area
        );
      }

      this.title = this.currentBizInfo.name;
      this.isnew = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
