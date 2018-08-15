export default [{
  name: '系统首页',
  path: '/index',
  icon: 'el-icon-goods',
  children: []
}, {
  name: '人员管理',
  path: '/person',
  icon: 'el-icon-sold-out',
  children: [{
    name: '人员信息',
    path: '/person/index',
    icon: 'el-icon-menu',
    children: []
  }, {
    name: '人员管理',
    path: '/person/database',
    icon: 'el-icon-menu',
    children: []
  }]
}, {
  name: '识别记录',
  path: '/recognize/index',
  icon: 'el-icon-picture',
  children: []
}, {
  name: '区域管理',
  path: '/region/index',
  icon: 'el-icon-location',
  children: []
}];
