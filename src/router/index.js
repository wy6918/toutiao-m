import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由 只能有一个
        component: () => import('@/views/home')
      },
      {
        path: '/wenda',
        component: () => import('@/views/wenda')
      },
      {
        path: '/shipin',
        component: () => import('@/views/shipin')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:aticleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启props传参
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
