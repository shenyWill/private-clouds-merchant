import Vue from 'vue';
import Router from 'vue-router';

import TestExample from '@/views/TestExample';

import Layout from '@/views/layout/Layout';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';

import Merchant from '@/views/merchant/Merchant';
import Products from '@/views/products/Products';
import Stream from '@/views/stream/Stream';

// System Modules
import System from '@/views/system/System';
import Organization from '@/views/system/Organization';
import Accounts from '@/views/system/Accounts';
import Role from '@/views/system/Role';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '',
      component: Layout,
      redirect: '/index',
      children: [{
        path: '/index',
        component: Dashboard,
        name: 'Dashboard',
        meta: { title: '系统首页', icon: '', cache: true }
      }]
    }, {
      path: '/merchant',
      component: Layout,
      redirect: '/merchant/index',
      children: [{
        path: '/merchant/index',
        component: Merchant,
        name: 'Merchant',
        meta: { title: '商户信息', icon: '', cache: true }
      }]
    }, {
      path: '/products',
      component: Layout,
      redirect: '/products/index',
      children: [{
        path: '/products/index',
        component: Products,
        name: 'Products',
        meta: { title: '产品信息', icon: '', cache: true }
      }, {
        path: '/products/test',
        component: TestExample,
        name: 'Test',
        meta: { title: '产品测试', icon: '', cache: true }
      }, {
        path: '/products/stream',
        component: Stream,
        name: 'Stream',
        meta: { title: '视频直播', icon: '', cache: true }
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
    }
  ]
});
