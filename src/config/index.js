export default {
  socketURL: 'wss://socket.org',
  loginAPI: '/login',
  logoutAPI: '/logout',
  device: {
    list: '/device/list',
    add: '/device/add',
    update: '/device/update',
    delete: '/device/delete'
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
  }
};
