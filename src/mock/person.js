import Mock from 'mockjs';
const list = [];
const count = 500;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    name: '@cname',
    'position|1': ['高级产品经理', '前端工程师', '架构工程师', '算法负责人', '流媒体工程师', 'UE'],
    'company|1': ['深圳市华付信息技术有限公司', '腾讯科技股份有限公司', '阿里巴巴集团', '百度咨询有限公司', '龙腾集团', '碧桂园房产咨询有限公司', '恒大集团', '暴走漫画有限公司', '荣传天下科技股份有限公司'],
    'type|1': ['人证机', '摄像头', '人脸门禁'],
    image: '@image',
    status: '@boolean',
    id: '@id',
    startDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
    endDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
    'equipment|1-2': ['摄像机1', '摄像机2', '摄像机3', '摄像机4', '摄像机5', '摄像机6'],
    'ipStatus|1': ['黑名单', '白名单']
  }));
}

export default {
  list: config => {
    let { page = 1, pageSize = 10 } = JSON.parse(config.body);
    let searchList = list.filter((item, index) => index < page * pageSize && index >= (page - 1) * pageSize);
    return {
      resCode: '200',
      data: searchList,
      size: count
    };
  },
  detail: config => {
      let { id } = JSON.parse(config.body);
      let searchList = list.filter(item => item.id === id);
      return {
          resCode: '200',
          data: searchList
      };
  }
};
