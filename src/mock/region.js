import Mock from 'mockjs';
import { param2Obj } from '@/utils';

const list = [];
const count = 500;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@id',
    areaName: '@ctitle(5, 10)',
    cover: '@image',
    groupName: '@ctitle(5, 10)'
  }));
}

export default {
  list: config => {
    const { title, offset = 0, limit = 11 } = param2Obj(config.url);
    let mockList = list.filter(item => {
      if (title && item.title !== title) return false;
      return true;
    });

    const pageList = mockList.filter((item, index) => index < (offset + limit) && index >= offset);

    return {
      code: 0,
      data: {
        rows: pageList,
        total: count
      }
    };
  }
};
