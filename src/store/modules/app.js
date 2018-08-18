const app = {
  state: {
    socketConnected: false,
    blacklistAlert: false,
    sidebarToggle: false,
    selectedRegion: ''
  },
  mutations: {
    TOGGLE_MENU (state) {
      state.sidebarToggle = !state.sidebarToggle;
    },
    SET_SELECTED_REGION (state, region) {
      state.selectedRegion = region;
    },
    CONNECT_SOCKET (state) {
      state.socketConnected = true;
    },
    DISCONNECT_SOCKET (state) {
      state.socketConnected = false;
    },
    SET_BLACKLIST_ALERT (state, value) {
      state.blacklistAlert = value;
    }
  },
  actions: {
    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU');
    },
    setSeletedRegion ({ commit }, region) {
      commit('SET_SELECTED_REGION', region);
    },
    connectSocket ({ commit }) {
      commit('CONNECT_SOCKET', true);
    },
    disconnectSocket ({ commit }) {
      commit('DISCONNECT_SOCKET', false);
    },
    setBlacklistAlert ({ commit }, value) {
      commit('SET_BLACKLIST_ALERT', value);
    }
  },
  getters: {
    isCollapse: state => state.sidebarToggle,
    selectedRegion: state => state.selectedRegion,
    socketConnected: state => state.socketConnected,
    blacklistAlert: state => state.blacklistAlert
  }
};

export default app;
