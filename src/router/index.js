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
        component:() => import('@/view/Home')
      }
    ]
  },
  {
    path:'/home',
    component:Layout,
    meta:{title:'Home',icon:'el-icon-menu'}
  },
  {
    path:'/404',
    component:import('@/view/errorPage/404'),
    hidden:true
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path:'/info',
    component:Layout,
    redirect:'/info/table',
    name:'Info',
    meta:{
      title:'Info',
      icon:'el-icon-tickets',
      role:['1','2','3']
    },
    children:[
      {
        path:'table',
        name:'Table',
        component:() => import('@/view/info/table'),
        meta:{title:'Table',role:['1']}
      }
    ]
  },
  {
    path:'/business',
    component:Layout,
    name:'Business',
    meta:{title:'业务管理',icon:'el-icon-news'},
    children:[
      {
        path:'product',
        component:()=>import('@/view/business/product/index'),
        name:'Product',
        meta:{title:'产品管理'},
        children:[
          {
            path:'addProduct',
            component:()=>import('@/view/business/product/addProduct'),
            name:'AddProduct',
            meta:{title:'添加产品'}
          },
          {
            path:'proList',
            component:()=>import('@/view/business/product/productList'),
            name:'productList',
            meta:{title:'产品列表'}
          },
        ]
      }
    ]
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