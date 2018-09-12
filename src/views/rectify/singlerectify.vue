<template>
  <el-row id="rectify_singlerectify">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/rectify">行政处罚</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentRectify.biz.name}}于{{currentRectify.date}}处罚记录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{currentRectify.biz.name}}</el-row>

    <el-form label-position="left" style="margin-top:20px;" label-width="120px">
      <el-row style="font-size:18px;margin-bottom:15px;" class="section">所属检查计划</el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="所属计划：">
            <el-input disabled v-model="currentRectify.plan.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计划类别：">
            <el-select style="width:100%;" disabled v-model="currentRectify.plan.kind">
              <el-option label="日常检查" value="daily"></el-option>
              <el-option label="专项检查" value="special"></el-option>
              <el-option label="全量检查(风险评级)" value="risk"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="下发日期：">
            <el-date-picker style="width:100%;" disabled v-model="currentRectify.plan.post" type="date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="font-size:18px;margin-bottom:15px;" class="section">所属检查任务</el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="所属检查任务：">
            <el-input v-model="currentRectify.taskItem.title" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="主检查人员：">
            <el-input v-model="currentRectify.staffinfo[0].name" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="协查人员：">
            <el-input v-model="currentRectify.staffinfo[1].name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="检查日期：">
            <el-date-picker style="width:100%;" disabled v-model="currentRectify.task.date" type="date"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="行政处罚下发：">
            <el-date-picker style="width:100%;" disabled v-model="currentRectify.date" type="date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="检查结果：">
            <el-tag size="medium">{{currentRectify.task.result}}</el-tag>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="处理办法：">
            <el-tag size="medium">{{currentRectify.task.handle}}</el-tag>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="address" label="监督检查意见：">
            <el-input :rows="5" disabled type="textarea" v-model="currentRectify.suggest"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="font-size:18px;margin-bottom:15px;" class="section">所属检查任务</el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="checkResult" :span-method="resultSpan" size="medium" style="width: 100%;margin-bottom:20px;" border>
          <el-table-column label="检查内容" width="200px">
            <template slot-scope="scope">
              <el-tag style="margin-bottom:5px;margin-right:8px;" size="mini">{{scope.row.i+1}}</el-tag>
              {{scope.row.item}}
            </template>
          </el-table-column>
          <el-table-column prop="detail" label="检查项目">
            <template slot-scope="scope">
              <el-tag style="margin-bottom:5px;margin-right:8px;" size="mini">{{scope.row.i+1}}.{{scope.row.j+1}}</el-tag>
              <el-tag style="margin-bottom:5px;margin-right:8px;" v-if="scope.row.important" size="mini" type="danger">重点项</el-tag>
              {{scope.row.detail}}
            </template>
          </el-table-column>
          <el-table-column label="结果" width="120px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.result" :type="getResultType(scope.row.result)" size="mini">
                {{scope.row.result.check}}
                <strong v-if="scope.row.result.point"> [分值:{{scope.row.result.point}}]</strong>
              </el-tag>
              <el-tag v-else size="small" type="info">留空项</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="90px">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.result&&scope.row.result.remark" placement="top-start" title="备注" width="400" trigger="hover" :content="scope.row.result.remark">
                <el-button style="margin:0 5px;" size="mini" slot="reference">备注</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </el-row>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "rectify_singlerectify",

  data() {
    return {
      currentRectify: null,
      currentTemplate: null,
      currentDetail: null
    };
  },

  beforeMount() {
    this.init();
  },

  computed: {
    checkResult() {
      let result = [];
      let template = this.currentTemplate.content;
      for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].children.length; j++) {
          let templateItem = template[i].children[j];

          let item = {
            i,
            j,
            detail: templateItem.content,
            important: templateItem.important,
            result: this.currentDetail.content[`${i + 1}.${j + 1}`]
          };

          if (j === 0) {
            item.item = template[i].title;
            item.rowspan = template[i].children.length;
          }

          result.push(item);
        }
      }

      return result;
    }
  },

  methods: {
    init() {
      let rectifyid = this.$route.params.rectifyid;
      let rectify = copy(
        this.$store.state.rectify.find(t => t.id == rectifyid)
      );

      rectify.plan = this.$store.state.plan.find(t => t.id == rectify.planid);
      rectify.biz = this.$store.state.biz.find(t => t.id == rectify.bizid);

      this.$store.state.task.forEach(task => {
        task.tasklist.forEach(taskitem => {
          taskitem.detail.forEach(detail => {
            if (detail.id == rectify.taskid) {
              rectify.taskItem = taskitem;
              rectify.task = detail;
            }
          });
        });
      });

      rectify.staffinfo = [
        this.$store.state.gridmember.find(
          t => t.id == rectify.task.staff[0].id
        ),
        this.$store.state.gridmember.find(t => t.id == rectify.task.staff[1].id)
      ];

      rectify.departmentinfo = [
        this.$store.state.gridarea.findArea(
          t => t.id == rectify.task.staff[0].department
        ),
        this.$store.state.gridarea.findArea(
          t => t.id == rectify.task.staff[1].department
        )
      ];

      this.currentRectify = rectify;
      this.currentTemplate = this.$store.state.template.find(
        t => t.id == rectify.plan.templateid
      );
      this.currentDetail = rectify.task;
    },

    resultSpan({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 0) {
        return;
      }

      return {
        colspan: row.rowspan ? 1 : 0,
        rowspan: row.rowspan || 0
      };
    },

    getResultType(result) {
      if (result.checked === null || result.checked === undefined) {
        return "";
      }

      return result.checked ? "success" : "danger";
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
