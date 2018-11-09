const app = {
  state: {
    socketConnected: false,
    blacklistAlert: true, // show blacklist alert dialog
    blacklistSound: false, // blacklist alert sound
    sidebarToggle: false,
    parameterValue: null,
    morePersonTranstion: false,
    tempBatchNo: 0,
    selectedRegion: '',
    selectedPersonDatabase: '',
    selectedStreaming: '' // Stream module user selected streaming option
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
    SET_PARAMETER_VALUE (state, value) {
      state.parameterValue = value;
    },
    SET_PERSON_TRANSTION (state, value) {
      state.morePersonTranstion = value;
    },
    SET_TEMP_BATCH_NO (state, value) {
      state.tempBatchNo = value;
    },
    SET_BLACKLIST_SOUND (state, value) {
      state.blacklistSound = value;
    },
    SET_SELECTED_STREAMING (state, value) {
      state.selectedStreaming = value;
    },
    SET_SELECTED_PERSON_DATABASE (state, value) {
      state.selectedPersonDatabase = value;
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
    setParameterValue ({ commit }, value) {
      commit('SET_PARAMETER_VALUE', value);
    },
    setPersonTranstion ({ commit }, value) {
      commit('SET_PERSON_TRANSTION', value);
    },
    setTempBatchNo ({ commit }, value) {
      commit('SET_TEMP_BATCH_NO', value);
    },
    setBlacklistSound ({ commit }, value) {
      commit('SET_BLACKLIST_SOUND', value);
    },
    setSelectedStreaming ({ commit }, value) {
      commit('SET_SELECTED_STREAMING', value);
    },
    setSelectedPersonDatabase ({ commit }, value) {
      commit('SET_SELECTED_PERSON_DATABASE', value);
    }
  },
  getters: {
    isCollapse: state => state.sidebarToggle,
    selectedRegion: state => state.selectedRegion,
    socketConnected: state => state.socketConnected,
    blacklistAlert: state => state.blacklistAlert,
    blacklistSound: state => state.blacklistSound,
    parameterValue: state => state.parameterValue,
    morePersonTranstion: state => state.morePersonTranstion,
    tempBatchNo: state => state.tempBatchNo,
    selectedStreaming: state => state.selectedStreaming,
    selectedPersonDatabase: state => state.selectedPersonDatabase
  }
};

export default app;
