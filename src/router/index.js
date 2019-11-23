import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Layout from '@/view/layout/layout'

// 公共路由
export const commonRouterMap = [
  {
    path:'/login',
    hidden:true,
    component:() => import('@/view/login/login')
  },{
    path:'/',
    component:Layout,
    redirect:'/home',
    name:'Home',
    hidden:true,
    children:[
      {
        path:'home',
        component:() => import('@/view/page/Home')
      }
    ]
  },{
    path:'/home',
    component:Layout,
    meta:{title:'统计',icon:'el-icon-menu'}
  },{
    path:'/404',
    component:import('@/view/errorPage/404'),
    hidden:true
  }

]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path:'/exchange',
    component:Layout,
    children:[{
      path:'index',
      component:() => import('@/view/page/exchange'),
      name:'Exchange',
      meta:{title:'交易所管理',icon:'el-icon-pie-chart'},
    }]
  },{
    path:'/robot',
    component:Layout,
    children:[{
      path:'index',
      component: () => import('@/view/page/robot'),
      meta:{title:'机器人管理',icon:'el-icon-coordinate'},
      name:'robot',
    }]
  },{
    path:'/buy',
    component:Layout,
    children:[
      {
        path:'index',
        component:()=>import('@/view/page/buy'),
        name:'Buy',
        meta:{title:'购买机器人',icon:'el-icon-news'},
      },
    ]
  },{
    path:'/modifyPWD',
    component:Layout,
    hidden:true,
    children:[{
      path:'index',
      component:() => import('@/view/page/modifyPwd'),
      meta:{title:'修改密码'}
    }]
  },{
    path:'/invest',
    component:Layout,
    hidden:true,
    children:[{
      path:'index',
      component:() => import('@/view/page/invest'),
      meta:{title:'充值中心'}
    }]
  }
]

// 实例化Vue的时候只挂载commonRouterMap
const createRouter = () => new VueRouter({
  scrollBehavior:()=>({y:0}),
  routes:commonRouterMap
})

const router = createRouter()

export function resetRouter(){
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router