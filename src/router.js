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
import DailyReport from '@/views/daily/report';
import DailySinglePost from '@/views/daily/singlepost';
import DailySingleMonitor from '@/views/daily/singlemonitor';
import DailySingleReport from '@/views/daily/singlereport';
import DailyReportList from '@/views/daily/reportlist';

import SpecialPost from '@/views/special/post';
import SpecialMonitor from '@/views/special/monitor';
import SpecialReport from '@/views/special/report';
import SpecialSinglePost from '@/views/special/singlepost';
import SpecialSingleMonitor from '@/views/special/singlemonitor';
import SpecialSingleReport from '@/views/special/singlereport';
import SpecialReportList from '@/views/special/reportlist';
import SpecialNotice from '@/views/special/notice';

Vue.use(Router);

let routes = [{
  path: '/index',
  alias: '/',
  component: App,
  children: [{
    path: '/index',
    component: Index
  }, {
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
  }, {
    path: '/grid/area',
    component: GridArea
  }, {
    path: '/grid/member',
    component: GridMember
  }, {
    path: '/sms/list',
    component: SMSList
  }, {
    path: '/sms/post',
    component: SMSPost
  }, {
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
  }, {
    path: '/daily/post',
    component: DailyPost
  }, {
    path: '/daily/monitor',
    component: DailyMonitor
  }, {
    path: '/daily/report',
    component: DailyReport
  }, {
    path: '/daily/report/:planid',
    component: DailyReportList
  }, {
    path: '/daily/post/:postid',
    component: DailySinglePost
  }, {
    path: '/daily/monitor/:monitorid',
    component: DailySingleMonitor
  }, {
    path: '/daily/report/:planid/:reportid',
    component: DailySingleReport
  }, {
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
  }, {
    path: '/special/notice',
    component: SpecialNotice
  }]
}];

export default new Router({
  routes
});