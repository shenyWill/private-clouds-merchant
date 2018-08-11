import Mock from 'mockjs';
import config from '@/config';
import login from './login';
import device from './device';
import person from './person';
import recognition from './recognition';
import region from './region';

Mock.mock(config.loginAPI, 'post', login.login);
Mock.mock(config.logoutAPI, 'post', login.logout);

Mock.mock(/\/equipment\/info\/list/, 'post', device.list);
Mock.mock(config.device.add, 'post', device.add);
Mock.mock(config.device.update, 'post', device.update);
Mock.mock(/\/equipment\/info\/remove/, 'post', device.delete);

Mock.mock(/\/area\/info\/list/, 'post', region.list);

Mock.mock(/\/person\/index/, 'post', person.list);
Mock.mock(/\/person\/detail/, 'post', person.detail);
Mock.mock(/\/person\/delete$/, 'post', person.delete);
Mock.mock(/\/person\/deleteAll$/, 'post', person.deleteAll);
Mock.mock(/\/person\/add$/, 'post', person.add);

Mock.mock(/\/recognition\/index$/, 'post', recognition.list);
Mock.mock(/\/recognition\/detail$/, 'post', recognition.detail);
Mock.mock(/\/recognition\/compareDetail$/, 'post', recognition.compareDetail);

export default Mock;
