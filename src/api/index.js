import axios from 'axios';
import router from '@/router';
import NProgress from 'nprogress';
import websocket from './websocket';

const service = axios.create({
  // global axios config
});

/*
 *  Request Interceptor
 *
 **/
service.interceptors.request.use(config => {
  NProgress.start();
  return config;
}, error => {
  NProgress.start();
  return Promise.reject(error);
});

/*
 *  Response Interceptor
 *
 **/
service.interceptors.response.use(response => {
  if (response.data.resCode === '1004') {
    router.push('/login');
  }
  NProgress.done();
  return response;
}, error => {
  NProgress.done();
  return Promise.reject(error);
});

export default {
  get (url, data) {
    return service.get(url, {
      params: data
    });
  },
  post (url, payload = null, config = {}) {
    return service.post(url, payload, config);
  },
  websocket
};
