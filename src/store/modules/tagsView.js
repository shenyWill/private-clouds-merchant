const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {},
    DEL_VISITED_VIEWS: (state, view) => {},
    DEL_OTHER_VIEWS: (state, view) => {},
    DEL_ALL: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
    }
  },
  actions: {
  }
};

export default tagsView;
