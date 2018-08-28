<template>
  <div id="app">
    <el-container>
      <el-aside class="aside" width="240px">

        <el-col :span="24">
          <el-menu :unique-opened="true" class="aside-menu" :router="true" default-active="2" background-color="#383838" text-color="#fff" active-text-color="#ffd04b">
            <div id="aside-log">
              LOGO放置位
            </div>
            <el-menu-item index="/index">
              <i class="el-icon-star-off"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="base">
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span slot="title">基础信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/base/biz">企业管理</el-menu-item>
                <el-menu-item index="/base/template">模板管理</el-menu-item>
                <el-menu-item index="/base/law">法律法规管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="grid">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">网格化管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/grid/area">网格区域管理</el-menu-item>
                <el-menu-item index="/grid/member">网格人员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="sms">
              <template slot="title">
                <i class="el-icon-message"></i>
                <span slot="title">消息管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/sms/list">消息列表</el-menu-item>
                <el-menu-item index="/sms/post">消息发布</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="plan">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">检查计划管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/plan/list">查看与制定</el-menu-item>
                <el-menu-item index="/plan/post">计划分发</el-menu-item>
                <el-menu-item index="/plan/recive">计划接收</el-menu-item>
                <el-menu-item index="/plan/archives">计划归档</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="daily">
              <template slot="title">
                <i class="el-icon-date"></i>
                <span slot="title">日常检查</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/daily/post">计划分配</el-menu-item>
                <el-menu-item index="/daily/monitor">检查监管</el-menu-item>
                <el-menu-item index="/daily/report">检查报告</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="special">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span slot="title">专项检查</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/special/post">专项检查计划</el-menu-item>
                <el-menu-item index="/special/monitor">专项检查监管</el-menu-item>
                <el-menu-item index="/special/report">专项检查报告</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/risk">
              <i class="el-icon-sort"></i>
              <span slot="title">风险评级</span>
            </el-menu-item>
            <el-menu-item index="/rectify">
              <i class="el-icon-bell"></i>
              <span slot="title">整改管理</span>
            </el-menu-item>
            <el-menu-item index="/trace">
              <i class="el-icon-view"></i>
              <span slot="title">跟踪监督</span>
            </el-menu-item>
            <el-menu-item index="/count">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">统计分析</span>
            </el-menu-item>
            <el-menu-item index="/option">
              <i class="el-icon-setting"></i>
              <span slot="title">系统管理</span>
            </el-menu-item>

          </el-menu>
        </el-col>

      </el-aside>
      <el-container>
        <el-header class="title" height="80px">
          <span>常熟市食药监局管理平台</span>
          <div id="headmenu">
            <span>
              <el-button icon="el-icon-search" circle></el-button>
            </span>
            <el-popover placement="bottom" title="通知和消息" width="400" trigger="manual" v-model="visible">
              <el-alert class="notice" v-for="item of notice" :key="item.id" :title="item.title" :type="item.type" :description="item.content" show-icon>
              </el-alert>
              <el-button icon="el-icon-bell" circle slot="reference" @click="visible = !visible"></el-button>
            </el-popover>
            <span>
              <el-button round>顾小华</el-button>
            </span>

          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import "@/components/public.scss";
export default {
  name: "app",
  data() {
    return {
      visible: false,
      notice: [
        {
          id: 1,
          title: "有新的计划待接收",
          type: "info",
          content:
            "有新检查计划[2018年下半年全市食品加工单位检查通知]已放入[计划接收]列表内"
        },
        {
          id: 2,
          title: "请在12月15日前进行风险评级",
          type: "warning",
          content:
            "当前区域内还有12家单位没有进行年度风险评级/检查，请于12月15日前完成"
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.is-active {
  background-color: #409eff !important;
  color: #fff !important;
}

.aside {
  background: #383838;
  border: none;
  min-height: 100vh;
}

.title {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;

  span {
    font-weight: 400;
    font-size: 30px;
    line-height: 80px;
    color: #383838;
  }

  #headmenu {
    display: flex;
    align-items: center;

    & > span {
      margin: 0 5px;
    }
  }
}

.notice {
  margin-top: 10px;
}

.aside-menu {
  border-right: none;
}

#aside-log {
  border: 2px currentColor dashed;
  border-radius: 4px;
  margin: 20px 20px 30px;
  padding: 25px 10px;
  color: #fff;
  text-align: center;
}
</style>
