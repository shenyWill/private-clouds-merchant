export default [{
  name: '系统首页',
  path: '/index',
  icon: 'el-icon-goods',
  children: []
}, {
  name: '商户管理',
  path: '/merchant',
  icon: 'el-icon-sold-out',
  children: [{
    name: '商户信息',
    path: '/merchant/index',
    icon: 'el-icon-menu',
    children: []
  }]
}, {
  name: '产品管理',
  path: '/products',
  icon: 'el-icon-news',
  children: [{
    name: '产品信息',
    path: '/products/index',
    icon: 'el-icon-message',
    children: []
  }, {
    name: '产品测试',
    path: '/products/test',
    icon: 'el-icon-view',
    children: []
  }]
}, {
  name: '系统管理',
  path: '/System',
  icon: 'el-icon-tickets',
  children: [{
    name: '系统设置',
    path: '/system/index',
    icon: 'el-icon-tickets',
    children: []
  }, {
    name: '组织管理',
    path: '/system/organization',
    icon: 'el-icon-tickets',
    children: []
  }, {
    name: '账号管理',
    path: '/system/accounts',
    icon: 'el-icon-tickets',
    children: []
  }, {
    name: '角色管理',
    path: '/system/role',
    icon: 'el-icon-tickets',
    children: []
  }]
}];
