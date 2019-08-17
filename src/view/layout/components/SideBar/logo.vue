<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo-title is-bold" 
        key="0" :class="{'is-img':type,'is-text':type}"
      >
        <template v-if="type">
          <img :src="website.logo" width="40" height="40">
        </template>
        <template v-else>
          {{website.logo}}
        </template>
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span class="logo-title is-bold" key="1">{{website.title}}</span>
        <span class="logo-subtitle" key="2">{{website.author}}</span>
      </template>
    </transition-group>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name:'logo',
  data(){
    return {}
  },
  props:['isCollapse'],
  computed:{
    ...mapGetters(['website']),
    type(){
      return this.website.logo.indexOf('static') != -1
    }
  }
}
</script>
<style lang="scss" scoped>
.logo{
  height: 60px;
  line-height: 60px;
  background: #51771f;
  color: #fff;
}
</style>
