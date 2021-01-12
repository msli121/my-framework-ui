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
Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.use(less)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
