<template>
  <div class="user-info-container">
    <div v-if="!loginSuccess" class="header-login-box">
      <el-button
        type="text"
        style="color: #606266;font-size=16px;font-weight:bold;"
        @click="handleLogin"
        >登录</el-button
      >
      <el-divider direction="vertical" style="width: 2px"></el-divider>
      <el-button
        type="text"
        style="font-size=16px;font-weight:bold;"
        @click="handleRegistry"
        >注册</el-button
      >
    </div>
    <div v-else class="header-login-success">
      <el-image
        style="width: 25px; height: 25px; border-radius: 25px"
        :src="userProfile.url"
        :fit="userProfile.fit"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>

      <span style="display: inline-block; width: 10px"></span>

      <el-dropdown size="small" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userProfile.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid" command="user_center"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-tickets" command="buy_record"
            >购买记录</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-medal" command="vip_center"
            >会员中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="adminConfig"
            >管理中心</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-switch-button" command="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerUserInfo",
  data() {
    return {};
  },
  mounted() {
    console.log("mounted", this.$store.state.userProfile);
  },
  computed: {
    loginSuccess() {
      return this.$store.state.loginSuccess;
    },
    userProfile() {
      return {
        fit: "fill",
        username: this.$store.state.userProfile.username,
        url: "/profile/" + this.$store.state.userProfile.sysHeadIcon,
      };
    },
    userHeadIconUrl() {
      console.log(
        "@/assets/profile/" + this.$store.state.userProfile.sysHeadIcon
      );
      return "@/assets/profile/" + this.$store.state.userProfile.sysHeadIcon;
    },
  },
  methods: {
    handleLogin() {
      // console.log(JSON.stringify('true'));
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.path },
      });
    },

    handleRegistry() {
      this.$router.push({
        path: "/registry",
        query: { redirect: this.$route.path },
      });
    },
    handleCommand(command) {
      if (command === "logout") {
        this.axios
          .get("/logout")
          .then((res) => {
            if (res.data.flag === "T") {
              this.$store.commit("logout");
              this.$message.info("退出登录");
              this.$router.replace({ path: "/home/page" });
            }
          })
          .catch((e) => {
            console.log("logout error", e);
            this.$message.error("服务器异常");
          });
      } else if (command === "user_center") {
        this.$message.success("暂无实现");
      } else if (command === "buy_record") {
        this.$message.success("暂无实现");
      } else if (command === "vip_center") {
        this.$message.success("暂无实现");
      } else if (command === "adminConfig") {
        console.log("adminConfig" ,command)
        this.$router.push({ path: "/admin" });
      }
    },
  },
};
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

.header-login-success {
  display: flex;
  height: 60px;
  flex-flow: row nowrap;
  justify-content: flex-end;
  text-align: center;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>