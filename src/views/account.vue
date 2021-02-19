<template>
  <div>
    <div class="body-container">
      <el-container>
        <el-aside width="200px">
          <div class="user_info_box">
            <div class="user-info-top">
              <el-image
                  style="width: 44px; height: 44px; border-radius: 50%; float: left;overflow: hidden;margin-right: 14px;background-size: 100% 100%;"
                  :src="userProfile.url"
                  :fit="userProfile.fit">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span>{{userProfile.username}}</span>
            </div>
            <div class="user-vip-info">
              <div style="display: flex;justify-content: left;text-align: center;align-items: center;">
                <span>VIP</span>
                <icon name="vip_unactive" height="18" width="18"></icon>
              </div>
              <el-button type="text" style="font-size: 12px;">开通会员</el-button>
            </div>
            <div class="user-security-info">
              <p>安全等级</p>
              <el-progress :percentage="50" status="success" :show-text="false"></el-progress>
              <div style="display: flex; justify-content: flex-end;">
                <el-button type="text" style="font-size: 12px;">提高安全等级</el-button>
              </div>
            </div>
          </div>
          <div class="user_center_box">
            <h5>个人中心</h5>
            <el-menu class="el-menu-vertical-demo" :collapse="false" style="text-align: left;border-right:none;"
                     active-text-color="#00cdac" default-active="person-info">
              <el-menu-item index="person-info">
                <i class="el-icon-user"></i>
                <span slot="title">我的信息</span>
              </el-menu-item>
              <el-menu-item index="vip">
                <i class="el-icon-medal"></i>
                <span slot="title">开通会员</span>
              </el-menu-item>
              <el-menu-item index="upload">
                <i class="el-icon-upload"></i>
                <span slot="title">上传记录</span>
              </el-menu-item>
              <el-menu-item index="buy-record">
                <i class="el-icon-s-order"></i>
                <span slot="title">购买记录</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main style="width: 900px;margin-left: 20px;padding: 0;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <div class="footer">
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
  import pageFooter from "../components/footer/pageFooter";
  import Icon from "vue-svg-icon/Icon";

  export default {
    name: "account",
    components: {Icon, pageFooter},
    mounted() {
      console.log("account mounted!");
    },
    data() {
      return {}
    },
    computed: {
      userProfile() {
        if (this.$store.state.userProfile.userType === 'weChat') {
          return {
            fit: "fill",
            username: this.$store.state.userProfile.username,
            url: this.$store.state.userProfile.headImgUrl,
          };
        } else {
          return {
            fit: "fill",
            username: this.$store.state.userProfile.username,
            url: require("@/assets/profile/" + this.$store.state.userProfile.sysHeadIcon),
          };
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .body-container {
    width: 1200px;
    min-height: 800px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 40px;
    /*background-color: #D3DCE6;*/
  }
  .el-aside {
    color: #333;
  }
  .el-main {
  }
  .user_info_box {
    border: 1px solid #c9ced2;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .user-info-top {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 14px 0 0 12px;
    justify-content: left;
    align-items: center;
  }
  .user-info-top span {
    text-align: left;
    line-height: 44px;
    overflow: hidden;
    font-size: 14px;
    color: #2e3133;
  }
  .user-vip-info {
    padding-left: 20px;
    padding-right: 20px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
  }
  .user-vip-info span {
    color: #9f9f9f;
    font-size: 14px;
    margin-right: 10px;
  }
  .user-security-info {
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
  }
  .user-security-info p {
    color: #9f9f9f;
    font-size: 12px;
    text-align: left;
    padding: 5px;
  }
  .level-box {
    height: 22px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .user_center_box {
    border: 1px solid #c9ced2;
    border-radius: 4px;
    margin-bottom: 10px;
    /*background: #f6fcff;*/
  }
  .user_center_box h5 {
    text-align: center;
    line-height: 50px;
    margin: 0;
    font-size: 16px;
    color: #99a2aa;
  }
  /deep/ .el-menu-item {
    padding: 0;
  }
</style>