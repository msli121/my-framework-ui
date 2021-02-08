<template>
  <div>
    <div class="header-container">
      <div style="position: relative; width: 80%">
        <div class="header-logo-box">
          <header-logo></header-logo>
        </div>
        <div class="header-nav-box">
          <router-link to="/home/page">首页</router-link>
          <router-link to="/home/ocr">OCR</router-link>
          <router-link to="/home/pdf">PDF</router-link>
          <router-link to="/home/custom">服务定制</router-link>
        </div>
        <div class="header-login-box">
          <header-user-info></header-user-info>
        </div>
      </div>
    </div>
    <div class="router-show-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import headerLogo from "../components/header/headerLogo.vue";
import headerUserInfo from "../components/header/headerUserInfo.vue";

export default {
  name: "home",
  components: { headerLogo, headerUserInfo },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>

.header-container {
  height: 60px;
  width: 100%;
  background: #fff;
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  border-bottom: 1px solid #e6e6e6;
  z-index: 5;
}

.header-logo-box {
  position: absolute;
  height: 60px;
  left: 0px;
  top: 0px;
  width: 200px;
  z-index: 10;
}

.header-login-box {
  position: absolute;
  height: 60px;
  right: 0px;
  top: 0px;
  width: 200px;
  z-index: 2;
}

.header-nav-box {
  height: 60px;
  /*border-bottom: 1px solid #e6e6e6;*/
}

.header-nav-box a {
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
  margin-right: 40px;
  color: #2c3e50;
  height: 56px;
  line-height: 56px;
  text-decoration: none;
}

.header-nav-box a.router-link-exact-active {
  color: #42b983;
  border-bottom: 4px solid #42b983;
}

.header-main-box {
  width: 100%;
}

.router-show-container {
  margin-top: 60px;
}

/deep/ .el-tabs__header {
  margin: 0 0 1px 0;
}

/deep/.el-tabs__nav {
  left: 45%;
}

/deep/ .el-tabs__active-bar {
  height: 4px;
}

/deep/ .el-tabs__item {
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  line-height: 45px;
}
</style>
