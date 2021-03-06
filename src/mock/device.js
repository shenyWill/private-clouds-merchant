import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const list = [];
const count = 500;

for (let i = 0; i < count; i++) {
  const ipOrURL = Math.random() * (10 - 1) + 1;
  let data;
  if (ipOrURL > 5) {
    data = Mock.mock({
      id: '@id',
      equipmentName: '@ctitle(5, 10)',
      areaName: '@county(true)',
      'equipmentType|1': ['1', '2', '3', '4', '5'],
      groupName: '@ctitle(5, 10)',
      status: '@boolean',
      ipAddress: '@ip',
      port: '@integer(0, 65535)',
      loginName: '@word(5, 10)',
      loginPsw: '@string'
    });
  } else {
    data = Mock.mock({
      id: '@id',
      equipmentName: '@ctitle(5, 10)',
      areaName: '@county(true)',
      'equipmentType|1': ['1', '2', '3', '4', '5'],
      groupName: '@ctitle(5, 10)',
      status: '@boolean',
      url: '@url',
      loginName: '@word(5, 10)',
      loginPsw: '@string'
    });
  }
  list.push(data);
}

export default {
  list: config => {
    const { title, status, tag, page = 1, pageSize = 10 } = param2Obj(config.url);
    let mockList = list.filter(item => {
      if (title && item.title !== title) return false;
      if (status && item.status !== status) return false;
      if (status && item.tag !== tag) return false;
      return true;
    });

    const pageList = mockList.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));

    return {
      code: 0,
      data: {
        rows: pageList,
        total: count
      }
    };
  },
  add: config => {
  },
  update: config => {
  },
  delete: config => {
    const id = JSON.parse(config.body).id;
    let deleted;
    list.filter((item, index) => {
      if (item.id === id) deleted = index;
    });
    list.splice(deleted, 1);
    return {
      code: 0,
      msg: '删除成功'
    };
  }
};
