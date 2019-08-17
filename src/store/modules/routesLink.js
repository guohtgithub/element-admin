import {asyncRouterMap,commonRouterMap} from '@/router'

function hasPermission(roles,route){
  if(route.meta && route.meta.role){
    return route.meta.role.includes(roles)
  }else{
    return true
  }
}

/**
 * 按递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles 权限
 */
export function filterAsyncRoutes(routes,roles){
  const res = []
  routes.forEach(route => {
    const tmp = {...route}
    if(hasPermission(roles,tmp)){
      if(tmp.children){
        tmp.children = filterAsyncRoutes(tmp.children,roles)
      }
      if(tmp.hidden && typeof tmp.hidden !== 'boolean'){
        tmp.hidden = tmp.hidden.includes(roles)?true:false
      }
      res.push(tmp)
    }
  })
  return res
}

const routesLink = {
  state:{
    routers:commonRouterMap,
    addRouters:[]
  },
  mutations:{
    SetRouters:(state,routers) => {
      state.addRouters = routers
      state.routers = commonRouterMap.concat(routers)
    }
  },
  // getters:{
  //   getaddRouters:state => state.addRouters,
  //   getrouters:state => state.routers
  // },
  actions:{
    GenerateRoutes({commit},data){
      return new Promise(resolve => {
        const {roles} = data
        let accessedRouters = filterAsyncRoutes(asyncRouterMap,roles)
        commit('SetRouters',accessedRouters)
        resolve()
      })
    }
  }
}

export default routesLink