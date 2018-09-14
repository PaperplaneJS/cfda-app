<template>
  <el-row id="trace_trace">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item>跟踪监督</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="title">跟踪监督</el-row>

    <div id="banner">
      <span>
        <div class="text">当前计划数目:
          <span class="bold">{{count.plan.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往计划列表</el-button>
        </div>
        <el-progress :width="count.opt.width" :stroke-width="count.opt.stroke" type="circle" :percentage="Number(((1-count.plan.current/count.plan.total)*100).toFixed(2))"></el-progress>
      </span>

      <span>
        <div class="text">当前任务进度:
          <span class="bold">{{count.task.computed}} / {{count.task.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往查看计划</el-button>
        </div>
        <el-progress color="#8e71c7" :width="count.opt.width" :stroke-width="count.opt.stroke" type="circle" :percentage="getPrecent(count.task.computed/count.task.current)"></el-progress>
      </span>

      <span class="text">
        <div>检查企业单位数目:
          <span class="bold">{{count.biz.computed}} / {{count.biz.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/base/biz')" type="text" size="small">企业单位列表</el-button>
        </div>
        <el-progress color="#FF6633" :width="count.opt.width" :stroke-width="count.opt.stroke" type="circle" :percentage="getPrecent(count.biz.computed/count.biz.current)"></el-progress>
      </span>

      <span class="text">
        <div>量化评级进度:
          <span class="bold">{{count.risk.computed}} / {{count.risk.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/risk')" type="text" size="small">前往风险评级</el-button>
        </div>
        <el-progress color="#33CC00" :width="count.opt.width" :stroke-width="count.opt.stroke" type="circle" :percentage="getPrecent(count.risk.computed/count.risk.current)"></el-progress>
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
                          {{task.title}}</span>
                        <span class="taskdetail">
                          <span>进度：
                            <el-tag size="mini">{{task.progress[0]}}/{{task.progress[1]}}</el-tag>
                          </span>
                          <span>分派时间：
                            <el-tag size="mini">{{task.date}}</el-tag>
                          </span>
                          <el-button style="padding:0;" size="mini" type="text" @click.native="$router.push('/daily/monitor/'+task.id)">
                            前往查看</el-button>
                        </span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="title" label="标题" width="320px" sortable></el-table-column>
                  <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
                  <el-table-column prop="department" label="制定单位" sortable></el-table-column>
                  <el-table-column prop="date" width="160px" label="制定时间"></el-table-column>
                  <el-table-column label="执行期限">
                    <template slot-scope="scope">
                      <div>
                        <el-tag size="mini">{{scope.row.limit[0]}}</el-tag>
                      </div>
                      <div>
                        <el-tag size="mini">{{scope.row.limit[1]}}</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" sortable>
                    <template slot-scope="scope">
                      <el-tag size="small">{{scope.row | stateText}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" @click.native="$router.push('/daily/monitor')" type="primary">检查监督</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-pagination :current-page.sync="planPageTable.page" :page-size="planPageTable.pageSize" background layout="total, prev, pager, next" :total="planData.length">
              </el-pagination>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="量化评级进度" name="risk">

            <el-row>
              <el-col :span="24">
                <el-table :data="riskPageData" size="medium" style="width: 100%;margin-bottom:20px;">
                  <el-table-column prop="biz.name" label="单位名称" sortable></el-table-column>
                  <el-table-column prop="biz.kind" label="单位类型" sortable></el-table-column>
                  <el-table-column prop="code" label="许可证编号"></el-table-column>
                  <el-table-column prop="areaName" label="所属区域" sortable></el-table-column>
                  <el-table-column label="评级结果" min-width="120px;" sortable>
                    <template slot-scope="scope">
                      <el-tag size="small">{{scope.row.level}} | {{scope.row.point}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="staffName" label="评定人" sortable></el-table-column>
                  <el-table-column prop="date" label="评定时间" sortable></el-table-column>
                  <el-table-column prop="action" label="操作" min-width="100px">
                    <template slot-scope="scope">
                      <el-button @click.native="$router.push('risk/'+scope.row.id)" size="mini" type="primary">检查监督</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-pagination :current-page.sync="riskPageTable.page" :page-size="riskPageTable.pageSize" background layout="total, prev, pager, next" :total="riskPageData.length">
              </el-pagination>
            </el-row>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { copy } from "@/components/utils.js";
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
        pageSize: 10
      },

      riskPageTable: {
        page: 1,
        pageSize: 10
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
    }
  },

  computed: {
    planData() {
      let result = copy(this.$store.state.plan);
      result.forEach(t => {
        t.task = [];
        this.$store.state.task.forEach(task => {
          if (task.planid == t.id) {
            task.tasklist.forEach(taskitem => t.task.push(taskitem));
          }
        });
      });

      return result;
    },

    riskData() {
      let result = copy(this.$store.state.risk[new Date().getFullYear() + 1]);
      result.forEach(t => {
        t.biz = this.$store.state.biz.find(biz => biz.id == t.bizid);
        t.code = (t.biz.licence && t.biz.licence.num) || "暂无";
        t.areaName = this.$store.state.gridarea.findArea(t.biz.area).name;
        t.staffName = this.$store.state.gridmember.find(
          staff => staff.id == t.staff
        ).name;
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
