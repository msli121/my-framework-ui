import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/line-awesome.min.css";
import "./assets/css/animate.css";
import "./assets/css/flaticon.css";
import "./assets/css/owl.carousel.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/js/jquery-1.12.4.min.js";
import "./assets/js/popper.min.js";
import "./assets/js/bootstrap.min.js";
import "./assets/js/wow.min.js";
// import "./assets/js/jquery.waypoints.min.js";
import "./assets/js/jquery.countdown.js";
// import "./assets/js/owl.carousel.min.js";
import "./assets/js/jquery.sticky.js";
// import "./assets/js/main.js";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
