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
  console.log("username: ", store.state.username, "path: ", to.path)
  if (store.state.username && to.path.startsWith('/admin')) {
    console.log(store.state.username, " login admin ", to.path)
    initAdminMenu(router, store)
  }
  if (store.state.username && to.path.startsWith('/login')) {
    next({})
  }
  // 如果前端没有登录信息则直接拦截
  // 如果有则判断后端是否正常登录（防止构造参数绕过）
  if (to.meta.requireAuth) {
    if (store.state.username) {
      axios.get('/authentication').then(res => {
        if (res.data.flag === 'T') {
          next()
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      })
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
}
)

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  axios.get('/menu').then(res => {
    if (res && res.data.flag === 'T') {
      let fmtRoutes = formatRoutes(res.data.data)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}


// 格式化后端接受的路由数据
const formatRoutes = (routes) => {
  let formatRoutes = [];
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: () => import('@/components/admin/' + route.component + '.vue'),
      name: route.name,
      nameZh: route.nameZh,
      icon: route.icon,
      mete: {
        requireAuth: true
      },
      children: route.children
    };
    formatRoutes.push(fmtRoute);
  })
  return formatRoutes;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
