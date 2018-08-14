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
    list: '/libraryPersonnel/personnelList',
    detail: '/libraryPersonnel/personnelDetail',
    delete: '/libraryPersonnel/delPersonnel',
    deleteAll: '/libraryPersonnel/delPersonnel',
    add: '/person/add'
  },
  recognition: {
    list: '/distinguishRecord/info/list',
    detail: '/recognition/detail',
    compareDetail: '/recognition/compareDetail'
  },
  database: {
    list: '/library/searchLibraryList',
    add: '/library/saveLibrary',
    typeList: '/library/libraryTypeList',
    edit: '/library/editLibraryInfo',
    delete: '/library/delLibraryInfo'
  },
  deviceType: [{
    value: '1',
    label: '人证比对机'
  }, {
    value: '2',
    label: '摄像头'
  }, {
    value: '3',
    label: '人脸识别门禁平板'
  }, {
    value: '4',
    label: '闸机'
  }, {
    value: '5',
    label: '门'
  }],
  deviceType2String: {
    '1': '人证比对机',
    '2': '摄像头',
    '3': '人脸识别门禁平板',
    '4': '闸机',
    '5': '门'
  },
  deviceAddressType: [{
    key: 'IP地址',
    value: 'ip'
  }, {
    key: 'URL地址',
    value: 'url'
  }]
};
