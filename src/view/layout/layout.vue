<template>
  <div class="layout" :class="classObj">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <div class="fixed-posi">
        <nav-bar></nav-bar>
        <tags-view></tags-view>
      </div>
      <app-main class='main-content'></app-main>
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
    classObj(){
      return{
        hideSidebar:!this.sidebar.opened,
        openSidebar: this.sidebar.opened,
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
