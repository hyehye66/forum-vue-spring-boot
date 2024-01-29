import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardWrite from '../views/board/BoardWrite.vue'
// import Bbb from '../views/board/Bbb.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/board/list',
      name: 'BoardList',
      component: () => import(/* webpackChunkName: "BoardList" */ '../views/board/BoardList.vue') 
      // component: BoardList
    },
    {
      path: '/board/detail',
      name: 'BoardDetail', 
      component: () => import(/* webpackChunkName: "BoardList" */ '../views/board/BoardDetail.vue')
    },
    {
      path: '/board/write',
      name: 'BoardWrite',
      component: BoardWrite
    },
    // {
    //   path: '/board/bbb',
    //   name: 'Bbb',
    //   component: Bbb
    // }
  ]
})

export default router
