import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Merchant from '@/views/merchant/Merchant';
import Products from '@/views/products/Products';

import Test from '@/views/Test';

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
        meta: { title: '首页', icon: '', cache: true }
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
        component: Test,
        name: 'Test',
        meta: { title: '产品测试', icon: '', cache: true }
      }]
    }
  ]
});
