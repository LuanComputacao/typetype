import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/speed-test',
      name: 'speed-test',
      component: () => import('../views/SpeedTest.vue')
    },
  ],
})

export default router
