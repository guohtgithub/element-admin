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
        openSidebar: this.sidebar.opened,
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
<style lang="scss">
@import "@/style/index.scss";
</style>
