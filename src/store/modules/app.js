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
      if(state.sidebar.opened){
        state.sidebar.opened = false
      }else{
        state.sidebar.opened = true
      }
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