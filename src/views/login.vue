<template>
  <div class="body-container">
    <div class="main-container">
      <div  v-if="loginShow">
        <h3 class="login_title">登录</h3>
        <el-tabs v-model="loginType" @tab-click="handleClick" stretch>
          <el-tab-pane label="微信扫码" name="weChat">
            <wx-login id="wxLogin"
                      theme="black"
                      :state="state"
                      :appid="appId"
                      :scope="scope"
                      :redirect_uri="redirect_uri"></wx-login>
          </el-tab-pane>
          <el-tab-pane label="短信验证" name="phoneNumber">
            <div style="min-height: 200px;">暂无实现</div>
          </el-tab-pane>
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
                <el-button type="primary" style="width: 100%" v-on:click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
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
        <el-form :model="registryForm" label-position="right" label-width="80px"
                 v-loading="loading" ref="registryForm"
                 :rules="registry_rules">
          <el-form-item label="用户名" prop="username"
                        :rules="{required: true, message: '用户名不能为空', trigger: 'blur'}">
            <el-input type="text"
                      v-model="registryForm.username"
                      placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email"
                        :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
            <el-input
                v-model="registryForm.email"
                auto-complete="off"
                placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                type="password"
                v-model="registryForm.password"
                auto-complete="off"
                placeholder="请输入密码"
                show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordConfirm">
            <el-input
                type="password"
                v-model="registryForm.passwordConfirm"
                auto-complete="off"
                placeholder="请输入密码"
                show-password
            ></el-input>
          </el-form-item>
          <el-row>
            <el-button type="primary" style="width: 98%" v-on:click="handleRegistry">注册</el-button>
          </el-row>
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

  import {login, loginByWechat, registry} from "../base/api"
import wxLogin from 'vue-wxlogin'

export default {
  name: "login",
  components: { wxLogin },

  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registryForm.passwordConfirm !== '') {
          this.$refs.registryForm.validateField('passwordConfirm');
        }
        callback();
      }
    };
    let validatePasswordConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registryForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 页面全局参数
      loginShow: true,
      loginType: "weChat",
      loading: false,
      responseResult: [],
      // 微信登录 所需参数
      appId: "wx32e95d3c6fbe4913",
      scope: "snsapi_login",
      code:"",
      state: "271828",
      redirect_uri: encodeURI("https://www.performercn.com/login"),
      // 账号密码登录参数
      loginForm: {
        username: "admin",
        password: "123",
      },
      // 注册参数
      registryForm: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
      },
      registry_rules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { validator: validatePasswordConfirm, trigger: 'blur' }
        ],
      }
    };
  },

  mounted() {

    if(this.$route.query.redirect) {
      let url = "https://www.performercn.com/login?redirect=" + this.$route.query.redirect;
      this.redirect_uri = encodeURI(url);
    }

    if(this.$route.query.type === "registry") {
      this.loginShow = false;
    }

    if(this.$route.query.code) {
      let params = {};
      params.code = this.$route.query.code;
      params.appId = this.appId;
      params.grantType = "authorization_code";
      if(this.$route.query.state) {
        params.state = this.$route.query.state;
      }
      console.log("code 1111111111", this.$route.query.code);
      this.getUserProfile(params);
    }

  },

  methods: {

    handleLogin() {
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
        }).catch( e => {
          console.log("login error", e);
          that.$message.error("服务器异常");
        });
    },

    handleRegistry() {
      let that = this;
      this.$refs['registryForm'].validate(res => {
        if(res) {
          registry(this.registryForm)
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
        }
      })
    },

    handleClick() {

    },

    handleForgetPassword() {
      this.$message.error("该功能暂未实现");
    },

    getUserProfile(params) {
      let that= this;
      console.log("开始调用微信登录接口！！！", )
      loginByWechat(params).then(res => {
        if(res.flag === "T") {
          that.$store.commit("loginSuccess", res.data);
          let toPath = this.$route.query.redirect;
          that.$message({
            type: "success",
            message: res.msg,
          });
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
      }).catch( e => {
        console.log("login error", e);
        that.$message.error("服务器异常");
      });
    }

  },
};
</script>

<style scoped lang="less">

.body-container {
  min-width: 980px;
  height: 100%;
  background: url('../assets/images/login-bg.png') 20px 20px no-repeat;
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

