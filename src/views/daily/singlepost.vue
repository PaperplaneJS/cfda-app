<template>
  <div id="daily_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">计划分配</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="计划详情" name="plan">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划详情</el-row>
        <el-form label-position="left" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划标题:">
                <el-input v-model="currentPlan.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="计划类别:">
                <el-input v-model="currentPlan.kind" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制定日期:">
                <el-date-picker readonly type="date" v-model="currentPlan.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="执行期限:">
                <el-date-picker v-model="currentPlan.limit" readonly type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="检查内容:">
                <el-checkbox style="margin-bottom:10px;" v-for="item in currentPlan.content" :key="item" disabled checked :label="item" border></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="内容描述:">
                <el-input v-model="currentPlan.desc" resize="none" :rows="4" type="textarea" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="备注:">
                <el-input v-model="currentPlan.tip" :rows="4" type="textarea" resize="none" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="计划分派" name="detail">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划分派</el-row>
        <el-form label-position="left" style="margin-top:20px;" label-width="90px">

          <el-table id="plantable" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="bizs" size="medium" style="width: 100%;margin-bottom:20px;" border>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="单位名称" sortable min-width="260"></el-table-column>
            <el-table-column prop="type" label="类型" sortable></el-table-column>
            <el-table-column prop="grid" label="网格区域" sortable></el-table-column>
            <el-table-column prop="code" label="许可证编号"></el-table-column>
            <el-table-column prop="state" label="状态" min-width="80"></el-table-column>
            <el-table-column prop="action" label="分配人员" min-width="220" sortable>
              <template slot-scope="scope">
                <el-select @change="selectChanged(scope,0)" v-model="scope.row.staff[0]" size="small" clearable placeholder="选择主要检查人员">
                  <el-option v-for="item of staffs" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>

                <el-select style="margin-top:5px;" @change="selectChanged(scope,1)" v-model="scope.row.staff[1]" size="small" clearable placeholder="选择协办人员">
                  <el-option v-for="item of staffs" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>

          <el-row>
            <el-pagination style="margin-bottom:20px;" background layout="prev, pager, next" :total="100">
            </el-pagination>
          </el-row>

          <el-table v-if="!error" :data="allots" style="width: 100%;margin-bottom:20px;" border>
            <el-table-column label="人员姓名" width="130px" sortable>
              <template slot-scope="scope">
                <el-tag>{{scope.row.staff}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="巡查企业">
              <template slot-scope="scope">
                <el-tag style="margin-right:10px;" v-for="item of scope.row.content" :key="item">{{item}}</el-tag>
              </template>
            </el-table-column>
          </el-table>

          <el-row style="margin-bottom:20px;" v-else :gutter="12">
            <el-col :span="20">
              <el-alert :closable="false" title="检查计划分派出错" type="error" :description="error" show-icon>
              </el-alert>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :span="24">
        <el-button type="primary">确认分配</el-button>
        <router-link to="/plan/post">
          <el-button style="margin-left:20px;">返回计划列表</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "daily_singleplan",
  data() {
    return {
      title: null,
      tab: "plan",
      currentPlan: null,
      staffs: [
        { name: "吴建明", value: "wjm" },
        { name: "郑健", value: "zj" },
        { name: "刘小强", value: "lxq" },
        { name: "王鑫", value: "wx" }
      ],
      bizs: [
        {
          id: 1,
          name: "常吉面馆环城北路店",
          type: "食品生产",
          legal: "王小明",
          grid: "虞山分局",
          contant: "张强",
          tel: "13755724009",
          code: "CS-012-11123450",
          state: "正常",
          staff: [null, null]
        },
        {
          id: 2,
          name: "麦当劳东南大道DT餐厅",
          type: "食品生产",
          legal: "顾小华",
          grid: "虞山分局",
          contant: "李小龙",
          tel: "13877489022",
          code: "CS-012-552320",
          state: "正常",
          staff: [null, null]
        },
        {
          id: 3,
          name: "黄河路龙虾王饭店",
          type: "食品生产",
          legal: "张强",
          grid: "虞山分局",
          contant: "陈小刚",
          tel: "15117323329",
          code: "CS-012-1323910",
          state: "正常",
          staff: [null, null]
        },
        {
          id: 4,
          name: "东南理工娇娇饭店",
          type: "食品生产",
          legal: "高小宇",
          grid: "虞山分局",
          contant: "李健",
          tel: "17551823329",
          code: "CS-012-1203250",
          state: "正常",
          staff: [null, null]
        }
      ],
      multipleSelection: []
    };
  },
  computed: {
    staffObj() {
      let staffobj = {};
      this.staffs.forEach(t => (staffobj[t.value] = t.name));

      return staffobj;
    },

    allots() {
      let group = {};
      this.bizs.forEach(t => {
        let mainstaff = t.staff[0];

        if (mainstaff && group[mainstaff]) {
          group[mainstaff].push(t.name);
        } else if (mainstaff && !group[mainstaff]) {
          group[mainstaff] = [t.name];
        }
      });

      let allots = [];
      Object.entries(group).forEach(([v, k]) => {
        allots.push({
          staff: `${this.staffObj[v]} [${k.length}]`,
          content: k
        });
      });

      return allots;
    },

    error() {
      let errstr = "";
      this.bizs.forEach(item => {
        if (
          (item.staff[0] && !item.staff[1]) ||
          (item.staff[1] && !item.staff[0])
        ) {
          errstr = "检查至少有主检查人员和协办人员2人";
        }
        if (item.staff[0] && item.staff[0] === item.staff[1]) {
          errstr = "主检查人和协办人员不能为同一人";
        }
      });
      return errstr.length > 0 ? errstr : null;
    }
  },
  beforeMount() {
    let postid = this.$route.params.postid;
    if (postid === "1") {
      this.currentPlan = {
        title: "常熟市2018年下半年巡检计划",
        kind: "日常检查",
        date: "2018-05-01",
        limit: ["2018-06-01", "2018-12-01"],
        content: ["食品生产日常监督检查要点表"],
        desc: "请依照法规对各食品生产单位进行检查，并即时将结果上报",
        tip: "检查项依照模板"
      };

      this.title = this.currentPlan.title;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    selectChanged(scope, index) {
      let isOnSelectedRow = this.multipleSelection.some(
        t => t.id === scope.row.id
      );
      let nowstaff = scope.row.staff[index] || null;
      scope.row.staff[index] = nowstaff;
      if (isOnSelectedRow) {
        this.multipleSelection.forEach(t => (t.staff[index] = nowstaff));
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (
        (row.staff[0] && !row.staff[1]) ||
        (row.staff[1] && !row.staff[0]) ||
        (row.staff[0] && row.staff[0] === row.staff[1])
      ) {
        return "error-table-row";
      } else if (row.staff[0] && row.staff[1]) {
        return "ok-table-row";
      }
      return "";
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
}
</style>
