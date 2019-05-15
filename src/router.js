import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'
import History from './utils/history'

Vue.use(Router)
Vue.use(History)

Router.prototype.goBack = function() {
  this.isBack = true
  this.back()
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Cart',
      name: 'cart',
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Cart.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (router.isBack) {
    History.pop()
    router.isBack = false
    router.transitionName = 'route-back'
  } else {
    History.push(to.path)
    router.transitionName = 'route-forward'
  }
})

export default router
