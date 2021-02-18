import Vue from 'vue'
import VueRouter from 'vue-router'
import ocr from '@/views/ocr.vue'
import pdf from '@/views/pdf.vue'
import home from '@/views/home.vue'
import homePage from '@/components/homePage.vue'
import adminIndex from "@/components/admin/adminIndex"
import login from "@/views/login"
import account from "@/views/account"

Vue.use(VueRouter)

// 原生push报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

// 原生replace报错处理
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/home/page'
  },

  {
    path: '/index',
    redirect: '/home/page'
  },

  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      requireAuth: false
    },
    children: [
      { path: 'page', component: homePage},
      { path: 'ocr', component: ocr },
      { path: 'pdf', component: pdf },
      // { path: 'custom', component: custom },
    ]
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
  },
  {
    path: '/account',
    name: 'account',
    component: account
  },

  {
    path: '/admin',
    name: 'adminIndex',
    meta: {
      requireAuth: true
    },
    component: adminIndex
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/components/errorPage.vue')
  },

  {
    path: '*',
    name: 'error',
    component: () => import('@/components/errorPage.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  // base: "/ocr/",
  routes
})

export default router
