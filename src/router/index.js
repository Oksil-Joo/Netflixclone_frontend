import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },

  {
    path: '/UserSelect',
    name: 'UserSelect',
    component: () => import("../views/UserSelect.vue"),
    props: true
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: () => import("../views/HomeView.vue"),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
