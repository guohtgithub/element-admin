<template>
  <div class="nav-bar" >
    <div class="left">
      <div class="close">
        X
      </div>
      <div class="navbar-title">
        TECH Admin
      </div>
    </div>
    <div class="right">
      <ul>
        <router-link class="home" to='/home' tag='li'>home</router-link>
        <li>
          <el-dropdown>
            <span>{{name}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>setting</el-dropdown-item>
              <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name:''
    }
  },
  mounted(){
    this.name = this.$store.getters.getname
  },
  methods:{
    async logout(){
      await this.$store.dispatch('LogOut')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar{
    height: 60px;
    line-height: 60px;
    background: #f1f1f1;
    .left{
      display: flex;
      justify-content: left;
      div:nth-child(1){
        padding: 0 10px;
      }
    }
    .right{
      float: right;
      ul{
        display: flex;
        li{
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          margin-top: 15px;
          cursor: pointer;
        }
        .home{
          color: #248bc7;
          background: rgba(136, 127, 125, 0.3)
        }
      }
    }
  }
</style>

