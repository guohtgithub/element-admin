<template>
  <div class="nav-bar" >
    <div class="left" @click="toggleSideBar">
      <div class="close">
        <i class="el-icon-s-operation"></i>
      </div>
      <div class="navbar-title">
        市值管理 / {{title}}
      </div>
    </div>
    <div class="right">
      <router-link to="/invest/index">
        <span style="color:blue;padding-right:20px;">充值</span>
      </router-link>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{getname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的余额：{{getavatar}} USDT</el-dropdown-item>
          <router-link to="/modifyPWD/index">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  methods:{
    async logout(){
      await this.$store.dispatch('LogOut')
      this.$router.push('/login')
    },
    toggleSideBar(){
      this.$store.dispatch('ToggleSideBar')
      let fixedDom = document.querySelector('.fixed-posi')
      if(this.$store.getters.sidebar.opened){
        fixedDom.style.left = '210px'
      }else{
        fixedDom.style.left = '60px'
      }
    }
  },
  computed:{
    ...mapGetters(['getname','title','getavatar'])
  }
}
</script>

<style lang="scss" scoped>
  .nav-bar{
    height: 60px;
    line-height: 60px;
    background: #fff;
    box-shadow: inset -4px -4px 4px rgba(0, 21, 41, 0.08);
    .left{
      display: flex;
      justify-content: left;
      .close{
        padding: 0 5px;
        width: 40px;
      }
      .close:hover{
        background: #f0f0f0;
      }
    }
    .right{
      float: right;
      padding-right: 20px;
      ul{
        display: flex;
        padding-right: 20px;
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

