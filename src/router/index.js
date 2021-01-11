import Vue from 'vue'
import VueRouter from 'vue-router'
import ocr from '../views/ocr.vue'
import pdf from '../views/pdf.vue'
import login from '../views/login.vue'
import homePage from '../components/homePage.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirct: '/home'
  },

  {
    path: '/home',
    name: 'home',
    component: homePage,
  },

  {
    path: '/ocr',
    name: 'ocr',
    component: ocr
  },

  {
    path: '/pdf',
    name: 'pdf',
    component: pdf
  },

  {
    path: '/login',
    name: 'login',
    component: login
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
