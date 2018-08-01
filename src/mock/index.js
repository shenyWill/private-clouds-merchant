import Mock from 'mockjs';
import config from '@/config';
import login from './login';

Mock.mock(config.loginAPI, 'post', login.login);
Mock.mock(config.logout, 'post', login.logout);

export default Mock;
