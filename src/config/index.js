export default {
  socketURL: '/endpointChat',
  loginAPI: '/login',
  logoutAPI: '/logout',
  device: {
    list: '/equipment/info/list',
    add: '/equipment/info/save',
    update: '/equipment/info/save',
    delete: '/equipment/info/remove',
    allList: '/equipment/info/allList',
    all: '/equipment/info/allList'
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
    // add: '/libraryPersonnel/savePersonnel',
    edit: '/libraryPersonnel/savePersonnel',
    checkImage: '/libraryPersonnel/checkPersonnelImage',
    updateImage: '/libraryPersonnel/modifyPersonnelImg',
    totalNum: '/library/personnelTotalCount',
    addMorePerson: '/libraryPersonnel/batchAddPersonnel',
    stopMorePerson: '/libraryPersonnel/stopBatchAddPersonnel'
  },
  recognition: {
    list: '/distinguishRecord/info/list',
    detail: '/recognition/detail',
    compareDetail: '/distinguishRecord/info/recordList'
  },
  database: {
    list: '/library/searchLibraryList',
    add: '/library/saveLibrary',
    typeList: '/library/libraryTypeList',
    edit: '/library/editLibraryInfo',
    delete: '/library/delLibraryInfo'
  },
  system: {
    list: '/system/configure/list',
    update: '/system/configure/save'
  },
  stream: {
    streamingURL: '/equipment/info/getMediaUrl'
  },
  personCenter: {
    list: '/sys/user/getUser',
    editPwd: '/sys/user/resetPwd'
  },
  account: {
    list: '/sys/user/list',
    getEquipmentRole: '/sys/user/getEquipmentRole',
    save: 'sys/user/save',
    remove: 'sys/user/remove'
  },
  witness: {
    list: 'equipment/comparisonRecord/list'
  },
  record: {
    equipNum: 'equipment/info/getEquipmentTotal',
    libraryNum: 'distinguishRecordTotal/listByLibraryType',
    list: 'distinguishRecordTotal/list',
    tableList: 'distinguishRecordTotal/listByEquipment',
    childTableList: 'distinguishRecordTotal/detailListByEquipment'
  },
  maintain: {
    list: '/deviceMaintain/getSysMonitorInfo',
    sysVersion: '/deviceMaintain/getSysVersion',
    editDevice: '/deviceMaintain/modifyPAiCloudDevice',
    sysUpdate: '/deviceMaintain/sysUpdate',
    aiVersion: '/deviceMaintain/getGoModelVersion'
  },
  guard: {
    list: '/equipment/info/accessControlList',
    updateRoute: '/equipment/equipmentRoute/updateEquipmentRoute',
    testRoute: '/equipment/equipmentRoute/equipmentRouteTest',
    checkList: '/libraryPersonnel/queryChoosePersonnel'
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
  deviceString2Num: {
    '人证比对机': '1',
    '摄像头': '2',
    '人脸识别门禁平板': '3',
    '闸机': '4',
    '门': '5'
  },
  deviceAddressType: [{
    key: 'IP地址',
    value: 'ip'
  }, {
    key: 'URL地址',
    value: 'url'
  }],
  score: {
    compare: 73,
    blacklist: 73
  }
};
