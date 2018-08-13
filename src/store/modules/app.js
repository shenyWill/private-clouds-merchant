const app = {
  state: {
    sidebarToggle: false,
    selectedRegion: ''
  },
  mutations: {
    TOGGLE_MENU (state) {
      state.sidebarToggle = !state.sidebarToggle;
    },
    SET_SELECTED_REGION (state, region) {
      state.selectedRegion = region;
    }
  },
  actions: {
    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU');
    },
    setSeletedRegion ({ commit }, region) {
      commit('SET_SELECTED_REGION', region);
    }
  },
  getters: {
    isCollapse: state => state.sidebarToggle,
    selectedRegion: state => state.selectedRegion
  }
};

export default app;
