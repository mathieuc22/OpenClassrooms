import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'
import Post from '../views/Post.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/submit',
    name: 'Submit',
    component: Submit,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: Post,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: ifAuthenticated,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
