import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import MyMap from '../views/MyMap.vue'
import MyMapEdit from '../views/MyMapEdit.vue'
import Spot from '../views/Spot.vue'
import Post from '../views/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/mymap',
    name: 'MyMap',
    component: MyMap,
    meta: {
      requresAuth: true,
    }
  },
  {
    path: '/mymapedit',
    name: 'MyMapEdit',
    component: MyMapEdit,
    meta: {
      requresAuth: true,
    }
  },
  {
    path: '/spot',
    name: 'Spot',
    component: Spot
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post,
    meta: {
      requresAuth: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requresAuth) &&
    !store.state.auth
  ) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next();
  }
})

export default router
