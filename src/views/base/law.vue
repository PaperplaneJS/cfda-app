<template>
  <el-row id="base_law">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/base/law">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>法律法规管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">法律法规管理</el-row>
    <el-row class="action" :gutter="15">
      <el-col :span="4">
        <router-link to="law/new">
          <el-button type="primary" size="small" icon="el-icon-plus">新增法律法规</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="15">
      <el-col :span="6">
        <el-input
          v-model="search.text"
          size="small"
          clearable
          placeholder="搜索法律法规名/编号/单位等"
          prefix-icon="el-icon-search"
        ></el-input>
      </el-col>

      <el-col :span="3">
        <el-select size="small" v-model="search.state" clearable placeholder="按状态筛选">
          <el-option label="激活" :value="1"></el-option>
          <el-option label="停用" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row style="margin-top: -10px;">
      <el-col :span="24">
        <el-table :data="pageData" v-loading="loading" size="medium" style="width: 100%">
          <el-table-column prop="num" label="法令法规编号" sortable></el-table-column>
          <el-table-column prop="name" label="法令法规名称" min-width="250px" sortable></el-table-column>
          <el-table-column prop="_dep.name" label="创建单位" sortable></el-table-column>
          <el-table-column prop="date" label="创建日期" align="center" sortable></el-table-column>
          <el-table-column label="状态" align="center" sortable>
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="getStateType(scope.row.state)"
              >{{scope.row.state | stateText}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="110px">
            <template slot-scope="scope">
              <el-button @click="$router.push('law/'+scope.row._id)" size="mini" type="primary">进入查看</el-button>
              <el-button @click="deleteButtonClick(scope.row._id)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-pagination
        background
        :current-page.sync="lawTable.page"
        :page-sizes="lawTable.pageSizes"
        :page-size="lawTable.pageSize"
        layout="total, prev, pager, next, sizes"
        :total="tableData.length"
      ></el-pagination>
    </el-row>

    <el-dialog title="确认删除" v-if="deleteDialog" :visible="true" width="30%">
      <span>确定要删除法律法规 {{deleteDialog.name}} 吗？</span>
      <br>
      <span>此操作无法复原。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog=null" type="normal">取消</el-button>
        <el-button @click="deleteLaw()" type="danger">确定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { law, del, lawState } from "@/api/law";

export default {
  name: "base_law",
  data() {
    return {
      lawData: [],
      depData: [],
      loading: true,

      search: {
        text: "",
        state: null
      },
      lawTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      lawState: lawState(),
      deleteDialog: null
    };
  },

  async beforeMount() {
    await this.init();
  },

  filters: {
    stateText(state) {
      return lawState(state);
    }
  },

  computed: {
    tableData() {
      let tableData = this.lawData;

      if (this.search.text && this.search.text.trim().length > 0) {
        let searchText = this.search.text;
        tableData = tableData.filter(
          t =>
            t.name.includes(searchText) ||
            t.num.includes(searchText) ||
            t._dep.name.includes(searchText)
        );
      }

      if (this.search.state && this.search.state != "") {
        tableData = tableData.filter(t => t.state === this.search.state);
      }

      return tableData;
    },

    pageData() {
      return this.tableData.slice(
        (this.lawTable.page - 1) * this.lawTable.pageSize,
        this.lawTable.page * this.lawTable.pageSize
      );
    }
  },

  methods: {
    async init() {
      this.loading = true;
      let lawList = (await law()).data;
      this.depData = (await dep()).data;

      bizList.forEach(biz => {
        biz["_dep"] = this.depData.find(t => t._id === biz.area);
      });

      this.bizData = bizList;
      this.loading = false;
    },

    deleteButtonClick(law) {
      this.deleteDialog = law;
    },

    async deleteLaw() {
      if (!this.deleteDialog) {
        return;
      }
      await del(this.deleteDialog._id);
      this.init();
    },

    getStateType(state) {
      return ["danger", "success"][state];
    }
  }
};
</script>
