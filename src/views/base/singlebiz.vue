<template>
  <div id="base_singlebiz">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/biz">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="基本信息" name="base">

        <el-form label-position="left"  :model="currentBizInfo.base" style="margin-top:20px;" label-width="90px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称:">
                <el-input v-model="currentBizInfo.base.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="激活状态:">
                <el-radio-group v-model="currentBizInfo.base.active">
                  <el-radio :label="true">启用</el-radio>
                  <el-radio :label="false">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="企业类型:">
                <el-select v-model="currentBizInfo.base.type" placeholder="请选择">
                  <el-option label="食品生产" value="sc"></el-option>
                  <el-option label="食品销售" value="xs"></el-option>
                  <el-option label="餐饮服务" value="cy"></el-option>
                  <el-option label="保健食品生产" value="bj"></el-option>
                  <el-option label="小作坊" value="xzf"></el-option>
                  <el-option label="其他" value="other"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="网格区域:">
                <el-cascader size="medium" :options="gridData" v-model="currentBizInfo.base.grid"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="联系人员:">
                <el-input v-model="currentBizInfo.base.contactname" placeholder="请输入企业联系人姓名"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="联系电话:">
                <el-input v-model="currentBizInfo.base.contacttel" placeholder="请输入企业联系人电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="行政区域:">
                <el-input v-model="currentBizInfo.base.area" placeholder="输入行政区域"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label="地理经度:">
                <el-input v-model="currentBizInfo.base.area" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="3">
              <el-form-item label="纬度:">
                <el-input v-model="currentBizInfo.base.area" placeholder="数值"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址:">
                <el-input :rows="4" type="textarea" v-model="currentBizInfo.base.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="许可信息" name="licence">

        <el-form :model="currentBizInfo.licence" label-position="left" style="margin-top:20px;" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="生产者名称:">
                <el-input v-model="currentBizInfo.licence.producer" placeholder="请输入生产者名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证号:">
                <el-input v-model="currentBizInfo.licence.num" placeholder="请输许可证号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="社会信用代码:">
                <el-input v-model="currentBizInfo.licence.code" placeholder="请输入社会信用代码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日常监管机构:">
                <el-input v-model="currentBizInfo.licence.supervise" placeholder="日常监管机构名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="法定代理人:">
                <el-input v-model="currentBizInfo.licence.responsible" placeholder="法定代理人或负责人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日常监管人员:">
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
              <el-form-item label="发证机关:">
                <el-input v-model="currentBizInfo.licence.issue" placeholder="输入发证机关"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="许可证颁发日期:">
                <el-date-picker type="date" placeholder="选择颁发日期" v-model="currentBizInfo.licence.licenceissue"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="许可证有效期至:">
                <el-date-picker type="date" placeholder="选择到期日期" v-model="currentBizInfo.licence.licenceuntil"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="检查记录" name="record">
        <el-row>
          <el-col :span="24">
            <el-table :data="currentBizInfo.record" size="medium" stripe style="width: 100%;margin-bottom:25px;" border>
              <el-table-column prop="date" label="检查时间" sortable></el-table-column>
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="grid" label="所属区域"></el-table-column>
              <el-table-column prop="officer" label="执法人员" min-width="80"></el-table-column>
              <el-table-column prop="kind" label="监督检查类别" sortable></el-table-column>
              <el-table-column prop="checkresult" label="检查结果" sortable></el-table-column>
              <el-table-column prop="handleresult" label="处理结果" sortable></el-table-column>
              <el-table-column prop="action" label="操作" width="80">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="风险评级" name="risk">
        <el-row>
          <el-col :span="24">
            <el-table :data="currentBizInfo.risk" size="medium" stripe style="width: 100%;margin-bottom:25px;" border>
              <el-table-column prop="year" label="评级年" min-width="100" sortable></el-table-column>
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="grid" label="所属区域"></el-table-column>
              <el-table-column prop="riskresult" label="评定等级" min-width="110" sortable></el-table-column>
              <el-table-column prop="riskpoint" label="量化评分" min-width="110" sortable></el-table-column>
              <el-table-column prop="officer" label="评定人员" min-width="80"></el-table-column>
              <el-table-column prop="department" label="评定单位" min-width="80"></el-table-column>
              <el-table-column prop="last" label="最后评定于" sortable></el-table-column>
              <el-table-column prop="action" label="操作" min-width="80">
                <template slot-scope="scope">
                  <el-button size="mini">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="整改记录" name="refity">
        <el-row>
          <el-col :span="24">
            <el-table :data="currentBizInfo.refity" size="medium" stripe style="width: 100%;margin-bottom:25px;" border>
              <el-table-column prop="name" label="单位名称" sortable></el-table-column>
              <el-table-column prop="num" label="许可证编号"></el-table-column>
              <el-table-column prop="officer" label="执法人员" min-width="80"></el-table-column>
              <el-table-column prop="department" label="执法单位" min-width="80"></el-table-column>
              <el-table-column prop="kind" label="监督检查类别"></el-table-column>
              <el-table-column prop="isrefity" label="是否整改" min-width="80"></el-table-column>
              <el-table-column prop="isrecheck" label="是否复查" min-width="80"></el-table-column>
              <el-table-column prop="state" label="状态" min-width="100"></el-table-column>
              <el-table-column prop="update" label="更新时间"></el-table-column>
              <el-table-column prop="result" label="检查结果" min-width="100"></el-table-column>
              <el-table-column prop="action" label="操作" min-width="80">
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

  </div>
</template>

<script>
export default {
  name: "base_singlebiz",
  data() {
    return {
      tab: "base",
      currentBizInfo: null,
      title: "",
      gridData: [
        {
          value: "常熟市",
          label: "常熟市",
          children: [
            {
              value: "虞山镇",
              label: "虞山镇",
              children: [
                {
                  value: "食药监分局",
                  label: "食药监分局"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {},
  beforeMount() {
    let bizid = this.$route.params.bizid;

    if (bizid.trim() === "new") {
      let biz = {};
      biz.base = {
        name: "",
        active: true,
        type: null,
        area: "",
        grid: null,
        contactname: "",
        contacttel: "",
        address: ""
      };
      biz.licence = {
        producer: "",
        num: "",
        code: "",
        supervise: "",
        superviser: "",
        responsible: "",
        address: "",
        productaddr: "",
        foodkind: "",
        issue: "",
        licenceissue: "",
        licenceuntil: ""
      };
      biz.record = [
        {
          date: "2018-08-24",
          name: "常吉面馆环城北路店",
          num: "CS-012-12087450",
          grid: "虞山分局",
          officer: "张强",
          kind: "食品生产日常监督检查",
          checkresult: "符合",
          handleresult: "通过"
        }
      ];
      biz.risk = [
        {
          year: "2017",
          name: "常吉面馆环城北路店",
          num: "CS-012-12087450",
          grid: "虞山分局",
          riskresult: "优秀",
          riskpoint: "90",
          officer: "张强",
          department: "虞山分局",
          last: "2017-12-12 12:00"
        }
      ];
      biz.refity = [
        {
          name: "常吉面馆环城北路店",
          num: "CS-012-12087450",
          officer: "王小明",
          department: "虞山分局",
          kind: "食品生产日常监督检查",
          isrefity: "是",
          isrecheck: "是",
          state: "整改完成",
          update: "2018年1月2日 12:00",
          result: "责令整改"
        }
      ];
      this.currentBizInfo = biz;
      this.title = "新增企业";
    } else {
      this.title = this.currentBizInfo.base.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
