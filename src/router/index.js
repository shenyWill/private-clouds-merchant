import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/views/layout/Layout';

import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';

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
        meta: { title: 'Dashboard', icon: '', cache: true }
      }]
    }
  ]
});
