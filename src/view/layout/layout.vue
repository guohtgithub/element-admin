<template>
  <div class="layout" :class="classObj">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</template>
<script>
import {NavBar,SideBar,AppMain,TagsView} from './components/index'
export default {
  name:'layout',
  components:{
    NavBar,
    SideBar,
    AppMain,
    TagsView
  },
  computed:{
    sidebar(){
      return this.$store.state.app.sidebar
    },
    device(){
      return this.$store.state.app.device
    },
    classObj(){
      return{
        hideSidebar:!this.sidebar.opened,
        mobile:this.device === 'mobile'
      }
    }
  },
  methods:{
    handleClickOutside(){
      this.$store.dispatch('CloseSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
.layout{
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  .sidebar-container{
    transition: width .3s;
    width: 210px;
    height: 100%;
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background: #6959cd;
  }
  .main-container{
    margin-left: 210px;
  }
}
</style>
