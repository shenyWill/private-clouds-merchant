const app = {
  state: {
    sidebarToggle: false
  },
  mutations: {
    TOGGLE_MENU (state) {
      state.sidebarToggle = !state.sidebarToggle;
    }
  },
  actions: {
    toggleMenu ({ commit }) {
      commit('TOGGLE_MENU');
    }
  }
};

export default app;
