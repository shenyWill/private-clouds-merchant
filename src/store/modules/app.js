const app = {
  state: {
    socketConnected: false,
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
    }
  },
  getters: {
    isCollapse: state => state.sidebarToggle,
    selectedRegion: state => state.selectedRegion,
    socketConnected: state => state.socketConnected
  }
};

export default app;
