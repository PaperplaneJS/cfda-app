<template>
  <div id="plan_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">日常检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/daily/post">计划分配</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-collapse style="margin:20px auto;" v-model="collapse">
      <el-collapse-item title="检查计划简介" name="1">
        <el-form label-position="left" style="margin-top:20px;" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划标题:">
                <el-input v-model="currentPlan.title" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="计划类别:">
                <el-input v-model="currentPlan.kind" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制定日期:">
                <el-date-picker disabled type="date" v-model="currentPlan.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="执行期限:">
                <el-date-picker v-model="currentPlan.limit" disabled type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
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

        </el-form>
      </el-collapse-item>
    </el-collapse>

    <el-form label-position="left" style="margin-top:20px;" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="检查单位:">
            <el-table @selection-change="handleSelectionChange" :data="bizs" size="medium" stripe style="width: 100%;margin-bottom:20px;" border>
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="name" label="单位名称" sortable width="260"></el-table-column>
              <el-table-column prop="type" label="类型" sortable></el-table-column>
              <el-table-column prop="grid" label="网格区域" sortable></el-table-column>
              <el-table-column prop="code" label="许可证编号"></el-table-column>
              <el-table-column prop="state" label="状态" width="80"></el-table-column>
              <el-table-column prop="action" label="操作" width="220" sortable>
                <template slot-scope="scope">
                  <el-select @change="selectChanged(scope)" v-model="scope.row.staff" size="small" clearable placeholder="选择检查人员">
                    <el-option v-for="item of staffs" :key="item.value" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <el-pagination style="margin-bottom:20px;" background layout="prev, pager, next" :total="100">
              </el-pagination>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="分配一览:">
            <el-table :data="allots" size="small" stripe style="width: 100%;margin-bottom:20px;" border>
              <el-table-column prop="staff" label="人员姓名" width="120" sortable></el-table-column>
              <el-table-column prop="content" label="巡查企业"></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

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
  name: "plan_singleplan",
  data() {
    return {
      collapse: null,
      title: null,
      currentPlan: null,
      gridtree: [
        {
          label: "常熟市",
          children: [
            {
              id: 2,
              label: "虞山镇",
              children: [
                { label: "虞山分局" },
                { label: "检察大队" },
                { label: "食药监分局" }
              ]
            },
            {
              id: 3,
              label: "梅里",
              children: []
            },
            {
              id: 4,
              label: "赵市",
              children: []
            }
          ]
        }
      ],
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
          staff: null
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
          staff: null
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
          staff: null
        },
        {
          id: 4,
          name: "常吉面馆环城北路店",
          type: "食品生产",
          legal: "高小宇",
          grid: "虞山分局",
          contant: "李健",
          tel: "17551823329",
          code: "CS-012-1203250",
          state: "正常",
          staff: null
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
        if (t.staff && group[t.staff]) {
          group[t.staff].push(t.name);
        } else if (t.staff && !group[t.staff]) {
          group[t.staff] = [t.name];
        }
      });

      let allots = [];
      Object.entries(group).forEach(([v, k]) => {
        allots.push({
          staff: `${this.staffObj[v]} [${k.length}]`,
          content: k.join(",  ")
        });
      });

      return allots;
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
        content: ["食品生产日常监督检查要点表", "食品销售日常监督检查要点表"]
      };

      this.title = this.currentPlan.title;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    selectChanged(scope) {
      let isOnSelectedRow = this.multipleSelection.some(
        t => t.id === scope.row.id
      );
      let staff = scope.row.staff || null;
      scope.row.staff = staff;
      if (isOnSelectedRow) {
        this.multipleSelection.forEach(t => (t.staff = staff));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}
</style>
