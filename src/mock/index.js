import Mock from 'mockjs';
import config from '@/config';
import login from './login';
import device from './device';
import person from './person';

Mock.mock(config.loginAPI, 'post', login.login);
Mock.mock(config.logoutAPI, 'post', login.logout);

Mock.mock(/\/device\/list/, 'get', device.list);
Mock.mock(config.device.add, 'post', device.add);
Mock.mock(config.device.update, 'post', device.update);
Mock.mock(/\/device\/delete/, 'post', device.delete);

Mock.mock(/\/person\/index/, 'post', person.list);
Mock.mock(/\/person\/detail/, 'post', person.detail);

export default Mock;
