<template>
  <el-row id="risk_singlerisk">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/risk">量化分级</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}} ({{riskYear}}年度记录)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}} ({{riskYear}}年度记录)</el-row>

    <el-form v-if="currentRisk" label-position="left" style="margin-top:20px;" label-width="100px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">
        企业单位信息
        <router-link :to="`/base/biz/${currentRisk.biz.id}`">
          <el-button type="text" size="mini">前往查看</el-button>
        </router-link>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="单位名:">
            <el-input :value="currentRisk.biz.com_name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="许可证编号:">
            <el-input :value="currentRisk.biz.lic_code" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="负责人:">
            <el-input :value="currentRisk.biz.lic_lawer" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位类型:">
            <el-input :value="bizKindText(currentRisk.biz.com_kind)" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="经营类别:">
            <el-input :value="currentRisk.biz.com_category" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="联系人:">
            <el-input :value="currentRisk.biz.com_contact" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="联系电话:">
            <el-input :value="currentRisk.biz.com_contact" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查现场记录</el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="检查结果:">
            <el-tag>{{currentRisk.level}} | {{currentRisk.point}}</el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="使用模板:">
            <el-input :value="currentTemplate.name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="检查人:">
            <el-input :value="currentRisk.staffinfo" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="检查时间:">
            <el-input :value="currentRisk.date" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">详细结果</el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="模板名:">
            <el-input :value="currentTemplate.name" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="餐饮服务:">
            <el-input :value="currentRisk.type" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="选项情况:">
            <el-tag>已选项/总选项： {{itemCount.current}} / {{itemCount.sum}}</el-tag>
            <el-tag>实得分/应得分： {{itemCount.currentPoint.toFixed(1)}} / {{itemCount.sumPoint.toFixed(1)}}</el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最终得分:">
            <el-tag>
              <strong>{{getResultPoint.toFixed(1)}}</strong>
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="22">
          <el-table
            :data="riskData"
            :span-method="dataSpan"
            size="medium"
            border
            style="width: 100%;margin-bottom:20px;"
          >
            <el-table-column label="评级项目" width="140px">
              <template slot-scope="scope">
                <el-tag style="margin:4px;" size="mini">{{scope.row.i+1}}</el-tag>
                {{scope.row.item}}
              </template>
            </el-table-column>
            <el-table-column label="项目内容">
              <template slot-scope="scope">
                <el-tag style="margin:4px;" size="mini">{{scope.row.i+1}}.{{scope.row.j+1}}</el-tag>
                {{scope.row.detail}}
              </template>
            </el-table-column>
            <el-table-column label="权重" width="80px">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.cent" type="info" size="medium">{{scope.row.cent}}%</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="评价" width="120px">
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.result"
                  :type="getType(scope.row.result.checked)"
                  size="medium"
                >{{scope.row.result.checked|checkedText}} {{scope.row.result.point}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="换算得分" width="120px">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.result" size="medium">
                  <strong>{{getPoint(scope.row.cent,scope.row.result.point).toFixed(1)}}</strong>
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: "risk_singlerisk",

  data() {
    return {
      riskid: null,
      bizData: [],
      riskYear: null,
      edit: false
    };
  },

  beforeMount() {
    this.init();
  },

  filters: {
    checkedText(result) {
      if (result === null || result === undefined) {
        return "";
      }
      return result ? "是 |" : "否 |";
    }
  },

  computed: {
    itemCount() {
      let sum = 0,
        sumPoint = 0,
        current = 0,
        currentPoint = 0;

      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];
          if (templateItem.risk[this.currentRisk.type]) {
            sum++;
            sumPoint += templateItem.risk[this.currentRisk.type];
          }
          if (this.currentRisk.detail[`${i + 1}.${j + 1}`]) {
            current++;
            currentPoint +=
              (this.currentRisk.detail[`${i + 1}.${j + 1}`].point *
                templateItem.risk[this.currentRisk.type]) /
              100;
          }
        }
      }

      return {
        sum,
        sumPoint,
        current,
        currentPoint
      };
    },

    riskData() {
      let result = [];
      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];

          let item = {
            i,
            j,
            detail: templateItem.content,
            cent: templateItem.risk[this.currentRisk.type],
            result: this.currentRisk.detail[`${i + 1}.${j + 1}`]
          };

          if (j === 0) {
            item.item = template[i].title;
            item.rowspan = template[i].children.length;
          }

          result.push(item);
        }
      }

      return result;
    },

    getResultPoint() {
      return (this.itemCount.currentPoint / this.itemCount.sumPoint) * 100;
    },

    currentRisk() {
      if (this.bizData.length <= 0) {
        return null;
      }

      let risk = null;

      Object.entries(getAllRisks()).forEach(([key, value]) => {
        let riskYear = this.riskYear;
        value.forEach(t => {
          if (t.id == this.riskid) {
            risk = copy(t);
            riskYear = Number(key);
            return false;
          }
        });
      });

      risk.biz = this.bizData.find(biz => biz.com_id == risk.bizid);
      risk.department = getAreaByID(risk.biz.area).name;
      risk.staffinfo = getStaffByID(risk.staff).name;

      risk.currentTemplate = getTemplateByID(risk.templateid);
      return risk;
    },

    currentTemplate() {
      if (this.currentRisk) {
        return this.currentRisk.currentTemplate;
      }
      return null;
    },

    title() {
      if (this.currentRisk && this.currentRisk.biz) {
        return this.currentRisk.biz.com_name;
      }
      return "";
    }
  },

  methods: {
    init() {
      this.riskid = this.$route.params.riskid;
      this.bizData = getAllBizs();
    },

    getPoint(cent, point) {
      return (cent * point) / 100.0;
    },

    getType(result) {
      if (result === null || result === undefined) {
        return "primary";
      }
      return result ? "success" : "danger";
    },

    dataSpan({ row, columnIndex }) {
      if (columnIndex !== 0) {
        return;
      }

      return {
        colspan: row.rowspan ? 1 : 0,
        rowspan: row.rowspan || 0
      };
    },

    bizKindText(kind) {
      switch (kind) {
        case "1":
          return "食品经营";
        case "2":
          return "食品小作坊";
        case "3":
          return "网上商家";
        case "4":
          return "餐饮服务";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.collapse-item {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
