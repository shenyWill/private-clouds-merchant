import Mock from 'mockjs';
import config from '@/config';
import login from './login';
import device from './device';

Mock.mock(config.loginAPI, 'post', login.login);
Mock.mock(config.logoutAPI, 'post', login.logout);

Mock.mock(/\/device\/list/, 'get', device.list);
Mock.mock(config.device.add, 'post', device.add);
Mock.mock(config.device.update, 'post', device.update);
Mock.mock(/\/device\/delete/, 'post', device.delete);

export default Mock;
