import Vue from 'vue';
import Router from 'vue-router';
import store from '@/state.js';
import { auth } from '@/api/action.js';

import App from '@/app.vue';

import Index from '@/views/index.vue';

import ActionLogin from '@/views/action/login.vue';

import BaseBiz from '@/views/base/biz.vue';
import BaseTemplate from '@/views/base/template.vue';
import BaseLaw from '@/views/base/law.vue';
import BaseSingleBiz from '@/views/base/singlebiz.vue';
import BaseSingleTemplate from '@/views/base/singletemplate.vue';
import BaseSingleRiskTemplate from '@/views/base/singlerisktemplate.vue';
import BaseSingeLaw from '@/views/base/singlelaw.vue';

import GridArea from '@/views/grid/area.vue';
import GridStaff from '@/views/grid/staff.vue';
import GridSingleArea from '@/views/grid/singlearea.vue';
import GridSingleStaff from '@/views/grid/singlestaff.vue';

import SMSList from '@/views/sms/list.vue';
import SMSPost from '@/views/sms/post.vue';
import SMSSingleSMS from '@/views/sms/singlesms.vue';

import PlanList from '@/views/plan/plan.vue';
import PlanPost from '@/views/plan/post.vue';
import PlanRecive from '@/views/plan/recive.vue';
import PlanSinglePlan from '@/views/plan/singleplan.vue';
import PlanSinglePost from '@/views/plan/singlepost.vue';

import DailyPost from '@/views/daily/post.vue';
import DailyMonitor from '@/views/daily/monitor.vue';
import DailyMonitorList from '@/views/daily/monitorlist.vue';
import DailySinglePost from '@/views/daily/singlepost.vue';
import DailySingleMonitor from '@/views/daily/singlemonitor.vue';

import SpecialPost from '@/views/special/post.vue';
import SpecialMonitor from '@/views/special/monitor.vue';
import SpecialMonitorList from '@/views/special/monitorlist.vue';
import SpecialSinglePost from '@/views/special/singlepost.vue';
import SpecialSingleMonitor from '@/views/special/singlemonitor.vue';

import RiskRisk from '@/views/risk/risk.vue';
import RiskSingleRisk from '@/views/risk/singlerisk.vue';

import RectifyRectify from '@/views/rectify/rectify.vue';
import RectifySingleRectify from '@/views/rectify/singlerectify.vue';

import TraceTrace from '@/views/trace/trace.vue';

import CountCount from '@/views/count/count.vue';

let routes = [{
    path: '/',
    redirect: '/index'
  },

  //用户登录

  {
    path: '/login',
    component: ActionLogin
  },

  {
    path: '/index',
    component: App,
    children: [{
        path: '/index',
        component: Index
      },

      //基础信息管理

      {
        path: '/base/biz',
        component: BaseBiz
      }, {
        path: '/base/template',
        component: BaseTemplate
      }, {
        path: '/base/biz/:bizid',
        component: BaseSingleBiz
      }, {
        path: '/base/template/:templateid',
        component: BaseSingleTemplate
      }, {
        path: '/base/risktemplate/:templateid',
        component: BaseSingleRiskTemplate
      }, {
        path: '/base/law',
        component: BaseLaw
      }, {
        path: '/base/law/:lawid',
        component: BaseSingeLaw
      },

      //网格化管理

      {
        path: '/grid/department',
        component: GridArea
      }, {
        path: '/grid/staff',
        component: GridStaff
      }, {
        path: '/grid/department/:depid',
        component: GridSingleArea
      }, {
        path: '/grid/staff/:staffid',
        component: GridSingleStaff
      },

      //消息通知管理

      {
        path: '/sms',
        component: SMSList
      }, {
        path: '/sms/post',
        component: SMSPost
      }, {
        path: '/sms/:smsid',
        component: SMSSingleSMS
      },

      //检查计划管理

      {
        path: '/plan',
        component: PlanList
      }, {
        path: '/plan/post',
        component: PlanPost
      }, {
        path: '/plan/post/:planid',
        component: PlanSinglePost
      }, {
        path: '/plan/recive',
        component: PlanRecive
      }, {
        path: '/plan/:planid',
        component: PlanSinglePlan
      },

      //日常检查

      {
        path: '/daily/post',
        component: DailyPost
      }, {
        path: '/daily/monitor',
        component: DailyMonitor
      }, {
        path: '/daily/post/:postid',
        component: DailySinglePost
      }, {
        path: '/daily/monitor/:taskid',
        component: DailyMonitorList
      }, {
        path: '/daily/monitor/:taskid/:taskrecordid',
        component: DailySingleMonitor
      },

      //专项检查

      {
        path: '/special/post',
        component: SpecialPost
      }, {
        path: '/special/post/:postid',
        component: SpecialSinglePost
      }, {
        path: '/special/monitor',
        component: SpecialMonitor
      }, {
        path: '/special/monitor/:taskid',
        component: SpecialMonitorList
      }, {
        path: '/special/monitor/:taskid/:taskrecordid',
        component: SpecialSingleMonitor
      },

      //风险评级

      {
        path: '/risk',
        component: RiskRisk
      }, {
        path: '/risk/:riskid',
        component: RiskSingleRisk
      },

      //整改管理

      {
        path: '/rectify',
        component: RectifyRectify
      }, {
        path: '/rectify/:rectifyid',
        component: RectifySingleRectify
      },

      //跟踪监督

      {
        path: '/trace',
        component: TraceTrace
      },

      //统计分析

      {
        path: '/count',
        component: CountCount
      }
    ]
  }
];

Vue.use(Router);

let router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.state.currentUser) {
    auth().then(data => {
      store.commit('auth', data.data);
      next();
    }).catch(() => {
      store.commit('auth', null);
      next('/login');
    });

  } else if (to.path === '/login' && store.state.currentUser) {
    next(false);

  } else {
    next();
  }
});

export default router;