import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import { Message } from 'element-ui'
import {getCurrentUserMenus, checkAuthentication} from "./api/api";

Vue.config.productionTip = false

// axios.defaults.baseURL = "http://localhost:8888/api"
// 允许跨域使用 cookie
// axios.defaults.withCredentials = true

// Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.use(less)
Vue.prototype.$message = Message;

// 全局守卫路由
router.beforeEach((to, from, next) => {

  console.log("全局守卫： username: ", store.state.username, " ; path:", to.path);
  if (to.path.startsWith('/admin') || to.path.startsWith('admin')) {
    // admin login check
    console.log("admin 全局守卫;", "path:", to.path);
    if (store.state.loginSuccess) {
      if (store.state.adminMenus.length > 0) {
        // 防止重复触发加载菜单操作
        console.log("admin menus 不为空 ", store.state.adminMenus, router);
        if(!store.state.dynamicRoute) {
          let newRoutes = formatRoutes(store.state.adminMenus);
          console.log("newRoutes ", newRoutes);
          console.log("页面刷新了，重新进行动态路由");
          store.dispatch('AddNewRoutes', newRoutes).then(() => {
            next({path: to.path});
          }).catch( () => {
            next({path: "/404"});
          })
        } else {
          next({path: to.path});
        }
      } else {
        // 加载菜单操作
        getCurrentUserMenus().then(res => {
          if (res && res.flag === 'T') {
            store.commit('initAdminMenu', res.data);
            console.log("data:", res.data)
            let fmtRoutes = formatRoutes(res.data);
            console.log("格式化后的数据：", fmtRoutes, router);
            router.addRoutes(fmtRoutes);
            next({path: '/admin'});
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
      checkAuthentication.then(res => {
        if (res.flag === 'T') {
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
