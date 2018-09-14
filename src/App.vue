<template>
  <div id="app">
    <el-container>
      <el-aside class="aside" width="240px">

        <el-col :span="24">
          <el-menu ref="menu" :default-active="currentMenuPath" :unique-opened="true" class="aside-menu" :router="true" background-color="#383838" text-color="#fff" active-text-color="#ffd04b">
            <div id="aside-logo">
            </div>

            <template v-for="menuItem of menuWithRoutePath">
              <el-menu-item v-if="!menuItem.group" :key="menuItem.id" :index="menuItem.path">
                <i v-if="menuItem.icon" :class="menuItem.icon"></i>
                <span slot="title">{{menuItem.label}}</span>
              </el-menu-item>

              <el-submenu v-if="menuItem.group" :key="menuItem.id" :index="menuItem.url">
                <template slot="title">
                  <i v-if="menuItem.icon" :class="menuItem.icon"></i>
                  <span slot="title">{{menuItem.label}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item v-for="menuGroupItem of menuItem.group" :key="menuGroupItem.id" :index="menuGroupItem.path">
                    {{menuGroupItem.label}}
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>

          </el-menu>
        </el-col>

      </el-aside>
      <el-container>
        <el-header class="title" height="80px">
          <span class="titletext">常熟市食品生产经营监管信息化平台</span>
          <div id="headmenu">
            <span>
              <el-button icon="el-icon-tickets" circle></el-button>
            </span>
            <el-popover placement="bottom" title="通知和消息" width="400" trigger="manual" v-model="visible">
              <el-alert class="notice" v-for="item of notice" :key="item.id" :title="item.title" :type="item.type" :description="item.content" show-icon>
              </el-alert>
              <el-badge icon="el-icon-bell" circle slot="reference" :max="99" :value="notice.length" class="item">
                <el-button icon="el-icon-bell" circle @click="visible = !visible"></el-button>
              </el-badge>
            </el-popover>
            <span>
              <el-button round>{{staff.name}}</el-button>
            </span>

          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import { copy, uuid } from "@/components/utils.js";
import menu from "@/menu.js";

export default {
  name: "app",

  data() {
    return {
      currentMenuPath: null,
      visible: false,
      notice: this.$store.state.current.notice,
      staff: this.$store.state.current.staff
    };
  },

  beforeMount() {
    this.routePathChange(this.$route.path);
  },

  beforeRouteUpdate(to, from, next) {
    this.routePathChange(to.path);
    next();
  },

  methods: {
    routePathChange(urlPath) {
      let menuPath = "";
      let paths = urlPath.split("/").filter(t => t.trim().length > 0);

      let match = this.menuWithRoutePath.find(m => m.url === paths[0]);
      if (match) {
        menuPath += `/${paths[0]}`;
      }

      if (match && match.group) {
        let group = match.group.find(g => g.url == paths[1]);
        if (match) {
          menuPath += `/${paths[1]}`;
        }
      }

      this.currentMenuPath = menuPath;
    }
  },

  computed: {
    menuWithRoutePath() {
      return menu.getMenuWithPath();
    }
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
  box-shadow: 3px 0px 4px rgba(0, 21, 41, 0.08);
  z-index: 1000;
}

.title {
  background: #fff;
  box-shadow: 0 4px 3px 0px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  z-index: 999;

  .titletext {
    padding-left: 10px;
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

#aside-logo {
  border-radius: 4px;
  height: 10px;
  color: #fff;
  text-align: center;
}

.main {
  padding-left: 30px;
  position: relative;
}
</style>
