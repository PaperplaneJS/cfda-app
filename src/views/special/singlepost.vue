<template>
  <div id="special_singleplan">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/post">专项检查</el-breadcrumb-item>
      <el-breadcrumb-item to="/special/post">任务分派</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">{{title}}</el-row>

    <el-tabs style="margin-top:30px;" v-model="tab">
      <el-tab-pane label="计划说明" name="info">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划说明</el-row>
        <el-row :gutter="15" style="margin-bottom:15px;">
          <el-col :span="12">
            <el-alert title="本页展示的是市局下发的计划内容，无法修改。分派具体的任务和检查的企业、人员，请点击上方的任务制定和任务分派页" :closable="false" type="info">
            </el-alert>
          </el-col>
        </el-row>

        <el-form label-position="left" label-width="100px">
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="计划标题:">
                <el-input v-model="originPlan.title" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="专项通告:">
                <el-input v-model="originPlan.special" :rows="4" type="textarea" resize="none" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="类别:">
                <el-input v-model="originPlan.kind" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="制定日期:">
                <el-date-picker readonly type="date" v-model="originPlan.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="10">
              <el-form-item label="执行期限:">
                <el-date-picker v-model="originPlan.limit" readonly type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="备注:">
                <el-input v-model="originPlan.tip" :rows="4" type="textarea" resize="none" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="任务制定" name="plan">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">任务制定</el-row>
        <el-form label-position="left" label-width="100px">

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="任务标题:">
                <el-input v-model="currentPlan.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="10">
              <el-form-item label="执行期限:">
                <el-date-picker v-model="currentPlan.limit" type="daterange" range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15" style="margin-bottom:20px;">
            <el-col :span="10">
              <el-alert title="分派任务的期限不能超出计划的期限" type="info" :closable="false" show-icon>
              </el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="详细描述:">
                <el-input v-model="currentPlan.desc" resize="none" :rows="4" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="选择模板:">
                <el-select v-model="currentPlan.content" placeholder="请选择">
                  <el-option v-for="item in templates" :key="item.id" :label="item.title" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="15">
            <el-col :span="6">
              <el-form-item label="制定日期:">
                <el-date-picker type="date" v-model="currentPlan.date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="计划分派" name="detail">
        <el-row style="font-size:18px;margin-bottom:15px;" class="section">计划分派</el-row>
        <el-form label-position="left" style="margin-top:20px;" label-width="90px">
          <el-row style="margin-bottom:20px;" :gutter="15">
            <el-col :span="14">
              <el-alert title="每个单位如果分派检查，必须指定主检查人和协同检查人" type="info" :closable="false" show-icon>
              </el-alert>
            </el-col>
          </el-row>

          <el-row :gutter="15" style="margin-bottom:20px;">
            <el-col :span="6">
              <el-input clearable placeholder="搜索单位名/联系方式/许可证号等" prefix-icon="el-icon-search"></el-input>
            </el-col>

            <el-col :span="3">
              <el-select v-model="kind" clearable placeholder="选择类别">
                <el-option label="食品销售" value="xiaoshou"></el-option>
                <el-option label="食品生产" value="shengchan"></el-option>
                <el-option label="食品服务" value="fuwu"></el-option>
                <el-option label="保健品生产" value="baojianpin"></el-option>
                <el-option label="小作坊" value="xiaozuofang"></el-option>
              </el-select>
            </el-col>

            <el-col :span="5">
              <el-cascader :options="griddata" placeholder="按网格筛选" change-on-select></el-cascader>
            </el-col>
          </el-row>

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

          <el-table :data="allots" style="width: 100%;margin-bottom:20px;" border>
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

          <el-row v-if="error" :gutter="12">
            <el-col :span="20">
              <el-alert :closable="false" title="检查计划分派出错" type="error" :description="error" show-icon>
              </el-alert>
            </el-col>
          </el-row>

        </el-form>
      </el-tab-pane>

      <el-tab-pane label="已分派的任务" name="already">
        <el-row>
          <el-col :span="12">
            <el-collapse v-model="alreadytask" accordion>
              <el-collapse-item name="1">
                <template slot="title">
                  食品生产场所检查任务
                  <el-tag size="mini" style="margin:0 10px;">执行中...</el-tag>
                </template>

                <el-row :gutter="15">
                  <el-col :span="8">分派日期: 2018-07-01</el-col>
                  <el-col :span="8">检查企业: 25</el-col>
                </el-row>

                <el-row :gutter="15">
                  <el-col :span="8">执行情况: 23/25</el-col>
                  <el-col :span="8">期限: 2018-07-01 ~ 2018-07-31</el-col>
                </el-row>

                <el-row :gutter="15">
                  <el-col :span="16">模板: 食品生产专项监督检查要点表</el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <el-row style="margin-top:20px;">
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
  name: "special_singleplan",
  data() {
    return {
      title: null,
      tab: "info",
      originPlan: null,
      currentPlan: null,
      alreadytask: null,
      templates: [
        { id: 1, title: "食品生产专项监督检查要点表" },
        { id: 2, title: "食品销售专项监督检查要点表" },
        { id: 3, title: "餐饮服务专项监督检查要点表" },
        { id: 4, title: "保健食品生产专项监督检查要点表" },
        { id: 5, title: "食品小作坊现场检查记录表" }
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
      multipleSelection: [],
      griddata: [
        {
          value: "常熟市",
          label: "常熟市",
          children: [
            {
              value: "虞山镇",
              label: "虞山镇",
              children: [
                {
                  value: "食药监分局",
                  label: "食药监分局"
                }
              ]
            },
            {
              value: "梅里镇",
              label: "梅里镇",
              children: [
                {
                  value: "食药监大队",
                  label: "食药监大队"
                }
              ]
            }
          ]
        }
      ]
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
      this.originPlan = {
        title: "常熟市2018年下半年巡检计划",
        kind: "专项检查",
        date: "2018-05-01",
        limit: ["2018-06-01", "2018-12-01"],
        desc: "请依照法规对各食品生产单位进行检查，并即时将结果上报",
        tip: "检查项依照模板",
        special: "专项检查xxxxxx"
      };

      this.currentPlan = {
        title: "",
        kind: "",
        date: null,
        limit: [],
        content: null,
        desc: "",
        tip: ""
      };

      this.title = this.originPlan.title;
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
#special_singleplan {
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
