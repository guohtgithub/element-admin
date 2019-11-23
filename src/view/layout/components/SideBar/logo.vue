<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo-title is-bold" 
        key="0" :class="{'is-img':type,'is-text':type}"
      >
        <template v-if="type">
          <img :src="website.logo" width="40" height="40" style="padding-top:10px;" />
        </template>
        <template v-else>
          {{website.title}}
        </template>
      </span>
      <template v-if="!isCollapse">
        <img :src="website.logo" width="40" height="40"  style="padding-top:10px;" />
      </template>
    </transition>
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
      return this.website.logo.indexOf('1static') != -1
    }
  }
}
</script>
<style lang="scss" scoped>
.logo{
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  color: #fff;
  text-align: center;
}
</style>
