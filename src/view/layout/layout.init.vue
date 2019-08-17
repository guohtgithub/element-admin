<template>
  <div class="app">
    <h2>list:</h2>
    <el-scrollbar wrap-class='list'
      wrap-style='color:red;'
      view-style='font-weight:bold;'
      view-class='view-box'
      :native='false'
    >
      <div v-for="value in num" :key="value">{{value}}</div>
    </el-scrollbar>
  </div>
</template>
<style scoped>
.app{
  height: 300px;
  overflow: hidden;
}
.list{
  max-height: 200px;
}
</style>
<script>
export default {
  data(){
    return{
      num:30
    }
  }
}
</script>

