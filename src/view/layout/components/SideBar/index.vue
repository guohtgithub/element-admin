<template>
  <div>
    <logo :isCollapse='isCollapse'></logo>
    <el-scrollbar class='scrollbar-wrapper'>
      <el-menu 
        mode='vertical'
        :show-timeout='200'
        :collapse='!isCollapse'
        :default-active="$route.path"
        active-text-color='#42b983'
        background-color='#6959CD'
        router
        :unique-opened="true"
        :collapse-transition="false"
      >
        <sidebar-item :routesLink='getrouters'></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
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
  }
}
</style>
