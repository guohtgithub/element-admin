const app = {
  state:{
    sidebar:{
      opened:true,
      withoutAnimation:false
    }
  },
  mutations:{
    Toggle_Sidebar:state =>{
      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions:{
    ToggleSideBar:({commit}) => {
      commit('Toggle_Sidebar')
    },
  }
}
export default app