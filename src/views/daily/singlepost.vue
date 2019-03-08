<template>
  <el-row id="daily_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">任务分派</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab" type="border-card">
      <el-tab-pane label="计划说明" name="info">
        <el-row :gutter="15" style="margin-bottom:15px;">
          <el-col :span="16">
            <el-alert title="本页展示的是市局下发的计划内容，无法修改。分派具体的任务和检查的企业、人员，请点击上方的任务制定和任务分派页" :closable="false" type="info">
            </el-alert>
          </el-col>
        </el-row>

        <el-form label-position="left" label-width="100px">
          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="计划标题：">
                <el-input v-model="plan.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="类别：">
                <el-select style="width:100%;" disabled v-model="plan.kind">
                  <el-option label="日常检查" value="daily"></el-option>
                  <el-option label="专项检查" value="special"></el-option>
                  <el-option label="全量检查(风险评级)" value="risk"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="制定日期：">
                <el-date-picker disabled style="width:100%;" type="date" v-model="plan.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="使用模板：">
                <el-select disabled style="width:100%;" v-model="plan.template">
                  <el-option v-for="item of getTemplates().map(t=>({id:t.id,name:t.name}))" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-button @click="$router.push('/base/template/'+plan.template)" type="text">查看模板</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="接收日期：">
                <el-date-picker disabled style="width:100%;" type="datetime" v-model="task.recive"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行期限：">
                <el-date-picker style="width:100%;" v-model="plan.limit" disabled type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="备注：">
                <el-input v-model="plan.remark" :rows="4" type="textarea" resize="none" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="任务制定" name="plan">
        <el-form label-position="left" label-width="100px">

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="任务标题：" required>
                <el-input v-model="currentTask.title" placeholder="请输入任务标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="10">
              <el-form-item label="执行期限：" required>
                <el-date-picker v-model="currentTask.limit" type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15" style="margin-bottom:20px;">
            <el-col :span="16">
              <el-alert title="分派任务的期限不能超出计划的期限" type="info" :closable="false" show-icon>
              </el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="详细描述：">
                <el-input v-model="currentTask.desc" resize="none" placeholder="请输入任务的详细说明" :rows="4" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="分派时间：" required>
                <el-date-picker type="datetime" placeholder="设置该计划的分派时间" v-model="currentTask.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="选择食品单位" name="biz">
        <el-form label-position="left" style="margin-top:10px;" label-width="90px">

          <el-row style="margin-bottom:35px;">
            <el-tag>
              <strong>已选择 {{bizSelection?bizSelection.length:0}} 家企业单位</strong>
            </el-tag>
          </el-row>

          <el-row style="margin-bottom:20px;" :gutter="15">
            <el-col :span="16">
              <el-alert title="请在该次检查任务需检查/抽查的单位左侧的复选框打钩。选择完成后点击「确认任务分派」选项卡" type="info" :closable="false" show-icon>
              </el-alert>
            </el-col>
          </el-row>

          <el-row type="flex" :gutter="15">
            <el-col :span="6">
              <el-input size="small" v-model="bizSearch.text" clearable placeholder="搜索单位名/联系方式/许可证号等" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="4">
              <el-cascader size="small" clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="bizSearch.grid" :options="department.getArea()" placeholder="按网格筛选" change-on-select></el-cascader>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="bizSearch.kind" clearable placeholder="类别">
                <el-option label="食品经营" value="1"></el-option>
                <el-option label="食品小作坊" value="2"></el-option>
                <el-option label="网上商家" value="3"></el-option>
                <el-option label="餐饮服务" value="4"></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="bizSearch.category" clearable placeholder="经营种类">
                <el-option label="餐馆" value="餐馆"></el-option>
                <el-option label="快餐店" value="快餐店"></el-option>
                <el-option label="小吃店" value="小吃店"></el-option>
                <el-option label="饮品店" value="饮品店"></el-option>
                <el-option label="食堂" value="食堂"></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="bizSearch.state" clearable placeholder="状态">
                <el-option label="正常" value="1"></el-option>
                <el-option label="关闭" value="0"></el-option>
              </el-select>
            </el-col>

            <el-col :span="4" style="margin-left:auto;display:flex;justify-content:flex-end;">
              <el-button @click="bizSearchSubmit" size="small" round type="primary" icon="el-icon-search">搜索</el-button>
              <el-button @click="bizSearchReset" size="small" round>重置</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-table :row-key="'id'" @selection-change="bizTableSelect" :data="bizPageData" size="medium" style="width: 100%;">
                <el-table-column :reserve-selection="true" type="selection" width="40px"></el-table-column>
                <el-table-column prop="com_name" label="企业名称" sortable></el-table-column>
                <el-table-column label="类型" sortable>
                  <template slot-scope="scope">
                    {{scope.row.com_kind | bizKindText}}
                  </template>
                </el-table-column>
                <el-table-column label="行政区域" sortable>
                  <template slot-scope="scope">
                    {{department.getAreaByID(scope.row.area).name}}
                  </template>
                </el-table-column>
                <el-table-column prop="com_contact" label="联系人" sortable></el-table-column>
                <el-table-column prop="com_contactphone" label="联系电话"></el-table-column>
                <el-table-column label="许可证编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.lic_code">{{scope.row.lic_code}}</span>
                    <el-tag v-else>暂无许可证</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="lic_lawer" label="法人" sortable></el-table-column>
                <el-table-column label="状态" sortable>
                  <template slot-scope="scope">
                    <el-tag size="small" :type="getBizStateType(scope.row.com_state)">{{scope.row.com_state|bizStateText}}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row style="margin-top:10px;">
            <el-pagination background @size-change="t=>bizTableData.pageSize=t" :current-page.sync="bizTableData.page" :page-sizes="bizTableData.pageSizes" :page-size="bizTableData.pageSize" layout="total, prev, pager, next, sizes" :total="bizPageData.length">
            </el-pagination>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="确认任务分派" name="confirm">
        <el-form label-position="left" label-width="100px">
          <el-row :gutter="15">
            <el-col :span="20">
              <el-form-item label="检查的个体：">
                <el-tag size="mini" style="margin-left:5px;margin-bottom:5px;" v-for="item of confirmData" :key="item.id">{{item.name}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="20">
              <el-form-item label="分派给人员：">
                <el-tag size="mini" style="margin-left:5px;margin-bottom:5px;" v-for="item of staffData" :key="item.id">{{item.name}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <el-row>
          <el-col :span="24">
            <el-button icon="el-icon-check" type="primary">确认分派</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import department from "@/api/old_area.js";
import { getTemplates } from "@/api/old_template.js";
import { getAllBizs } from "@/api/old_biz.js";
import { getTaskItems, getTaskItem } from "@/api/old_task.js";
import { getPlanByID } from "@/api/old_plan.js";
import { getAllStaffs } from "@/api/old_staff.js";

export default {
  name: "daily_singleplan",

  data() {
    return {
      department,
      getTemplates,
      title: null,
      tab: "info",

      plan: null,
      task: null,
      currentTask: null,

      bizData: [],

      bizSelection: [],

      bizSearch: {
        text: "",
        kind: "",
        state: "",
        category: "",
        grid: []
      },
      currentBizSearch: {
        text: "",
        kind: "",
        state: "",
        category: "",
        grid: []
      },
      bizTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    bizStateText(text) {
      return text == 1 ? "正常" : "关闭";
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
  },

  beforeMount() {
    this.init();
  },

  computed: {
    bizTableData() {
      let bizTableData = copy(this.bizData);

      if (
        this.currentBizSearch.text &&
        this.currentBizSearch.text.trim().length > 0
      ) {
        let searchText = this.currentBizSearch.text;
        bizTableData = bizTableData.filter(
          t =>
            t.com_name.includes(searchText) ||
            t.com_kind.includes(searchText) ||
            t.com_contact.includes(searchText) ||
            (t.lic_code && t.lic_code.includes(searchText))
        );
      }

      if (this.currentBizSearch.state && this.currentBizSearch.state != "") {
        bizTableData = bizTableData.filter(
          t => t.com_state === this.currentBizSearch.state
        );
      }

      if (this.currentBizSearch.kind && this.currentBizSearch.kind != "") {
        bizTableData = bizTableData.filter(
          t => t.com_kind === this.currentBizSearch.kind
        );
      }

      if (
        this.currentBizSearch.category &&
        this.currentBizSearch.category != ""
      ) {
        bizTableData = bizTableData.filter(
          t => t.com_category === this.currentBizSearch.category
        );
      }

      if (this.currentBizSearch.grid && this.currentBizSearch.grid.length > 0) {
        let gridSearch = this.currentBizSearch.grid.join(",").trim();
        bizTableData = bizTableData.filter(t =>
          department
            .getAreaIDArray(t.area)
            .join(",")
            .trim()
            .includes(gridSearch)
        );
      }

      return bizTableData;
    },

    bizPageData() {
      return this.bizTableData.slice(
        (this.bizTable.page - 1) * this.bizTable.pageSize,
        this.bizTable.page * this.bizTable.pageSize
      );
    },

    confirmData() {
      return this.bizSelection.map(t => ({
        id: t.com_id,
        name: t.com_name
      }));
    },

    staffData() {
      let list = [];
      getAllStaffs().forEach(t => {
        let staffAreaArray = department.getAreaIDArray(t.area);
        let currentAreaArray = department.getAreaIDArray(
          this.$store.state.currentUser.area
        );
        if (
          staffAreaArray.length > currentAreaArray.length &&
          staffAreaArray.join(",").includes(currentAreaArray.join(","))
        ) {
          list.push({
            id: t.id,
            name: t.name
          });
        }
      });

      return list;
    }
  },

  methods: {
    init() {
      let planid = this.$route.params.postid;

      this.plan = getPlanByID(planid);
      this.task = getTaskItem(planid, this.$store.state.currentUser.area);
      this.currentTask = {
        title: "",
        date: null,
        limit: [],
        desc: ""
      };
      this.title = this.plan.title;

      this.bizData = getAllBizs();
    },

    getBizStateType(state) {
      switch (state) {
        case "1":
        case 1:
          return "success";
        case "0":
        case 0:
          return "danger";
        default:
          return "info";
      }
    },

    bizSearchSubmit() {
      Object.assign(this.currentBizSearch, this.bizSearch);
    },

    bizSearchReset() {
      this.bizSearch = {
        text: "",
        kind: "",
        state: "",
        category: "",
        grid: []
      };
      this.bizSearchSubmit();
    },

    bizTableSelect(selection) {
      this.bizSelection = selection;
    }
  }
};
</script>

<style lang="scss">
#daily_singleplan {
  .el-row {
    margin-bottom: 0;
  }

  .ok-table-row {
    background: #f0f9eb;
  }

  .error-table-row {
    background: oldlace;
  }

  .el-badge__content {
    top: 19px;
    right: -5px;
  }
}
</style>
