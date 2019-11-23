const path = require('path')

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  lintOnSave:false,
  chainWebpack:config => {
    config.resolve.alias.set('@',resolve('src'))
  },
  publicPath:process.env.NODE_ENV === 'production'?'/admin':'/',
  productionSourceMap: false,
  devServer:{
    port:9090,
    host:'0.0.0.0',
    https:false,
    open:true,
    proxy:{
      '/admin':{
        target:'http://192.168.0.12:8000',
        ws:false
      }
    }
  }
}