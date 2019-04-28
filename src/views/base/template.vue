<template>
  <el-row id="base_template">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/template">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>模板管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-row class="title">检查模板管理</el-row>
          <el-row class="action" :gutter="15">
            <el-col :span="3">
              <router-link to="/base/template/new">
                <el-button
                  style="width:100%;"
                  size="small"
                  type="primary"
                  icon="el-icon-plus"
                >新建常规检查模板</el-button>
              </router-link>
            </el-col>

            <el-col :span="3">
              <router-link to="/base/risktemplate/new">
                <el-button size="small" type="primary" icon="el-icon-plus">新建风险量化模板</el-button>
              </router-link>
            </el-col>
          </el-row>

          <el-row type="flex" :gutter="15">
            <el-col :span="6">
              <el-input
                v-model="search.text"
                size="small"
                clearable
                placeholder="搜索模板名/创建人等"
                prefix-icon="el-icon-search"
              ></el-input>
            </el-col>

            <el-col :span="4">
              <el-select size="small" v-model="search.kind" clearable placeholder="按类别筛选">
                <el-option v-for="(v,k) in templateKind" :key="k" :label="v" :value="k"></el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-select size="small" v-model="search.state" clearable placeholder="按状态筛选">
                <el-option label="激活" :value="1"></el-option>
                <el-option label="停用" :value="2"></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-top: -10px;">
            <el-col :span="24">
              <el-table :data="pageData" v-loading="loading" size="medium" style="width: 100%">
                <el-table-column prop="name" label="模板名称" sortable min-width="120px;"></el-table-column>
                <el-table-column prop="kind" label="类别" sortable>
                  <template slot-scope="scope" :type="getKindTag(scope.row.kind)">
                    <el-tag
                      size="small"
                      :type="scope.row.kind==='daily'?'primary':'warning'"
                    >{{scope.row.kind | kindText}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="_dep.name" label="制定部门" sortable></el-table-column>
                <el-table-column prop="_staff.name" label="制定人" sortable></el-table-column>
                <el-table-column prop="date" label="创建日期" align="center" sortable></el-table-column>
                <el-table-column label="状态" align="center">
                  <template slot-scope="scope">
                    <el-tag
                      size="small"
                      :type="getStateTag(scope.row.state)"
                    >{{scope.row.state|stateText}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" min-width="90px">
                  <template slot-scope="scope">
                    <el-button
                      @click="$router.push(`${scope.row.kind=='risk'?'risk':''}template/${scope.row._id}`)"
                      size="mini"
                      type="primary"
                    >查看 / 编辑</el-button>
                    <el-button @click="deleteDialog=scope.row" size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <el-row>
            <el-pagination
              background
              :current-page.sync="templateTable.page"
              :page-sizes="templateTable.pageSizes"
              :page-size="templateTable.pageSize"
              layout="total, prev, pager, next, sizes"
              :total="tableData.length"
            ></el-pagination>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="确认删除" v-if="deleteDialog" :visible="true" width="30%">
      <span>确定要删除检查模板 {{deleteDialog.name}} 吗？</span>
      <br>
      <span>之前使用过该模板的检查记录将不受影响。此操作无法复原。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog=null" type="normal">取消</el-button>
        <el-button @click="deleteTemplate()" type="danger">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { templateState, templateKind, template, del } from "@/api/template";
import { staff } from "@/api/staff";
import { dep } from "@/api/dep";

export default {
  name: "base_template",

  data() {
    return {
      templateData: [],
      depData: [],
      staffData: [],

      loading: true,
      deleteDialog: null,

      search: {
        text: "",
        state: null,
        kind: null
      },
      templateTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      templateKind
    };
  },

  async beforeMount() {
    await this.init();
  },

  filters: {
    stateText(state) {
      return templateState(state);
    },

    kindText(kind) {
      return templateKind(kind);
    }
  },

  methods: {
    async init() {
      this.loading = true;
      this.depData = (await dep()).data;
      this.staffData = (await staff()).data;

      let currentTemplate = (await template()).data;
      currentTemplate.forEach(template => {
        template["_staff"] = this.staffData.find(t => t._id === template.staff);
      });
      currentTemplate.forEach(template => {
        template["_dep"] = this.depData.find(t => t._id === template.dep);
      });

      this.templateData = currentTemplate;
      this.loading = false;
    },

    getStateTag(state) {
      return ["danger", "success"][state];
    },

    getKindTag(kind) {
      return kind === "daily" ? "normal" : "warning";
    },

    async deleteTemplate() {
      if (!this.deleteDialog) {
        return;
      }
      await del(this.deleteDialog._id);
      this.deleteDialog = null;
      this.init();
    }
  },

  computed: {
    tableData() {
      let tableData = this.templateData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t._dep.name.includes(searchText) ||
            t._staff.name.includes(searchText)
        );
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state === this.search.state);
      }

      if (this.search.kind && this.search.kind != "") {
        tableData = tableData.filter(t => t.kind === this.search.kind);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.templateTable.page - 1) * this.templateTable.pageSize,
        this.templateTable.page * this.templateTable.pageSize
      );
    }
  }
};
</script>