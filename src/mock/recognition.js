import Mock from 'mockjs';
var list = [];
const count = 500;
var recognitionList = [];
const recognitionCount = 50;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    name: '@cname',
    'position|1': ['员工', '在线通缉人员', '杀人犯', '好人', '坏人', 'UE'],
    'company|1': ['深圳市华付信息技术有限公司', '腾讯科技股份有限公司', '阿里巴巴集团', '百度咨询有限公司', '龙腾集团', '碧桂园房产咨询有限公司', '恒大集团', '暴走漫画有限公司', '荣传天下科技股份有限公司'],
    'equipmentName|1': ['华润1号楼大厅', '机场三号楼', '腾讯大厦附近', '华付信息技术旁边', '大型商场', '碧桂园广场大厅', '松山湖附近', '小区宿舍楼', '天安门广场'],
    'type|1': ['人证机', '摄像头', '人脸门禁'],
    'simi|1-100': 100,
    image: '@image',
    status: '@boolean',
    id: '@id',
    startDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
    endDate: Mock.Random.date('yyyy-MM-dd hh:mm:ss'),
    'equipment|1-2': ['摄像机1', '摄像机2', '摄像机3', '摄像机4', '摄像机5', '摄像机6'],
    'ipStatus|1': ['黑名单', '白名单']
  }));
}

for (let i = 0; i < recognitionCount; i++) {
  let objList = [];
  for (let j = 0; j < Math.ceil(Math.random() * 10); j++) {
    objList.push(Mock.mock({
      image: '@image',
      'simi|1-100': 100,
      'equipmentName|1': ['华润1号楼大厅', '机场三号楼', '腾讯大厦附近', '华付信息技术旁边', '大型商场', '碧桂园广场大厅', '松山湖附近', '小区宿舍楼', '天安门广场'],
      'type|1': ['人证机', '摄像头', '人脸门禁'],
      time: Mock.Random.datetime('hh:mm:ss'),
      id: '@id'
    }));
  }
  recognitionList.push(Mock.mock({
    date: Mock.Random.date('yyyy-MM-dd'),
    list: objList
  }));
}

export default {
  list: config => {
    let {
      page = 1, pageSize = 9
    } = JSON.parse(config.body);
    let searchList = list.filter((item, index) => index < page * pageSize && index >= (page - 1) * pageSize);
    return {
      resCode: '200',
      data: searchList,
      size: count
    };
  },
  detail: config => {
    let {
      id
    } = JSON.parse(config.body);
    let searchList = list.filter(item => item.id === id);
    return {
      resCode: '200',
      data: searchList
    };
  },
  compareDetail: config => {
    return {
      resCode: '200',
      data: recognitionList
    };
  }
};
