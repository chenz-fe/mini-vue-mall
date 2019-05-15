import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './http-interceptor'
import XHeader from './components/Header.vue'

Vue.config.productionTip = false

Vue.component('x-header', XHeader)

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
