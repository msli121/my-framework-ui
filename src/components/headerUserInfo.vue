<template>
  <div class="user-info-container">
    <div v-if="!isLogin" class="header-login-box">
      <el-button type="text" style="color: #606266;font-size=16px;font-weight:bold;" >登录</el-button>
      <el-divider direction="vertical" style="width: 2px;"></el-divider>
      <el-button type="text" style="font-size=16px;font-weight:bold;" >注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerUserInfo",
  data() {
    return {
      isLogin: false
    }
  }
}
</script>

<style lang="less" scoped>
  .header-login-box {
    display: flex;
    height: 60px;
    flex-flow: row nowrap;
    justify-content: flex-end;
    text-align: center;
    align-items: center;
}
</style>