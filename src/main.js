import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:8888/api"
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.use(less)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      axios.get('/authentication').then(res => {
        if (res.data.code) {
          next()
        } else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          })
        }
      })
    
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
