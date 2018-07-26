const user = {
  state: {
    user: null,
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    LOGIN: (state, user) => {
      state.user = user;
    },
    LOGOUT: (state) => {
      state.user = null;
    }
  },
  actions: {}
};

export default user;
