import axios from 'axios'
import {Message} from 'element-ui'


export function request(options){
  return new Promise((resolve,reject) => {
    // 创建axios实例
    const service = axios.create({
      timeout:5000
    })

    // 添加请求拦截器
    service.interceptors.request.use(
      function(config){
        // 在发送请求之前做一些逻辑判断
        console.log('添加请求拦截器',config)
        return config
      },
      function(error){
        // 对请求错误做些逻辑处理
        return Promise.reject(error)
      }
    );
    // 添加响应拦截器
    service.interceptors.response.use(
      function(response){
        const res = response.data
        console.log('添加响应拦截器',response)
        if(res.code !== 200){ // code 逻辑处理
          Message({
            type:'error',
            message:res.message,
            duration:5000
          })
        }else{
          return response.data
        }
      },
      function(error){
        return Promise.reject(error)
      }
    )

    // 请求处理
    service(options).then(res => {
      resolve(res)
    },err =>{
      reject(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default request