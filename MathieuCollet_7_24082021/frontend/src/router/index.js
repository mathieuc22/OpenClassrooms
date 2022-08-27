import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Submit from '../views/Submit.vue'
import Post from '../views/Post.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import store from '../store'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const ifModerator = (to, from, next) => {
  if (store.state.user.moderator) {
    next()
    return
  }
  next('/')
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
    path: '/posts/:id/edit',
    name: 'Edit',
    component: Edit,
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
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: ifModerator
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
