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
            console.log(response,'---')
            cookie.set('app',response.user_id)
            commit('SetToken',response.user_id)
            resolve(response)
          }else{
            reject(response)
          }
        })
      })
    },
    GetInfo({commit,state}){
      return new Promise((resolve,reject) => {
        serviceManger.getInfo().then(response => {
          if(response){
            const data = response.data
            commit('SetRoles',data.user_id)
            commit('SetName',data.nickname)
            commit('SetAvatar',data.balance)
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
        serviceManger.logout().then(()=>{
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