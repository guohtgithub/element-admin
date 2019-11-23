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
      <div
        v-if="item.children && !item.hidden"
        :key="item.path"
      >
        <el-menu-item
          v-if="item.children.length == 1"
          :index="item.path+'/'+item.children[0].path"
        >
          <i :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index='parent?parent+"/"+item.path:item.path'>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <sidebar-item 
            :routesLink='item.children'
            :parent='parent?parent+"/"+item.path:item.path'
          ></sidebar-item>
        </el-submenu>
      </div>
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

</style>
