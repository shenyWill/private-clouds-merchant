export default [{
  name: '实时视频',
  path: '/stream/index',
  icon: 'iconfont icon-shishishipin',
  children: [],
  jurisdiction: 0
}, {
  name: '识别记录',
  path: '/recognize/index',
  icon: 'iconfont icon-renyuanshibie1',
  children: [],
  jurisdiction: 0
}, {
  name: '人证比对',
  path: '/witness/index',
  icon: 'iconfont icon-renzhengbidui',
  children: [],
  jurisdiction: 0
}, {
  name: '人员管理',
  path: '/person/database',
  icon: 'iconfont icon-renyuanguanli',
  children: [],
  jurisdiction: 0
}, {
  name: '数据统计',
  icon: 'iconfont icon-shujutongji',
  path: '/account/index',
  children: [
    // {
    //   name: '流量统计',
    //   path: '/record/flow',
    //   icon: 'iconfont icon-qita-lan',
    //   jurisdiction: 0
    // },
    {
      name: '识别数据',
      path: '/record/index',
      icon: 'iconfont icon-qita-lan',
      jurisdiction: 0
    }
  ],
  jurisdiction: 0
}, {
  name: '设备管理',
  path: '/region/index',
  icon: 'iconfont icon-shebeiguanli',
  children: [],
  jurisdiction: 1
}, {
  name: '账号管理',
  path: '/account/index',
  icon: 'iconfont icon-zhanghaoguanli',
  children: [],
  jurisdiction: 1
}, {
  name: '设备维护',
  path: '/maintain/index',
  icon: 'iconfont icon-zhanghaoguanli',
  children: [],
  jurisdiction: 0
}];
