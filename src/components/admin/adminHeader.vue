<template>
  <div class="header-container">
    <div style="position: relative; width: 1200px;">
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
  position: relative;
  display: flex;
  justify-content: center;
  top: 0;
  border-bottom: 2px solid #e6e6e6;
  background: var(--gray-02,#f0f0f0);
  z-index: 2;
}

.header-logo-box {
  position: absolute;
  height: 60px;
  //left: 60px;
  top: 0px;
  width: 200px;
  z-index: 3;
}

.header-login-box {
  position: absolute;
  height: 60px;
  right: 0px;
  top: 0px;
  width: 200px;
  z-index: 3;
}
</style>
