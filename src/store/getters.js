const getters = {
  website: state => state.common.website,
  sidebar: state => state.app.sidebar,
  getrouters:state => state.routesLink.routers,
  getaddRouters:state => state.routesLink.addRouters,
  gettoken:state => state.user.token,
  getroles:state => state.user.roles,
  getavatar:state => state.user.avatar,
  getname:state => state.user.name,
  visitedViews:state => state.tagsView.visitedViews,
}
export default getters