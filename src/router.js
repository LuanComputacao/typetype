import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Run from './views/Run.vue'
import Stompt from './views/Stompt.vue'
import Train from './views/Train.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/run',
      name: 'run',
      component: Run
    },
    {
      path: '/training',
      name: 'training',
      component: Train
    },
    {
      path: '/stompt',
      name: 'stompt',
      component: Stompt
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
