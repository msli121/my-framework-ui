import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username')),
    adminMenus: window.sessionStorage.getItem("adminMenus") == null ? [] : JSON.parse(window.sessionStorage.getItem("adminMenus") || '[]'),
    loginSuccess: window.sessionStorage.getItem("loginSuccess") == null ? false : JSON.parse(window.sessionStorage.getItem("loginSuccess")),
    userProfile:  window.sessionStorage.getItem("userProfile") == null ? {} : JSON.parse(window.sessionStorage.getItem("userProfile")),
    dynamicRoute: false,
  },
  mutations: {

    initAdminMenu (state, menus) {
      state.adminMenus = menus;
      state.dynamicRoute = true;
      window.sessionStorage.setItem('adminMenus', JSON.stringify(menus));
    },

    loginSuccess (state, data) {
      state.username = data.username;
      state.userProfile = data;
      state.loginSuccess =true;
      window.localStorage.setItem('username', JSON.stringify(data.username));
      window.sessionStorage.setItem('loginSuccess', JSON.stringify('true'));
      window.sessionStorage.setItem('userProfile', JSON.stringify(data));
    },

    logout (state) {
      state.username = '';
      state.userProfile = {};
      state.loginSuccess = false;
      window.localStorage.removeItem('username');
      window.sessionStorage.removeItem('adminMenus');
      window.sessionStorage.removeItem('loginSuccess');
      window.sessionStorage.removeItem('userProfile');
    }
  },
  actions: {
    AddNewRoutes(context, newRoutes) {
      router.addRoutes(newRoutes);
    }
  }
})

