const app = {
  state: {
    socketConnected: false,
    blacklistAlert: false, // show blacklist alert dialog
    blacklistSound: false, // blacklist alert sound
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
    },
    SET_BLACKLIST_SOUND (state, value) {
      state.blacklistSound = value;
    }
  },
  actions: {
    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU');
    },
    setSelectedRegion ({ commit }, region) {
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
    },
    setBlacklistSound ({ commit }, value) {
      commit('SET_BLACKLIST_SOUND', value);
    }
  },
  getters: {
    isCollapse: state => state.sidebarToggle,
    selectedRegion: state => state.selectedRegion,
    socketConnected: state => state.socketConnected,
    blacklistAlert: state => state.blacklistAlert,
    blacklistSound: state => state.blacklistSound
  }
};

export default app;
