import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import BoardList from '../views/board/BoardList.vue'
// import B from '../views/board/B.vue'

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
      component: () => import('../views/board/BoardList.vue') 
      // component: BoardList
    },
    // {
    //   path: '/b',
    //   name: 'b', 
    //   component: B
    // }
  ]
})

export default router
