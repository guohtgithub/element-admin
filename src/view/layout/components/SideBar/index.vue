<template>
  <el-scrollbar class='scrollbar-wrapper'>
    <logo :isCollapse='isCollapse'></logo>
    <el-menu 
      mode='vertical'
      :show-timeout='200'
      :collapse='!isCollapse'
      :default-active="$route.path"
      active-text-color='#409eff'
      background-color='#304156'
      router
      text-color="#f0f0f0"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <sidebar-item :routesLink='getrouters'></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import {mapGetters} from 'vuex'
import logo from './logo'
import sidebarItem from './sidebarItem'
export default {
  components:{logo,sidebarItem},
  computed:{
    ...mapGetters([
      'sidebar',
      'getrouters'
    ]),
    isCollapse(){
      return this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.scrollbar-wrapper{
  height: 100%;
  text-align: left;
  .el-menu{
    border-right: none;
    color: red;
  }
}
</style>
