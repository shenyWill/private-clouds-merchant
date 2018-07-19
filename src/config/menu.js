export default [{
  name: '首页',
  path: '/index',
  icon: '',
  children: []
}, {
  name: '商户管理',
  path: '/merchant',
  icon: '',
  children: [{
    name: '商户信息',
    path: '/merchant/index',
    icon: '',
    children: []
  }]
}, {
  name: '产品管理',
  path: '/products',
  icon: '',
  children: [{
    name: '产品信息',
    path: '/products/index',
    icon: '',
    children: []
  }, {
    name: '产品测试',
    path: '/products/test',
    icon: '',
    children: []
  }]
}];
