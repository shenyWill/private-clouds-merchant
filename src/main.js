import 'es6-promise/auto';
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import NProgress from 'nprogress';
import './mock';
import './utils/rem';

import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import './assets/css/reset.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  NProgress.start();
  // TODO Check Login Auth
  next();
  NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
