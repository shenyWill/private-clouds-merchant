import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout';

// Index Page
import Login from '@/views/Login';

import Stream from '@/views/stream/Stream';

// System Modules
import System from '@/views/system/System';
import Organization from '@/views/system/Organization';
import Accounts from '@/views/system/Accounts';
import Role from '@/views/system/Role';

// Device Modules
import Device from '@/views/device/Device';

// Person Modules
import Person from '@/views/person/Person';
import Database from '@/views/person/Database';

// Recognition Modules
import Recognition from '@/views/recognition/Recognition';

// Region Modules
import Region from '@/views/region/Region';

// 个人中心
import PersonCenter from '@/views/personCenter/PersonCenter';

// 账号管理
import Account from '@/views/account/Account';

// 人证比对
import Witness from '@/views/witness/Witness';

// 数据统计
import Statistics from '@/views/statistics/Statistics';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/device',
    component: Layout,
    redirect: '/device/index',
    children: [{
      path: '/device/index',
      component: Device,
      name: 'Device',
      meta: { title: '设备管理', icon: '', cache: false }
    }]
  }, {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    children: [{
      path: '/person/index',
      component: Person,
      name: 'Person',
      meta: { title: '人员管理', icon: '', cache: false }
    }, {
      path: '/person/database',
      component: Database,
      name: 'Database',
      meta: { title: '库管理', icon: '', cache: false }
    }]
  }, {
    path: '/recognize',
    component: Layout,
    redirect: '/recognize/index',
    children: [{
      path: '/recognize/index',
      component: Recognition,
      name: 'Recognition',
      meta: { title: '识别记录', icon: '', cache: false }
    }]
  }, {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    children: [{
      path: '/system/index',
      component: System,
      name: 'System',
      meta: { title: '系统管理', icon: '', cache: true }
    }, {
      path: '/system/organization',
      component: Organization,
      name: 'Organization',
      meta: { title: '组织管理', icon: '', cache: true }
    }, {
      path: '/system/accounts',
      component: Accounts,
      name: 'Accounts',
      meta: { title: '账号管理', icon: '', cache: true }
    }, {
      path: '/system/role',
      component: Role,
      name: 'Role',
      meta: { title: '角色管理', icon: '', cache: true }
    }]
  }, {
    path: '/region',
    component: Layout,
    redirect: '/region/index',
    children: [{
      path: '/region/index',
      component: Region,
      name: 'Region',
      meta: { title: '区域管理', icon: '', cache: true }
    }]
  }, {
    path: '/stream',
    component: Layout,
    redirect: '/stream/index',
    children: [{
      path: '/stream/index',
      component: Stream,
      name: 'Stream',
      meta: { title: '视频管理', icon: '', cache: false }
    }]
  }, {
    path: '/personCenter',
    component: Layout,
    children: [{
      path: '/personCenter',
      component: PersonCenter,
      name: 'PersonCenter',
      meta: { title: '个人中心', icon: '', cache: false }
    }]
  }, {
    path: '/account',
    component: Layout,
    children: [{
      path: '/account/index',
      component: Account,
      name: 'Account',
      meta: { title: '账号管理', icon: '', cache: false }
    }]
  }, {
    path: '/witness',
    component: Layout,
    children: [{
      path: '/witness/index',
      component: Witness,
      name: 'Witness',
      meta: { title: '人证比对', icon: '', cache: false }
    }]
  }, {
    path: '/statistics',
    component: Layout,
    children: [{
      path: '/statistics/index',
      component: Statistics,
      name: 'Statistics',
      meta: { title: '人证比对', icon: '', cache: false }
    }]
  }]
});
