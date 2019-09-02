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
        <i class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></i>
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
      if(this.$route.name) return this.$route

      return false
    },
    addViewTags(){
      const route = this.generateRoute()
      if(!route) return false
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
  background: #ececec;
  line-height: 36px;
  color: #fff;
  text-align: left;
  ul{
    display: flex;
    li{
      height: 30px;
      line-height: 30px;
      margin-top: 3px;
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
