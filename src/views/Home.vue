<template>
  <div>
    <div class="header-container">
      <div>
        <div class="header-logo-box">
          <header-logo @logo-click="activeName = 'home'"></header-logo>
        </div>
        <div class="header-nav-box">
          <router-link to="/home">Home</router-link>
          <router-link to="/ocr">OCR</router-link>
          <router-link to="/pdf">PDF</router-link>
        </div>
        <div class="heder-login-box"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import headerLogo from "../components/headerLogo.vue";

export default {
  name: "home",
  components: { headerLogo },
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
}

.header-logo-box {
  position: absolute;
  height: 60px;
  left: 18%;
  top: 0px;
  width: 200px;
  z-index: 2;
}

.header-nav-box {
  height: 60px;
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

.heder-login-box {
  position: absolute;
  height: 60px;
  right: 18%;
  top: 0px;
  width: 200px;
  z-index: 2;
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
