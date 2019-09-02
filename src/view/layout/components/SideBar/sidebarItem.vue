<template>
  <div class="sidebar">
    <template v-for="item in routesLink">
      <el-menu-item
        v-if='!item.children && !item.hidden'
        :key="item.path"
        :index='parent?parent+"/"+item.path:item.path'
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
      <el-submenu
        v-if="item.children && !item.hidden"
        :key="item.path"
        :index='parent?parent+"/"+item.path:item.path'
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.title}}</span>
        </template>
        <!-- 递归 -->
        <sidebar-item 
          :routesLink='item.children'
          :parent='parent?parent+"/"+item.path:item.path'
        ></sidebar-item>
      </el-submenu>
    </template>
  </div>
</template>
<script>
export default {
  name:'SidebarItem',
  props:['parent','routesLink'],
  data(){
    return{}
  }
}
</script>

<style lang="scss" scoped>
  // .sidebar{
  //   background: red;
  //   div{
  //     // color: #fff000;
  //     p{
  //       height: 100%;
  //       color: #f0f0f0;
  //       z-index: 10000;
  //     }
  //   }
  // }
</style>
