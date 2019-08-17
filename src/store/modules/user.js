import serviceManger from '@/service/index'
import {resetRouter} from '@/router'
import cookie from 'js-cookie'

let app = 'app'
const user = {
  state:{
    token:cookie.get(app),
    name:'',
    avatar:'',
    roles:''
  },
  mutations:{
    SetToken(state,token){
      state.token = token
    },
    SetName(state,name){
      state.name = name
    },
    SetAvatar(state,avatar){
      state.avatar = avatar
    },
    SetRoles(state,roles){
      state.roles = roles
    }
  },
  actions:{
    Login({commit},userInfo){
      return new Promise((resolve,reject) => {
        serviceManger.login(userInfo).then(response => {
          if(response){
            cookie.set('app',response.result)
            commit('SetToken',response.result)
            resolve(response)
          }else{
            reject(response)
          }
        })
      })
    },
    GetInfo({commit,state},param){
      console.log(param,'param---')
      return new Promise((resolve,reject) => {
        serviceManger.getInfo(state.token,param).then(response => {
          console.log(response,'response---')
          if(response){
            const data = response.result
            commit('SetRoles',data.roles)
            commit('SetName',data.name)
            commit('SetAvatar',data.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(err =>{
          console.log(err,'++++')
        })
      })
    },
    LogOut({commit,state}){
      return new Promise((resolve,reject)=>{
        serviceManger.logout(state.token).then(()=>{
          commit('SetToken','')
          commit('SetRoles','')
          cookie.remove(app)
          resetRouter()
          resolve()
        }).catch(error =>{
          reject(error)
        })
      })
    },
    resetToken({commit}){
      return new Promise(resolve =>{
        commit('SetToken','')
        commit('SetRolse','')
        cookie.remove(app)
        resolve()
      })
    }
  }
}
export default user