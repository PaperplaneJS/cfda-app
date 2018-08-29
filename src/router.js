import Vue from 'vue/dist/vue';
import Router from 'vue-router';

import App from '@/app';
import Index from '@/views/index';

import BaseBiz from '@/views/base/biz';
import BaseTemplate from '@/views/base/template';
import BaseLaw from '@/views/base/law';
import BaseSingleBiz from '@/views/base/singlebiz';
import BaseSingleTemplate from '@/views/base/singletemplate';
import BaseSingeLaw from '@/views/base/singlelaw';

import GridArea from '@/views/grid/area';
import GridMember from '@/views/grid/member';
import GridSingleArea from '@/views/grid/singlearea';
import GridSingleMember from '@/views/grid/singlemember';

import SMSList from '@/views/sms/list';
import SMSPost from '@/views/sms/post';

import PlanList from '@/views/plan/list';
import PlanPost from '@/views/plan/post';
import PlanRecive from '@/views/plan/recive';
import PlanArchives from '@/views/plan/archives';
import PlanSinglePlan from '@/views/plan/singleplan';
import PlanSinglePost from '@/views/plan/singlepost';

import DailyPost from '@/views/daily/post';
import DailyMonitor from '@/views/daily/monitor';
import DailyMonitorList from '@/views/daily/monitorlist';
import DailyReport from '@/views/daily/report';
import DailySinglePost from '@/views/daily/singlepost';
import DailySingleMonitor from '@/views/daily/singlemonitor';
import DailySingleReport from '@/views/daily/singlereport';
import DailyReportList from '@/views/daily/reportlist';

import SpecialPost from '@/views/special/post';
import SpecialMonitor from '@/views/special/monitor';
import SpecialMonitorList from '@/views/special/monitorlist';
import SpecialReport from '@/views/special/report';
import SpecialSinglePost from '@/views/special/singlepost';
import SpecialSingleMonitor from '@/views/special/singlemonitor';
import SpecialSingleReport from '@/views/special/singlereport';
import SpecialReportList from '@/views/special/reportlist';

import RiskRisk from '@/views/risk/risk';
import RiskSingleRisk from '@/views/risk/singlerisk';

import RectifyRectify from '@/views/rectify/rectify';


Vue.use(Router);

let routes = [{
  path: '/index',
  alias: '/',
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
      path: '/base/law',
      component: BaseLaw
    }, {
      path: '/base/law/:lawid',
      component: BaseSingeLaw
    },

    //网格化管理

    {
      path: '/grid/area',
      component: GridArea
    }, {
      path: '/grid/member',
      component: GridMember
    }, {
      path: '/grid/area/:gridareaid',
      component: GridSingleArea
    }, {
      path: '/grid/member/:gridmemberid',
      component: GridSingleMember
    },

    //消息通知管理

    {
      path: '/sms/list',
      component: SMSList
    }, {
      path: '/sms/post',
      component: SMSPost
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
    }, {
      path: '/plan/archives',
      component: PlanArchives
    },

    //日常检查

    {
      path: '/daily/post',
      component: DailyPost
    }, {
      path: '/daily/monitor',
      component: DailyMonitor
    }, {
      path: '/daily/report',
      component: DailyReport
    }, {
      path: '/daily/post/:postid',
      component: DailySinglePost
    }, {
      path: '/daily/monitor/:monitorid',
      component: DailyMonitorList
    }, {
      path: '/daily/monitor/:monitorid/:monitorrecordid',
      component: DailySingleMonitor
    }, {
      path: '/daily/report/:planid',
      component: DailyReportList
    }, {
      path: '/daily/report/:planid/:reportid',
      component: DailySingleReport
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
      path: '/special/monitor/:monitorid',
      component: SpecialMonitorList
    }, {
      path: '/special/monitor/:monitorid/:monitorrecordid',
      component: SpecialSingleMonitor
    }, {
      path: '/special/report',
      component: SpecialReport
    }, {
      path: '/special/report/:planid',
      component: SpecialReportList
    }, {
      path: '/special/report/:planid/:reportid',
      component: SpecialSingleReport
    },

    //风险评级

    {
      path: '/risk',
      component: RiskRisk
    }, {
      path: '/risk/:riskid',
      component: RiskSingleRisk
    }, {
      path: '/rectify',
      component: RectifyRectify
    }
  ]
}];

export default new Router({
  routes
});