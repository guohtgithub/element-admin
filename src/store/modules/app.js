const app = {
  state:{
    language:'zh',
    sidebar:{
      opened:true,
      withoutAnimation:false
    },
    device:'desktop'
  },
  mutations:{
    Toggle_Sidebar:state =>{
      state.sidebar.opened = !state.sidebar.opened
    },
    Toggle_Device:(state,device) => {
      state.device = device
    }
  },
  actions:{
    ToggleSideBar:({commit}) => {
      commit('Toggle_Sidebar')
    },
    ToggleDevice:({commit},device)=>{
      commit('Toggle_Device',device)
    }
  }
}
export default app