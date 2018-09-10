<template>
  <div id="daily_singlemonitor">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">检查监督</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/monitor">{{currentPlan.title}} (计划)</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/daily/monitor/${currentTask.id}`">{{currentTask.title}} (任务)</el-breadcrumb-item>
      <el-breadcrumb-item>{{currentDetail.biz.name}} (详情)</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{currentDetail.biz.name}} (检查详情)</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="检查计划与任务" name="info">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">现场检查结果</el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="主检查人：">
                <el-input v-model="currentDetail.staffinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属科室：">
                <el-input v-model="currentDetail.departmentinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="协同检查：">
                <el-input v-model="currentDetail.staffinfo[1]" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属科室：">
                <el-input v-model="currentDetail.departmentinfo[0]" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查时间：">
                <el-date-picker disabled v-model="currentDetail.date" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="检查结果：">
                <el-tag size="medium">{{currentDetail.result}}</el-tag>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="处理方式：">
                <el-tag size="medium">{{currentDetail.handle}}</el-tag>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">检查计划相关信息
            <el-button @click="$router.push('/daily/monitor')" type="text" size="mini">查看计划</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查计划：">
                <el-input v-model="currentPlan.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划类别：">
                <el-select style="width:100%;" disabled v-model="currentPlan.kind">
                  <el-option label="日常检查" value="daily"></el-option>
                  <el-option label="专项检查" value="special"></el-option>
                  <el-option label="全量检查(风险评级)" value="risk"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制定人员：">
                <el-input v-model="currentPlan.staff" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划期限：">
                <el-date-picker style="width:100%;" v-model="currentPlan.limit" disabled type="daterange" range-separator="至">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="接收日期：">
                <el-date-picker style="width:100%;" disabled v-model="currentTask.recive" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="16">
              <el-form-item label="计划备注：">
                <el-input v-model="currentPlan.remark" :rows="4" disabled type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">分派任务详情
            <el-button @click="$router.push('/daily/monitor')" type="text" size="mini">查看任务</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="任务标题：">
                <el-input v-model="currentTask.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="分派日期：">
                <el-date-picker style="width:100%;" disabled v-model="currentTask.date" type="datetime">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="任务期限：">
                <el-date-picker style="width:100%;" v-model="currentTask.limit" disabled type="daterange" range-separator="至">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="生产地址:">
                <el-input v-model="currentTask.desc" :rows="4" type="textarea" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="font-size:18px;margin-bottom:15px;" class="section">被检查单位信息
            <el-button @click="$router.push('/base/biz/'+currentDetail.biz.id)" type="text" size="mini">查看单位</el-button>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="检查单位名：">
                <el-input v-model="currentDetail.biz.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="负责人：">
                <el-input v-model="currentDetail.biz.contact" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input v-model="currentDetail.biz.tel" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="currentDetail.biz.licence">
            <el-col :span="8">
              <el-form-item label="许可证号：">
                <el-input v-model="currentDetail.biz.licence.num" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="单位地址：">
                <el-input v-model="currentDetail.biz.address" :rows="4" disabled type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="详细结果" name="detail">
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
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { copy } from "@/components/utils";
export default {
  name: "daily_singlemonitor",

  data() {
    return {
      tab: "info",
      currentPlan: null,
      currentTask: null,
      currentDetail: null,
      currentTemplate: null
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
      let taskid = this.$route.params.taskid;
      let taskrecordid = this.$route.params.taskrecordid;

      this.$store.state.task.forEach(t => {
        let taskItem = t.tasklist.find(ti => ti.id == taskid);
        if (taskItem) {
          let task = copy(taskItem);
          task.recive = t.recive;
          this.currentTask = task;
          this.currentPlan = copy(
            this.$store.state.plan.find(p => p.id == t.planid)
          );
          this.currentTemplate = copy(
            this.$store.state.template.find(
              t => t.id == this.currentPlan.templateid
            )
          );
          return false;
        }
      });
      let detail = copy(
        this.currentTask.detail.find(d => d.id == taskrecordid)
      );

      detail.biz = this.$store.state.biz.find(biz => biz.id == detail.bizid);
      detail.staffinfo = [
        this.$store.state.gridmember.find(t => t.id == detail.staff[0].id).name,
        this.$store.state.gridmember.find(t => t.id == detail.staff[1].id).name
      ];
      detail.departmentinfo = [
        this.$store.state.gridarea.findArea(detail.staff[0].department).name,
        this.$store.state.gridarea.findArea(detail.staff[1].department).name
      ];

      this.currentDetail = detail;
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
</style>
