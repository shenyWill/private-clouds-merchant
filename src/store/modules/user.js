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
  actions: {
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    login ({ commit }, user) {
      commit('LOGIN', user);
    },
    logout ({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user
  }
};

export default user;
