import Vue from 'vue/dist/vue';
import Router from 'vue-router';
import store from './state.js';
import { auth } from '@/api/action';

import App from '@/app';

import Index from '@/views/index';

import ActionLogin from '@/views/action/login';

import BaseBiz from '@/views/base/biz';
import BaseTemplate from '@/views/base/template';
import BaseLaw from '@/views/base/law';
import BaseSingleBiz from '@/views/base/singlebiz';
import BaseSingleTemplate from '@/views/base/singletemplate';
import BaseSingleRiskTemplate from '@/views/base/singlerisktemplate';
import BaseSingeLaw from '@/views/base/singlelaw';

import GridArea from '@/views/grid/area';
import GridStaff from '@/views/grid/staff';
import GridSingleArea from '@/views/grid/singlearea';
import GridSingleStaff from '@/views/grid/singlestaff';

import SMSList from '@/views/sms/list';
import SMSPost from '@/views/sms/post';
import SMSSingleSMS from '@/views/sms/singlesms';

import PlanList from '@/views/plan/list';
import PlanPost from '@/views/plan/post';
import PlanRecive from '@/views/plan/recive';
import PlanSinglePlan from '@/views/plan/singleplan';
import PlanSinglePost from '@/views/plan/singlepost';

import DailyPost from '@/views/daily/post';
import DailyMonitor from '@/views/daily/monitor';
import DailyMonitorList from '@/views/daily/monitorlist';
import DailySinglePost from '@/views/daily/singlepost';
import DailySingleMonitor from '@/views/daily/singlemonitor';

import SpecialPost from '@/views/special/post';
import SpecialMonitor from '@/views/special/monitor';
import SpecialMonitorList from '@/views/special/monitorlist';
import SpecialSinglePost from '@/views/special/singlepost';
import SpecialSingleMonitor from '@/views/special/singlemonitor';

import RiskRisk from '@/views/risk/risk';
import RiskSingleRisk from '@/views/risk/singlerisk';

import RectifyRectify from '@/views/rectify/rectify';
import RectifySingleRectify from '@/views/rectify/singlerectify';

import TraceTrace from '@/views/trace/trace';

import CountCount from '@/views/count/count';

Vue.use(Router);

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
        path: '/plan/list',
        component: PlanList
      }, {
        path: '/plan/list/:planid',
        component: PlanSinglePlan
      }, {
        path: '/plan/post',
        component: PlanPost
      }, {
        path: '/plan/post/:planid',
        component: PlanSinglePost
      }, {
        path: '/plan/recive',
        component: PlanRecive
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