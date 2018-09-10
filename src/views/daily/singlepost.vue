<template>
  <div id="daily_singleplan">
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
                <el-select disabled style="width:100%;" v-model="plan.templateid">
                  <el-option v-for="item of $store.state.template.map(t=>({id:t.id,name:t.name}))" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-button @click="$router.push('/base/template/'+plan.templateid)" type="text">查看模板</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="接收时间：">
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

      <el-tab-pane label="选择企业单位" name="biz">
        <el-form label-position="left" style="margin-top:20px;" label-width="90px">

          <el-row style="margin-bottom:20px;" :gutter="15">
            <el-col :span="16">
              <el-alert title="请在该次检查任务需检查/抽查的企业单位左侧的复选框打钩。选择完成后点击「确认任务分派」选项卡" type="info" :closable="false" show-icon>
              </el-alert>
            </el-col>
            <el-col :span="4">
              <el-tag>
                <strong>已选择{{bizSelection?bizSelection.length:0}}家企业单位</strong>
              </el-tag>
            </el-col>
          </el-row>

          <el-row type="flex" :gutter="15">
            <el-col :span="6">
              <el-input size="small" v-model="bizSearch.text" clearable placeholder="搜索单位名/联系方式/许可证号等" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="bizSearch.kind" clearable placeholder="选择类别">
                <el-option value="食品销售">食品销售</el-option>
                <el-option value="食品生产">食品生产</el-option>
                <el-option value="餐饮服务">餐饮服务</el-option>
                <el-option value="保健食品生产">保健食品生产</el-option>
                <el-option value="小作坊">小作坊</el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select size="small" v-model="bizSearch.state" clearable placeholder="选择状态">
                <el-option label="激活" :value="1"></el-option>
                <el-option label="停用" :value="2"></el-option>
              </el-select>
            </el-col>

            <el-col :span="5">
              <el-cascader size="small" clearable :show-all-levels="false" :props="{label:'name',value:'id'}" v-model="bizSearch.grid" :options="$store.state.gridarea.gridarea" placeholder="按网格筛选" change-on-select></el-cascader>
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
                <el-table-column prop="name" label="企业名称" sortable></el-table-column>
                <el-table-column prop="kind" label="类型" sortable></el-table-column>
                <el-table-column label="网格区域" sortable>
                  <template slot-scope="scope">
                    {{$store.state.gridarea.findArea(scope.row.area).name}}
                  </template>
                </el-table-column>
                <el-table-column prop="contact" label="联系人" sortable></el-table-column>
                <el-table-column prop="tel" label="联系电话"></el-table-column>
                <el-table-column label="许可证编号">
                  <template slot-scope="scope">
                    <span v-if="scope.row.licence">{{scope.row.licence.num}}</span>
                    <el-tag v-else>暂无许可证</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="licence.responsible" label="法人" sortable></el-table-column>
                <el-table-column label="状态" sortable>
                  <template slot-scope="scope">
                    <el-tag size="small" :type="getBizStateType(scope.row.state)">{{scope.row.state|bizStateText}}</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row style="margin-top:20px;">
            <el-pagination :current-page.sync="bizTable.page" :page-size="bizTable.pageSize" background layout="total, prev, pager, next" :total="bizTableData.length">
            </el-pagination>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="确认任务分派" name="confirm">
        <el-form label-position="left" label-width="100px">

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="任务标题：">
                <el-input disabled v-model="currentTask.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="10">
              <el-form-item label="执行期限：">
                <el-date-picker v-model="currentTask.limit" type="daterange" range-separator="至" disabled>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item label="详细描述：">
                <el-input v-model="currentTask.desc" resize="none" disabled :rows="4" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="8">
              <el-form-item label="分派时间：">
                <el-date-picker type="datetime" disabled v-model="currentTask.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="20">
              <el-form-item label="分派情况：">
                <el-tag size="mini" style="margin-left:5px;margin-bottom:5px;" v-for="item of confirmData" :key="item.id">{{item.name}}</el-tag>
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
  </div>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "daily_singleplan",
  data() {
    return {
      title: null,
      tab: "info",

      plan: null,
      task: null,
      currentTask: null,

      bizSelection: [],

      bizSearch: {
        text: "",
        kind: "",
        state: "",
        grid: []
      },
      currentBizSearch: {
        text: "",
        kind: "",
        state: "",
        grid: []
      },
      bizTable: {
        page: 1,
        pageSize: 10
      }
    };
  },

  filters: {
    bizStateText(text) {
      return text == 1 ? "激活" : "注销";
    }
  },

  beforeMount() {
    this.init();
  },

  computed: {
    bizTableData() {
      let bizTableData = this.$store.state.biz;

      if (
        this.currentBizSearch.text &&
        this.currentBizSearch.text.trim().length > 0
      ) {
        let searchText = this.currentBizSearch.text;
        bizTableData = bizTableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.kind.includes(searchText) ||
            t.contact.includes(searchText) ||
            (t.licence && t.licence.name.includes(searchText))
        );
      }

      if (this.currentBizSearch.state && this.currentBizSearch.state != "") {
        bizTableData = bizTableData.filter(
          t => t.state === this.currentBizSearch.state
        );
      }

      if (this.currentBizSearch.kind && this.currentBizSearch.kind != "") {
        bizTableData = bizTableData.filter(
          t => t.kind === this.currentBizSearch.kind
        );
      }

      if (this.currentBizSearch.grid && this.currentBizSearch.grid.length > 0) {
        let gridSearch = this.currentBizSearch.grid.join(",").trim();
        bizTableData = bizTableData.filter(t =>
          this.$store.state.gridarea
            .findAreaIDArray(t.area)
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
        id: t.id,
        name: t.name
      }));
    }
  },

  methods: {
    init() {
      let planid = copy(this.$route.params.postid);

      this.plan = copy(this.$store.state.plan.find(t => t.id == planid));
      this.task = copy(
        this.$store.state.task.find(
          t =>
            t.planid == planid &&
            t.department == this.$store.state.current.staff.departmentid
        )
      );
      this.currentTask = {
        title: "",
        date: null,
        limit: [],
        desc: ""
      };
      this.title = this.plan.title;
    },

    getBizStateType(state) {
      switch (state) {
        case 1:
          return "success";
        case 2:
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
