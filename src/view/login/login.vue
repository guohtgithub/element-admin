<template>
  <div class="login-container">
    <div class="left-info pt300">
      <img src="../../assets/logo.png" alt="">
      <ul>
        <li>吉安卡罗积分卡是历史低位哦吉恩凯利服务迪斯科飞机威威</li>
        <li>适当放宽我i欸我可大可小飞机飞往了的撒法及我二姐发是多少深刻的尽快落实了</li>
        <li>时尚手机待机时间紧身裤期间九点九九七五七七五就那么那么纯洁静安寺</li>
      </ul>
    </div>
    <div class="right-login pt300">
      <div class="login-main">
        <h4 class="login-title">市值管理后台系统</h4>
        <el-form :rules="loginRules" 
          ref="loginForm" :model='loginForm'>
          <el-form-item prop='username'>
            <el-input 
              size='small' 
              @keyup.enter.native="handleLogin"
              v-model="loginForm.username"
              auto-complete='off'
              placeholder="请输入用户名"
              >
              <i slot="prefix" class="icon-yonghu"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              size='small' @keyup.enter.native="handleLogin"
              v-model="loginForm.password" :type='passwordType'
              auto-complete='off' placeholder='请输入密码'
            >
              <i class="el-icon-view el-input_icon" slot="suffix" @click="showPassword"></i>
              <i class="icon-mima" slot="prefix"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-submit" type='primary' :loading='loading'
              size='small' @click.native.prevent="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import {isvalidUsername} from '../../utils/validate'
  export default {
    data(){
      const validateUsername = (rule,value,callback) => {
        if(!isvalidUsername(value)){
          callback(new Error('请输入正确的用户名'))
        }else{
          callback()
        }
      }
      return{
        loginForm:{
          username:'',
          password:''
        },
        passwordType:'password',
        loginRules:{
          username:[
            {required:true,trigger:'blur',validator:validateUsername}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'}
          ]
        },
        loading:false
      }
    },
    methods:{
      showPassword(){
        this.passwordType === ''
          ? this.passwordType = 'password'
          : this.passwordType = ''
      },
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.loading = false
            this.$store
              .dispatch('Login',this.loginForm)
              .then(data => {
                this.loading = false
                if(data){
                  this.$router.push('/')
                }
              })
              .catch(()=>{
                this.loading = false
              })
          }else{
            this.$message.error('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container{
    height: 100vh;
    min-width: 1200px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    background: #f0f0f0;
    .right-login{
      .login-main{
        .login-title{
          padding-bottom: 40px;
        }
        background: #fff;
        padding: 50px;
        .login-submit{
          clear: both;
          margin-top: 10px;
          width: 100%;
        }
      }
    }
  }
</style>

