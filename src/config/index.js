export default {
  socketURL: 'wss://socket.org',
  loginAPI: '/login',
  logoutAPI: '/logout',
  device: {
    list: '/equipment/info/list',
    add: '/equipment/info/save',
    update: '/equipment/info/save',
    delete: '/equipment/info/remove'
  },
  region: {
    list: '/area/info/list',
    add: '/area/info/save',
    update: '/area/info/save',
    delete: '/area/info/remove',
    devices: '/areaEquipment/info/list'
  },
  person: {
    list: '/person/index',
    detail: '/person/detail',
    delete: '/person/delete',
    deleteAll: '/person/deleteAll',
    add: '/person/add'
  },
  recognition: {
    list: '/recognition/index',
    detail: '/recognition/detail',
    compareDetail: '/recognition/compareDetail'
  },
  deviceType: [{
    value: 1,
    label: '人证比对机'
  }, {
    value: 2,
    label: '摄像头'
  }, {
    value: 3,
    label: '人脸识别门禁平板'
  }, {
    value: 4,
    label: '闸机'
  }, {
    value: 5,
    label: '门'
  }],
  deviceAddressType: [{
    key: 'IP地址',
    value: 'ip'
  }, {
    key: 'URL地址',
    value: 'url'
  }]
};
