const tagsView = {
  state:{
    visitedViews:[{name:'Home',path:'/home',title:'统计'}],
    cachedViews:['Home'],
    title:''
  },
  mutations:{
    AddVisitedViews(state,view){
      if(state.visitedViews.some(v => v.path === view.fullPath)) return
      state.visitedViews.push({
        name:view.name,
        path:view.fullPath,
        title:view.meta.title || 'noName'
      })
      if(!view.meta.noCache){
        state.cachedViews.push(view.name)
      }
    },
    DelVisitedViews(state,view){
      for(const [i,v] of state.visitedViews.entries()){
        if(v.path === view.path){
          state.visitedViews.splice(i,1)
          break
        }
      }
      for(const i of state.cachedViews){
        if(i === view.name){
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index,1)
          break
        }
      }
    },
    DelOthersViews(state,view){
      for(const [i,v] of state.visitedViews.entries()){
        if(v.path === view.path){
          state.visitedViews = state.visitedViews.slice(i,i+1);
          break
        }
      }
      for(const i of state.cachedViews){
        if(i === view.name){
          const index = state.cachedViews.index(i)
          state.cachedViews = state.cachedViews.slice(index,i+1)
          break
        }
      }
    },
    DelAllView(state){
      state.visitedViews = []
      state.cachedViews = []
    },
    Set_Title:(state,title) => {
      state.title = title
    }
  },
  actions:{
    addVisitedViews({commit},view){
      commit('AddVisitedViews',view)
    },
    delVisitedViews({commit,state},view){
      return new Promise((resolve) => {
        commit('DelVisitedViews',view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({commit,state},view){
      return new Promise((resolve) => {
        commit('DelOthersViews',view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({commit,state}){
      return new Promise((resolve) => {
        commit('DelOthersViews')
        resolve([...state.visitedViews])
      })
    },
    setTitle:({commit},title)=>{
      commit('Set_Title',title)
    }
  }
}

export default tagsView