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
    host:'localhost',
    https:false,
    open:true,
    proxy:'http://localhost:3030'
  }
}