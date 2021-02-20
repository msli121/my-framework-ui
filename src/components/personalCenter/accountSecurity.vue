<template>
  <div>
    <div class="account-item-title">
      <i class="el-icon-user"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">账号安全</span>
    </div>
    <div class="account-item-body">
      <el-divider style="width: 90%;"><i class="el-icon-message"></i></el-divider>
      <div class="we-chat-bind">
        <div class="bind-left">
          <h3 class="title">邮箱</h3>
          <span class="desc">未绑定，绑定后可进行找回帐号等</span>
        </div>
        <div class="bind-right">
          <el-button type="primary" plain>绑定</el-button>
        </div>
      </div>
      <el-divider style="width: 90%;"><i class="el-icon-mobile-phone"></i></el-divider>
      <div class="we-chat-bind">
        <div class="bind-left">
          <h3 class="title">手机号</h3>
          <span class="desc">未绑定，绑定后可进行找回帐号等</span>
        </div>
        <div class="bind-right">
          <el-button type="primary" plain>绑定</el-button>
        </div>
      </div>
      <el-divider style="width: 90%;"><i class="el-icon-cloudy"></i></el-divider>
      <div class="we-chat-bind">
        <div class="bind-left">
          <h3 class="title">第三方绑定</h3>
          <span class="desc">未绑定，绑定后通过第三方帐号快速扫码登录</span>
        </div>
        <div class="bind-right">
          <el-button type="primary" plain>绑定</el-button>
        </div>
      </div>
      <el-divider style="width: 90%;"><i class="el-icon-lock"></i></el-divider>
      <div class="we-chat-bind">
        <div class="bind-left">
          <h3 class="title">登录密码</h3>
          <span class="desc">设置/重置账号登录密码</span>
        </div>
        <div class="bind-right">
          <el-button type="primary" plain>设置</el-button>
        </div>
      </div>
      <el-divider style="width: 90%;"><i class="el-icon-postcard"></i></el-divider>
      <div class="we-chat-bind">
        <div class="bind-left">
          <h3 class="title">实名认证</h3>
          <span class="desc">进行实名认证</span>
        </div>
        <div class="bind-right">
          <el-button type="primary" plain>认证</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "baseInfo",
    data() {
      return {
        personalInfoForm: {
          userName: "admin",
          gender: "male",
          birthday: "",
          city: "",
          organization: ""
        }
      }
    },
    methods: {
      updatePersonalInfo() {

      }
    }
  }
</script>

<style scoped lang="less">
  .account-item-title {
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #e2e9ed;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    background: #eef2f4;
    padding: 12px 28px;
    min-height: 46px;
    color: rgb(0, 205, 172);
  }
  .account-item-title-content {
    display: inline-block;
    font-size: 16px;
    cursor: default;
  }
  /deep/ .el-form {
    width: 460px;
  }
  .account-item-body {
    margin: 0 20px 20px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .we-chat-bind {
    width: 90%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
  h3:first-child {
    margin: 0;
    text-align: left;
    font-size: 14px;
  }
  .desc {
    margin: -7px 0 24px;
    color: rgb(125, 139, 148);
    font-size: 14px;
  }
</style>