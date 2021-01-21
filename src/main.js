import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import { Message } from 'element-ui'

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:8888/api"
// 允许跨域使用 cookie
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.use(less)
Vue.prototype.$message = Message;

// 全局守卫路由
router.beforeEach((to, from, next) => {

  // console.log("全局守卫： username: ", store.state.username, " ; path: ", to.path);

  if (to.path.startsWith('/admin') || to.path.startsWith('admin')) {
    // admin login check
    // console.log("admin 全局守卫;", "path:", to.path);
    if (store.state.loginSuccess) {
      if (store.state.adminMenus.length > 0) {
        // 防止重复触发加载菜单操作
        next();
      } else {
        // 加载菜单操作
        axios.get('/admin/menus').then(res => {
          if (res && res.data.flag === 'T') {
            console.log("data:", res.data.data)
            let fmtRoutes = formatRoutes(res.data.data);
            router.addRoutes(fmtRoutes);
            // console.log("格式化后的数据：", fmtRoutes, router);
            store.commit('initAdminMenu', fmtRoutes);
            next();
          } else {
            Vue.prototype.$message.error("验证失败，请重新登录");
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          }
        }).catch(e => {
          Vue.prototype.$message.error("系统异常，请重新登录");
          console.log(e);
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        })
      }
    } else {
      Vue.prototype.$message.error("验证失败，请重新登录");
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else if (to.path.startsWith('/login')) {
    // direct to login page
    next();
  } else if (to.meta.requireAuth) {
    // 登录需要授权的页面时，判断后端是否正常登录（防止构造参数绕过）
    if (store.state.username) {
      axios.get('/authentication').then(res => {
        if (res.data.flag === 'T') {
          next()
        } else {
          Vue.prototype.$message.error("验证失败，请重新登录");
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      }).catch(e => {
        Vue.prototype.$message.error("系统异常，请重新登录");
        console.log(e);
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      })
    } else {
      Vue.prototype.$message.error("验证失败，请重新登录");
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    // 无其他要求直接路由
    console.log("无其他要求直接路由");
    next();
  }
})

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
