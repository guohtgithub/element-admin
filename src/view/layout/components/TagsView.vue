<template>
  <div class="tags-view">
    <ul>
      <router-link ref="tag" class="tags-view-item" 
        :class="isActive(tag)?'active':''"
        v-for="tag in Array.from(visitedViews)"
        :key="tag.path"
        :to='tag.path'
        @contextmenu.prevent.native="openMenu(tag,$event)"
        tag='li'
      >
        {{tag.title}}
        <i v-if="tag.path !='/home'" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></i>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name:'tagsView',
  computed:{
    visitedViews(){
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch:{
    $route(){
      this.addViewTags()
    }
  },
  mounted(){
    this.addViewTags()
  },
  methods:{
    generateRoute(){
      if(this.$route) return this.$route

      return false
    },
    addViewTags(){
      const route = this.generateRoute()
      if(!route) return false
      
      let title = route.meta.title || '统计'
      this.$store.dispatch('setTitle',title)
      this.$store.dispatch('addVisitedViews',route)
    },
    isActive(route){
      return route.path === this.$route.path
    },
    closeSelectedTag(view){
      this.$store.dispatch('delVisitedViews',view).then(views => {
        if(this.isActive(view)){
          const latestView = views.slice(-1)[0]
          if(latestView){
            this.$router.push(latestView.path)
          }else{
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view{
  height: 36px;
  background: #fff;
  line-height: 36px;
  color: #fff;
  text-align: left;
  box-shadow: 0 4px 4px rgba(0,21,41,0.08);
  ul{
    display: flex;
    li{
      height: 25px;
      line-height: 25px;
      margin-top: 6px;
      margin-left: 10px;
      padding: 0 10px;
      background: #f0f0f0;
      &.active{
        background: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before{
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
