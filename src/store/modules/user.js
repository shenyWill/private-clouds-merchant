const user = {
  state: {
    user: '',
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    LOGIN: (state, user) => {
      state.user = user;
    }
  },
  actions: {}
};

export default user;
