const accounts = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    username: 'admin',
    password: '123456',
    desc: '管理账号'
  },
  user: {
    roles: ['user'],
    token: 'user',
    username: 'user',
    password: '123456',
    desc: '操作账号'
  },
  guest: {
    roles: ['guest'],
    token: 'guest',
    username: 'guest',
    password: '123456',
    desc: '查看账号'
  }
};

export default {
  login: option => {
    const { username, password } = JSON.parse(option.body);
    const data = accounts[username];
    if (!data) {
      return { resCode: '400', resMsg: 'data null' };
    }
    if (data.password === password) {
      return { resCode: '200', data: data };
    } else {
      return { resCode: '400', resMsg: 'password error' };
    }
  },
  logout: option => {
    return { resCode: 200, resMsg: 'success' };
  }
};
