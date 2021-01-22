<template>
  <body id="paper">
    <el-form
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login_title">用户注册</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 40%; background: #505458; border: none"
          v-on:click="register"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
import {registry} from  "../api/api"
export default {
  name: "registry",
  data() {
    return {
      checked: true,
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    register() {
      let that = this;
      registry(this.loginForm.username, this.loginForm.password)
        .then( res => {
          console.log("successResponse", res);
          if (res.flag === "T") {
            // 更新store中用户信息
            that.$store.commit("loginSuccess", res.data);
            that.$message({
              type: 'success',
              message: res.msg
            });
            let path = this.$route.query.redirect;
            // 页面按需跳转
            that.$router.replace({path: path === '/' || path === undefined ? '/home/page' : path});
          } else {
            that.$message.error(res.msg);
          }
        })
        .catch(e => {
          console.log(e);
          this.$message.error("服务器异常");
        });
    },
  },
};
</script>
<style>
#paper {
  
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: -5px 0px;
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

