<template>
  <el-container class="app">
    <div class="scroll">
      <h2>list:</h2>
      <el-scrollbar 
        wrap-class="list" 
        wrap-style="color: red;" 
        view-style="font-weight: bold;" 
        view-class="view-box" 
        :native="false"
      >
        <div style="height: 500px;width: 100%;background: red;"></div>
        <div style="height: 500px;width: 100%;background: yellowgreen;"></div>
        <div style="height: 500px;width: 100%;background: blueviolet;"></div>
      </el-scrollbar>
    </div>
    <div class="scroll">
      <h2>list:</h2>
      <el-scrollbar 
        wrap-class="list" 
        wrap-style="color: red;" 
        view-style="font-weight: bold;" 
        view-class="view-box" :native="false"
      >
        <div v-for="value in num" :key="value">
          {{value}}
        </div>
      </el-scrollbar>
    </div>
    <el-button type='primary'>primary</el-button>
  </el-container>
</template>
<script>
  export default {
    data(){
      return {
        asideWidth:'240px',
        isCollapse:true,
        num:30
      }
    },
    methods:{
      changeCollapse(){
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style lang='scss' scoped>
  .app{
    display: flex;
    .scroll{
      height: 300px;
      overflow: hidden;
      width: 300px;
      background: #9abfa2;
      margin-right: 10px;
      text-align: left;
      h2{
        margin: 0;
      }
    }
  }
 
</style>