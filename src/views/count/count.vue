 <template>
  <div id="count_count">
    <el-row :gutter="8" class="count_item_box">
      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-star-on"></i>频繁出现的问题项目
            </span>
          </div>
          <div class="list">
            <div>
              <el-tag style="margin-right:4px" size="mini">25次</el-tag>
              <strong>1.</strong>未发现超范围、超限量使用食品添加剂的情况
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">20次</el-tag>
              <strong>2.</strong>建立和保存原始检验数据和检验报告记录，检验记录真实、完整
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">17次</el-tag>
              <strong>3.</strong>有与生产产品相适应的食品安全标准文本，按照食品安全标准规定进行检验
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-warning"></i>频繁查出问题的经营个体
            </span>
          </div>
          <div class="list">
            <div>
              <el-tag style="margin-right:4px" type="danger" size="mini">9次</el-tag>
              <strong>1.</strong>梅花糕小吃店
              <a>查看</a>
            </div>
            <div>
              <el-tag style="margin-right:4px" type="danger" size="mini">8次</el-tag>
              <strong>2.</strong>方桥馄饨
              <a>查看</a>
            </div>
            <div>
              <el-tag style="margin-right:4px" type="danger" size="mini">8次</el-tag>
              <strong>3.</strong>金明面饭馆
              <a>查看</a>
            </div>
            <div>
              <el-tag style="margin-right:4px" type="danger" size="mini">7次</el-tag>
              <strong>4.</strong>香村甜品
              <a>查看</a>
            </div>
            <div>
              <el-tag style="margin-right:4px" type="danger" size="mini">7次</el-tag>
              <strong>5.</strong>沙县小吃新颜路店
              <a>查看</a>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-search"></i>系统使用情况
            </span>
          </div>
          <div class="list">
            <div>
              <el-tag style="margin-right:4px" size="mini">计划</el-tag>2018-09-11 14:30 王小明制定了检查计划
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">登录</el-tag>2018-09-11 14:24 王小明登录了系统
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">查询</el-tag>2018-09-10 10:23 顾小华查询了任务进度
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">通知</el-tag>2018-09-10 10:05 顾小华下发了通知
            </div>
            <div>
              <el-tag style="margin-right:4px" size="mini">登录</el-tag>2018-09-10 9:30 顾小华登录了系统
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-menu"></i>地区检查覆盖率
            </span>
            <el-radio-group style="float:right;" v-model="cover" size="mini">
              <el-radio-button label="coverDaily">日常检查</el-radio-button>
              <el-radio-button label="coverRisk">量化评级</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="cover"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-goods"></i>食品行业分布情况
            </span>
            <el-radio-group style="float:right;" v-model="bizCount" size="mini">
              <el-radio-button label="bizCountKind">大类别</el-radio-button>
              <el-radio-button label="bizCountDetail">详细类别</el-radio-button>
              <el-radio-button label="bizCountArea">按分局</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="bizCount"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-d-caret"></i>近3个月内的商家增长
            </span>
            <el-radio-group style="float:right;" v-model="increase" size="mini">
              <el-radio-button label="increaseArea">按分局</el-radio-button>
              <el-radio-button label="increaseKind">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="increase"></div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-tickets"></i>检查结果汇总统计
            </span>
            <el-radio-group style="float:right;" v-model="result" size="mini">
              <el-radio-button label="resultQualified">合格率趋势图</el-radio-button>
              <el-radio-button label="resultCheck">检查次数趋势图</el-radio-button>
              <el-radio-button label="resultUnqualified">不合格情况分布</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="result"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-circle-check-outline"></i>检查结果合格率
            </span>
            <el-radio-group style="float:right;" v-model="month" size="mini">
              <el-radio-button label="monthArea">按分局</el-radio-button>
              <el-radio-button label="monthKind">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="month"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-document"></i>法规文书使用情况统计
            </span>
          </div>
          <div class="count" id="lawUsed"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card :body-style="{padding:'10px'}" class="count_item">
          <div slot="header">
            <span class="table_title">
              <i class="el-icon-edit-outline"></i>许可证发放覆盖率统计
            </span>
            <el-radio-group style="float:right;" v-model="licCover" size="mini">
              <el-radio-button label="licCoverArea">按分局</el-radio-button>
              <el-radio-button label="licCoverKind">按行业</el-radio-button>
            </el-radio-group>
          </div>
          <div class="count" id="licCover"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { count } from "@/api/count.js";
import echarts from "echarts";
export default {
  name: "count_count",

  data() {
    return {
      charts: null,

      increase: null,
      cover: null,
      bizCount: null,
      result: null,
      month: null,
      licCover: null,

      resize: null,

      range1: "month",
      range2: ["", ""]
    };
  },

  mounted() {
    this.init();
  },

  watch: {
    increase(newVal) {
      this.charts.increase.clear();
      this.charts.increase.setOption(count[newVal]);
    },
    cover(newVal) {
      this.charts.cover.clear();
      this.charts.cover.setOption(count[newVal]);
    },
    bizCount(newVal) {
      this.charts.bizCount.clear();
      this.charts.bizCount.setOption(count[newVal]);
    },
    result(newVal) {
      this.charts.result.clear();
      this.charts.result.setOption(count[newVal]);
    },
    month(newVal) {
      this.charts.month.clear();
      this.charts.month.setOption(count[newVal]);
    },
    licCover(newVal) {
      this.charts.licCover.clear();
      this.charts.licCover.setOption(count[newVal]);
    }
  },

  computed: {},

  beforeRouteLeave(to, from, next) {
    window.removeEventListener("resize", this.resize);
    next();
  },

  methods: {
    init() {
      this.charts = {
        increase: echarts.init(document.getElementById("increase")),
        cover: echarts.init(document.getElementById("cover")),
        bizCount: echarts.init(document.getElementById("bizCount")),
        result: echarts.init(document.getElementById("result")),
        month: echarts.init(document.getElementById("month")),
        lawUsed: echarts.init(document.getElementById("lawUsed")),
        licCover: echarts.init(document.getElementById("licCover"))
      };

      this.charts.lawUsed.setOption(count.lawUsed);

      this.increase = "increaseArea"; //increaseKind  近3月增长量
      this.cover = "coverDaily"; //coverRisk          检查覆盖率
      this.bizCount = "bizCountKind"; //bizCountArea,bizCountDetail        个体个数统计
      this.result = "resultQualified"; //resultUnqualified,resultCheck     检查结果汇总统计
      this.month = "monthArea"; //monthKind                                检查结果比率
      this.licCover = "licCoverArea"; //licCoverKind     许可证发放覆盖率

      this.resize = () => {
        Object.values(this.charts).forEach(t => t.resize());
      };
      window.addEventListener("resize", this.resize);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
}

.count_item_box {
  .table_title {
    font-weight: bold;
  }

  i {
    margin-right: 5px;
  }

  .count_item {
    margin-bottom: 8px;

    .title {
      font-size: 20px;
      font-weight: 300;
      text-align: center;
      margin: 5px auto 5px;
    }

    .count {
      height: 200px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 160px;
    overflow: hidden;

    & > div {
      font-size: 15px;
      padding: 4px 4px;

      a {
        color: cornflowerblue;
        cursor: pointer;
        margin-left: auto;
      }
    }
  }
}
</style>
