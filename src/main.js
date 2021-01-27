import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import { Message } from 'element-ui'
import {checkAuthentication, getCurrentUserMenusWithTree} from "./base/api";

Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.use(less)
Vue.prototype.$message = Message;

// 全局守卫路由
router.beforeEach((to, from, next) => {
  console.log("全局守卫： username: ", store.state.username, " ; path:", to.path);

  if(to.path.startsWith('/login')) {
    next();
  }

  if(store.state.username && to.path.startsWith('/admin')) {
    initAdminMenu(router, store);
  }

  // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
  if (to.meta.requireAuth) {
    if (store.state.username) {
      checkAuthentication().then(res => {
        if (res.flag === 'T') {
          next()
        } else {
          Vue.prototype.$message.error("验证失败，请重新登录");
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {
    return
  }
  // 加载菜单操作
  getCurrentUserMenusWithTree().then(res => {
    if (res && res.flag === "T") {
      let newRoutes = formatRoutes(res.data)
      router.addRoutes(newRoutes)
      store.commit('initAdminMenu', newRoutes)
    }
  })
}

// 格式化后端接受的路由数据
const formatRoutes = (routes) => {
  let fmtRoutes = [];
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
    fmtRoutes.push(fmtRoute);
  })
  return fmtRoutes;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
