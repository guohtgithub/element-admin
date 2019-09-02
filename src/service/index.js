import request from './axios-config'

class serceManger {
  // 登录
  login(param=null){
    return request({
      data:param,
      method:'post',
      url:'/api/login'
    })
  }

  // 获取用户信息
  getInfo(token=null){
    return request({
      headers:{
        token
      },
      data:null,
      method:'post',
      url:'/api/operate/getInfo'
    })
  }

  // 退出登录
  logout(token=null,param=null){
    return request({
      headers:{
        token
      },
      data:param,
      method:'post',
      url:'/user/logout'
    })
  }
}

export default new serceManger()