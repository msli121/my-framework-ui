<template>
  <div class="login-body-container">
    <el-form
      class="login-container"
      :model="loginForm"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="" style="width: 100%">
        <el-button type="primary" style="width: 100%" v-on:click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/api"

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123",
      },
      responseResult: [],
    };
  },
  methods: {
    login() {
      let that = this;
      login(this.loginForm.username, this.loginForm.password).then(res => {
          console.log("successResponse", res);
          if (res.flag === "T") {
            that.$store.commit("loginSuccess", res.data);
            let toPath = this.$route.query.redirect;
            that.$message({
              type: "success",
              message: res.msg,
            });
            console.log("login toPath:", toPath)
            if (toPath) {
              console.log("toPath startsWith:", toPath.startsWith("/admin"))
              if (toPath.startsWith("/admin") || toPath.startsWith("admin")) {
                toPath = "/admin";
              }
            }

            that.$router.replace({
              path:
                toPath === "/" || toPath === undefined ? "/home/page" : toPath,
            });

          } else {
            that.$message.error(res.msg);
          }
        })
        .catch( e => {
          console.log("login error", e);
          that.$message.error("服务器异常");
        });
    },
  },
};
</script>

<style>
.login-body-container {
  /* background: url("/images/login-bg.jpg") no-repeat; */
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

