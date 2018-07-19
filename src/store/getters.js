const getters = {
  app: state => state.app,
  isCollapse: state => state.app.sidebarToggle,
  user: state => state.user.user,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
};

export default getters;
