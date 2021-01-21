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
  border-bottom: 1px solid #e6e6e6;
  z-index: 2;
}

.header-logo-box {
  position: absolute;
  height: 60px;
  left: 60px;
  top: 0px;
  width: 200px;
  z-index: 3;
}

.header-login-box {
  position: absolute;
  height: 60px;
  right: 60px;
  top: 0px;
  width: 200px;
  z-index: 3;
}
</style>
