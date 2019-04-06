<template>
  <el-row id="trace_trace">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>跟踪监督</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">跟踪监督</el-row>

    <div id="banner">
      <span>
        <div class="text">
          当前计划数目:
          <span class="bold">{{count.plan.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往计划列表</el-button>
        </div>
        <el-progress
          :width="count.opt.width"
          :stroke-width="count.opt.stroke"
          type="circle"
          :percentage="Number(((1-count.plan.current/count.plan.total)*100).toFixed(2))"
        ></el-progress>
      </span>
      
      <span>
        <div class="text">
          当前所有任务:
          <span class="bold">{{count.task.computed}} / {{count.task.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往查看计划</el-button>
        </div>
        <el-progress
          color="#8e71c7"
          :width="count.opt.width"
          :stroke-width="count.opt.stroke"
          type="circle"
          :percentage="getPrecent(count.task.computed/count.task.current)"
        ></el-progress>
      </span>
      
      <span class="text">
        <div>
          检查经营个体数目:
          <span class="bold">{{count.biz.computed}} / {{count.biz.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/base/biz')" type="text" size="small">企业单位列表</el-button>
        </div>
        <el-progress
          color="#FF6633"
          :width="count.opt.width"
          :stroke-width="count.opt.stroke"
          type="circle"
          :percentage="getPrecent(count.biz.computed/count.biz.current)"
        ></el-progress>
      </span>
      
      <span class="text">
        <div>
          量化评级进度:
          <span class="bold">{{count.risk.computed}} / {{count.risk.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/risk')" type="text" size="small">前往量化评级</el-button>
        </div>
        <el-progress
          color="#33CC00"
          :width="count.opt.width"
          :stroke-width="count.opt.stroke"
          type="circle"
          :percentage="getPrecent(count.risk.computed/count.risk.current)"
        ></el-progress>
      </span>
    </div>

    <el-row>
      <el-col :span="22">
        <el-tabs v-model="tab">
          <el-tab-pane label="所有计划与任务" name="plan">
            <el-row>
              <el-col :span="24">
                <el-table :data="planPageData" size="medium">
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <div v-for="task of scope.row.task" :key="task.id" class="task">
                        <span>
                          <el-tag size="mini">{{task.state | taskState}}</el-tag>
                          {{task.title}}
                        </span>
                        <span class="taskdetail">
                          <span>进度：
                            <el-tag size="mini">{{task.progress[0]}}/{{task.progress[1]}}</el-tag>
                          </span>
                          <span>分派时间：
                            <el-tag size="mini">{{task.date}}</el-tag>
                          </span>
                          <el-button
                            style="padding:0;"
                            size="mini"
                            type="text"
                            @click.native="$router.push('/daily/monitor/'+task.id)"
                          >前往查看</el-button>
                        </span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="title" label="标题" width="320px" sortable></el-table-column>
                  <el-table-column prop="stf" label="制定人" sortable></el-table-column>
                  <el-table-column prop="dep" label="制定单位" sortable></el-table-column>
                  <el-table-column prop="date" width="160px" label="制定日期" align="center"></el-table-column>
                  <el-table-column label="执行期限" align="center">
                    <template slot-scope="scope">
                      <div>
                        <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
                      </div>
                      <div>
                        <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" align="center" sortable>
                    <template slot-scope="scope">
                      <el-tag size="small">{{scope.row | stateText}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <el-button
                      size="mini"
                      @click.native="$router.push('/daily/monitor')"
                      type="primary"
                    >检查监督</el-button>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-pagination
                background
                @size-change="t=>planPageTable.pageSize=t"
                :current-page.sync="planPageTable.page"
                :page-sizes="planPageTable.pageSizes"
                :page-size="planPageTable.pageSize"
                layout="total, prev, pager, next, sizes"
                :total="planPageData.length"
              ></el-pagination>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="量化评级进度" name="risk">
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="riskPageData"
                  size="medium"
                  style="width: 100%;margin-bottom:20px;"
                >
                  <el-table-column prop="biz.com_name" label="单位名称" sortable></el-table-column>
                  <el-table-column prop="areaName" label="行政区域" sortable></el-table-column>
                  <el-table-column label="个体类型" sortable>
                    <template slot-scope="scope">{{scope.row.biz.com_kind | bizKindText}}</template>
                  </el-table-column>
                  <el-table-column prop="code" label="许可证编号"></el-table-column>
                  <el-table-column label="评级结果" min-width="120px;" sortable>
                    <template slot-scope="scope">
                      <el-tag size="small">{{scope.row.level}} | {{scope.row.point}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="staffName" label="评定人" sortable></el-table-column>
                  <el-table-column prop="date" label="评定日期" align="center" sortable></el-table-column>
                  <el-table-column align="center" label="操作" min-width="60px">
                    <template slot-scope="scope">
                      <el-button
                        @click.native="$router.push('risk/'+scope.row.id)"
                        size="mini"
                        type="primary"
                      >检查监督</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-pagination
                background
                @size-change="t=>riskPageTable.pageSize=t"
                :current-page.sync="riskPageTable.page"
                :page-sizes="riskPageTable.pageSizes"
                :page-size="riskPageTable.pageSize"
                layout="total, prev, pager, next, sizes"
                :total="riskPageData.length"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/utils/utils.js";
import { getStaffByID } from "@/oldAPI/old_staff.js";
import { getAreaByID } from "@/oldAPI/old_area.js";
import { getBizByID } from "@/oldAPI/old_biz.js";
import { getTaskItems } from "@/oldAPI/old_task.js";
import { getPlans } from "@/oldAPI/old_plan.js";
import { getAllRisks } from "@/oldAPI/old_risk.js";

export default {
  name: "trace_trace",

  data() {
    return {
      tab: "plan",
      count: {
        opt: {
          width: 110,
          stroke: 4
        },
        plan: {
          total: 25,
          current: 3
        },
        task: {
          current: 20,
          computed: 7
        },
        biz: {
          current: 783,
          computed: 530
        },
        risk: {
          current: 1280,
          computed: 530
        }
      },

      planPageTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      },

      riskPageTable: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100]
      }
    };
  },

  filters: {
    stateText(plan) {
      let state = plan.state;
      switch (state) {
        case 1:
          return "待分发";
        case 2:
          return "已分发";
        case 3:
          return "执行中";
        case 4:
          return "已完成";
        default:
          return "未知";
      }
    },

    taskState(state) {
      return "执行中...";
    },

    planKindText(kind) {
      switch (kind) {
        case "daily":
          return "日常检查";
        case "special":
          return "专项检查";
        case "risk":
          return "全量检查";
        default:
          return kind;
      }
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

  computed: {
    planData() {
      let result = getPlans();
      result.forEach(t => {
        t.dep = getAreaByID(t.department).name;
        t.stf = getStaffByID(t.staff).name;
        t.task = [];
        getTaskItems().forEach(task => {
          if (task.planid == t.id) {
            task.tasklist.forEach(taskitem => t.task.push(taskitem));
          }
        });
      });

      return result;
    },

    riskData() {
      let result = getAllRisks()[new Date().getFullYear() + 1];
      result.forEach(t => {
        t.biz = getBizByID(t.bizid);
        t.code = (t.biz.lic_code && t.biz.lic_code) || "暂无";
        t.areaName = getAreaByID(t.biz.area).name;
        t.staffName = getStaffByID(t.staff).name;
      });

      return result;
    },

    planPageData() {
      return this.planData.slice(
        (this.planPageTable.page - 1) * this.planPageTable.pageSize,
        this.planPageTable.page * this.planPageTable.pageSize
      );
    },

    riskPageData() {
      return this.riskData.slice(
        (this.riskPageTable.page - 1) * this.riskPageTable.pageSize,
        this.riskPageTable.page * this.riskPageTable.pageSize
      );
    }
  },

  methods: {
    getStateType(state) {
      return state === 1 ? "success" : "danger";
    },

    getPrecent(val) {
      val *= 100;
      return Number(val.toFixed(2));
    }
  }
};
</script>

<style lang="scss" scoped>
#banner {
  display: flex;

  & > span {
    padding: 10px;
    margin-right: 35px;
    margin-bottom: 15px;
  }

  .text {
    color: grey;
    font-size: 13px;
  }

  .bold {
    font-size: 17px;
    font-weight: bold;
    color: #000;
  }

  .button {
    margin-bottom: 15px;
  }
}

.task {
  padding: 8px;
  margin: 8px;
  background: #f3f3f3;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;

  .taskdetail {
    width: 460px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
