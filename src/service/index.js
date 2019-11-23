import request from './axios-config'

class serceManger {
  // 登录
  login(param=null){
    return request({
      data:param,
      method:'post',
      url:'/admin/user/login'
    })
  }

  // 获取用户信息
  getInfo(){
    return request({
      data:null,
      method:'get',
      url:'/admin/user/info'
    })
  }

  // 退出登录
  logout(){
    return request({
      method:'get',
      url:'/admin/user/logout'
    })
  }

  // 修改密码
  modifyPwd(param){
    return request({
      data:param,
      method:'post',
      url:'/admin/user/mod'
    })
  }

  // 交易所列表
  getExchange(){
    return request({
      method:'get',
      url:'/admin/exchange/list '
    })
  }

  //添加交易所
  addExchange(param){
    return request({
      data:param,
      method:'post',
      url:'/admin/exchange/add'
    })
  }

  // 充值
  walletBalance(){
    return request({
      method:'get',
      url:'/admin/user/wallet/balance'
    })
  }

  // 套餐列表
  getProduct(){
    return request({
      method:'get',
      url:'/admin/product/list'
    })
  }

  //机器人列表
  getRobot(){
    return request({
      method:'get',
      url:'/admin/bot/list'
    })
  }

  //操作机器人
  robotOperator(param=null,type){
    let url = null
    if(type == 'add'||type=='revise'){ // 添加/修改机器人
      url = "/admin/bot/add"
    }else if(type =='toggle'){ // 启用/禁用机器人
      url = '/admin/bot/toggle'
    }else{ // 删除机器人
      url = '/admin/bot/del'
    }
    return request({
      data:param,
      method:'post',
      url:url
    })
  }

  // 获取机器人 IP
  getRobotIP(){
    return request({
      method:'get',
      url:'/admin/bot/getip'
    })
  }
  
}

export default new serceManger()