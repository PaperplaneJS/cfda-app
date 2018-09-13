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
          <span class="bold">{{plan.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往计划列表</el-button>
        </div>
        <el-progress :width="opt.width" :stroke-width="opt.stroke" type="circle" :percentage="Number(((1-plan.current/plan.total)*100).toFixed(2))"></el-progress>
      </span>

      <span>
        <div class="text">当前任务进度:
          <span class="bold">{{task.computed}} / {{task.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/plan/list')" type="text" size="small">前往查看计划</el-button>
        </div>
        <el-progress color="#8e71c7" :width="opt.width" :stroke-width="opt.stroke" type="circle" :percentage="getPrecent(task.computed/task.current)"></el-progress>
      </span>

      <span class="text">
        <div>检查企业单位数目:
          <span class="bold">{{biz.computed}} / {{biz.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/base/biz')" type="text" size="small">企业单位列表</el-button>
        </div>
        <el-progress color="#FF6633" :width="opt.width" :stroke-width="opt.stroke" type="circle" :percentage="getPrecent(biz.computed/biz.current)"></el-progress>
      </span>

      <span class="text">
        <div>风险评级进度:
          <span class="bold">{{risk.computed}} / {{risk.current}}</span>
        </div>
        <div class="button">
          <el-button @click.native="$router.push('/risk')" type="text" size="small">前往风险评级</el-button>
        </div>
        <el-progress color="#33CC00" :width="opt.width" :stroke-width="opt.stroke" type="circle" :percentage="getPrecent(risk.computed/risk.current)"></el-progress>
      </span>

    </div>

    <el-row>
      <el-col :span="22">
        <el-tabs v-model="tab">
          <el-tab-pane label="检查计划与任务" name="plan">
            <el-row>
              <el-col :span="24">
                <el-table :data="planData" size="medium">
                  
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <div v-for="task of scope.row.task" :key="task.id" class="task">
                        <span>
                          <el-tag size="mini">{{task.state}}</el-tag>
                          {{task.title}}</span>
                        <span class="taskdetail">
                          <span>进度：
                            <el-tag size="mini">{{task.current}}/{{task.total}}</el-tag>
                          </span>
                          <span>执法人员：
                            <el-tag size="mini">{{task.staffcount}}</el-tag>
                          </span>
                          <el-button style="padding:0;" size="mini" type="text" @click.native="$router.push('/daily/monitor/'+task.id)">检查监督</el-button>
                        </span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column prop="title" label="标题" sortable></el-table-column>
                  <el-table-column prop="staff" label="制定人员" sortable></el-table-column>
                  <el-table-column prop="department" label="制定单位" sortable></el-table-column>
                  <el-table-column prop="date" label="制定时间"></el-table-column>
                  <el-table-column prop="limit" label="执行期限"></el-table-column>
                  <el-table-column label="状态" sortable>
                    <template slot-scope="scope">
                      <el-tag :type="getPlanType(scope.row.state)">{{scope.row.state}}</el-tag>
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
              <el-pagination background layout="prev, pager, next" :total="1">
              </el-pagination>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="风险评级" name="risk">

            <el-row>
              <el-col :span="24">
                <el-table :data="riskData" size="medium" style="width: 100%;margin-bottom:20px;">
                  <el-table-column prop="code" label="许可证编号"></el-table-column>
                  <el-table-column prop="bizname" label="单位名称" sortable></el-table-column>
                  <el-table-column prop="kind" label="单位类型" sortable></el-table-column>
                  <el-table-column prop="area" label="所属区域" sortable></el-table-column>
                  <el-table-column label="评级结果" min-width="120px;" sortable>
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.result.lv">{{scope.row.result.lv}}</el-tag>
                      <el-popover style="padding-left:10px;" placement="top-start" title="分值详情" width="200" trigger="hover" :content="`静态: ${scope.row.result.static}  / 动态: ${scope.row.result.active}`">
                        <el-button size="small" slot="reference">风险分值: {{scope.row.result.total}}</el-button>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column prop="staff" label="评定人" sortable></el-table-column>
                  <el-table-column prop="department" label="评定单位" sortable></el-table-column>
                  <el-table-column prop="date" label="检查时间" sortable></el-table-column>
                  <el-table-column prop="action" label="操作" min-width="100px">
                    <template slot-scope="scope">
                      <el-button @click.native="$router.push('risk/'+scope.row.id)" size="mini" type="primary">检查监督</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <el-row>
              <el-pagination background layout="prev, pager, next" :total="1">
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
      opt: {
        width: 110,
        stroke: 4
      },
      plan: {
        total: 25,
        current: 3
      },
      task: {
        total: 230,
        current: 20,
        computed: 7
      },
      biz: {
        total: 1300,
        current: 783,
        computed: 530
      },
      risk: {
        total: 1280,
        current: 1280,
        computed: 530
      }
    };
  },

  computed: {
    planData() {
      let result = copy(this.$store.state.plan);
      result.forEach(t => {

      });
    },

    riskData() {}
  },

  methods: {}
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
