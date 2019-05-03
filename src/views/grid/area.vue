<template>
  <el-row id="grid_area">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/grid/department">网格化管理</el-breadcrumb-item>
      <el-breadcrumb-item>行政机构管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">行政机构管理</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="3">
        <router-link to="department/new">
          <el-button style="width:100%;" type="primary" size="small" icon="el-icon-plus">新建行政机构</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          clearable
          v-model="search.text"
          size="small"
          placeholder="搜索机构名称/代码等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="3">
        <el-select v-model="search.state" size="small" clearable placeholder="按状态筛选">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="0"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table v-loading="loading" :data="pageData" size="medium" style="width: 100%">
          <el-table-column prop="code" label="机构代码" sortable></el-table-column>
          <el-table-column prop="name" label="行政机构主体名称" sortable></el-table-column>
          <el-table-column label="行政单位级别">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row._rel.length}}级机构</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" sortabl>
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="getStateType(scope.row.state)"
              >{{depState(scope.row.state)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="110px">
            <template slot-scope="scope">
              <el-button
                @click="$router.push('department/'+scope.row._id)"
                size="mini"
                type="primary"
              >查看 / 编辑</el-button>
              <el-button
                :disabled="scope.row._rel.length===1"
                @click="deleteDialog=scope.row"
                size="mini"
                type="danger"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        @size-change="t=>depTable.pageSize=t"
        background
        :current-page.sync="depTable.page"
        :page-sizes="depTable.pageSizes"
        :page-size="depTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>

    <el-dialog title="确认删除" v-if="deleteDialog" :visible="true" width="30%">
      <span>确定要删除行政机构 {{deleteDialog.name}} 吗？</span>
      <br>
      <span>所有对该行政机构的引用信息将全部更新为其上级机构（例如：职员、政策法规等）。此操作无法复原。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog=null" type="normal">取消</el-button>
        <el-button @click="deleteDep()" type="danger">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { dep, del, depState } from "@/api/dep.js";

export default {
  name: "grid_area",

  data() {
    return {
      depData: [],
      loading: true,

      search: {
        text: "",
        state: ""
      },
      depTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      depState,

      deleteDialog: null
    };
  },

  async beforeMount() {
    await this.init();
  },

  methods: {
    async init() {
      this.loading = true;
      this.depData = (await dep()).data;
      this.loading = false;
    },

    getStateType(state) {
      return ["danger", "success"][state];
    },

    async deleteDep() {
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
      let tableData = this.depData;
      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t => t.name.includes(searchText) || t.code.includes(searchText)
        );
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state === this.search.state);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.depTable.page - 1) * this.depTable.pageSize,
        this.depTable.page * this.depTable.pageSize
      );
    }
  }
};
</script>
