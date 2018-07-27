const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'none'
      });
      if (view.meta.cache) state.cachedViews.push(view.name);
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, i);
          break;
        }
      }
    },
    DEL_OTHER_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        const index = state.cachedViews.indexOf(i);
        state.cachedViews = state.cachedViews.slice(index, i + 1);
        break;
      }
    },
    DEL_ALL: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
    }
  },
  actions: {
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOtherViews ({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHER_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delAllViews ({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL');
        resolve([...state.visitedViews]);
      });
    }
  },
  getters: {
    visitedViews: state => state.visitedViews,
    cachedViews: state => state.cachedViews
  }
};

export default tagsView;
