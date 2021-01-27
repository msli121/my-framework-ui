<template>
  <div class="body-container">
    <div class="main-container">
      <div  v-if="loginShow">
        <h3 class="login_title">登录</h3>
        <el-tabs v-model="loginType" @tab-click="handleClick" stretch>
          <el-tab-pane label="账号密码" name="password">
            <el-form :model="loginForm" label-position="left" label-width="0px" v-loading="loading">
              <el-form-item label="">
                <el-input type="text"
                          v-model="loginForm.username"
                          auto-complete="off"
                          prefix-icon = "el-icon-user"
                          placeholder="请输入用户名或邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-input
                    type="password"
                    v-model="loginForm.password"
                    auto-complete="off"
                    prefix-icon = "el-icon-lock"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="" style="width: 100%">
                <el-button type="primary" style="width: 100%" v-on:click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="微信扫码" name="wechat">
            <wx-login id="wxLogin" :theme="'black'"
                       :appid="appId"
                       :scope="'snsapi_login'"
                       :redirect_uri="redirect_uri"></wx-login>
          </el-tab-pane>
          <el-tab-pane label="短信验证" name="phoneNumber">
            <div style="min-height: 200px;">暂无实现</div>
          </el-tab-pane>
        </el-tabs>
        <el-row class="login_footer">
          <el-button type="text"
                     style="color: #606266;font-size:14px;"
                     @click="handleForgetPassword">忘记密码</el-button>
          <el-divider direction="vertical" style="width: 2px"></el-divider>
          <el-button type="text"
                     style="font-size:14px;"
                     @click="loginShow = !loginShow">立即注册</el-button>
        </el-row>
      </div>
      <div v-else>
        <h3 class="registry_title">注册</h3>
        <el-form :model="registryForm" label-position="right"
                 label-width="80px" v-loading="loading">
          <el-form-item label="用户名">
            <el-input type="text"
                      v-model="registryForm.username"
                      placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
                v-model="registryForm.email"
                auto-complete="off"
                placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
                type="password"
                v-model="registryForm.password"
                auto-complete="off"
                placeholder="请输入密码"
                show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
                type="password"
                v-model="registryForm.passwordConfirm"
                auto-complete="off"
                placeholder="请输入密码"
                show-password
            ></el-input>
          </el-form-item>
          <el-row>
            <el-button type="primary" style="width: 98%" v-on:click="registry">注册</el-button>
          </el-row>
<!--          <el-form-item label="" style="width: 100%">-->
<!--            <el-button type="primary" style="width: 100%" v-on:click="registry">注册</el-button>-->
<!--          </el-form-item>-->
        </el-form>
        <el-row class="login_footer">
          <el-button type="text"
                     style="font-size:14px;"
                     @click="loginShow = !loginShow">登录已有账号</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import {login, registry} from "../base/api"
import wxLogin from 'vue-wxlogin'

export default {
  name: "login",
  components: { wxLogin },

  data() {
    return {
      loginShow: true,
      loginType: "password",
      appId: "wxd6b5f4ad7aabf59a",
      redirect_uri: "localhost:8080/home/page",
      loading: false,
      loginForm: {
        username: "admin",
        password: "123",
      },
      registryForm: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
      },
      responseResult: [],
    };
  },

  mounted() {
    if(this.$route.query.type === "registry") {
      this.loginShow = false;
    }
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

    handleClick() {

    },
    handleForgetPassword() {
      this.$message.error("该功能暂未实现");
    },
  },
};
</script>

<style scoped lang="less">

/deep/ #wxLogin iframe {
  height: 250px;
}

.body-container {
  min-width: 980px;
  height: 100%;
  background: url('../../public/images/login-bg.png') 20px 20px no-repeat;
  margin: 0 auto;
}
.main-container {
  border-radius: 15px;
  position: relative;
  float: right;
  right: 10%;
  width: 350px;
  background-clip: padding-box;
  margin: 90px auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 10px auto;
  text-align: center;
  color: #505458;
}

.registry_title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}

</style>

