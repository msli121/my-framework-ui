<template>
  <div class="header-container">
    <div>
      <div class="header-logo-box">
        <header-logo></header-logo>
      </div>
      <div class="header-login-box">
        <header-user-info></header-user-info>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogo from '../header/headerLogo.vue';
import HeaderUserInfo from '../header/headerUserInfo.vue';


export default {
  name: "adminHeader",
  components: { HeaderLogo, HeaderUserInfo },
};
</script>

<style lang="less" scoped>
.header-container {
  height: 60px;
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 5;
}

.header-logo-box {
  position: absolute;
  height: 60px;
  left: 18%;
  top: 0px;
  width: 200px;
  z-index: 10;
}

.header-login-box {
  position: absolute;
  height: 60px;
  right: 18%;
  top: 0px;
  width: 200px;
  z-index: 2;
}
</style>
