<template>
  <div>
    <div class="account-item-title">
      <i class="el-icon-user"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">基本信息<span class="uid">(UID:{{userProfile.uid}})</span></span>
    </div>
    <div class="account-item-body">
      <el-form ref="form" :model="userProfile" label-width="80px">
        <el-form-item label="头像:" style="text-align: left;margin-bottom: 12px;">
          <el-avatar :size="50" :src="avatar.url"></el-avatar>
          <el-button type="text" style="font-size: 12px;margin-left: 10px;" @click="handleChangeAvatar">更换头像</el-button>
        </el-form-item>
        <el-form-item label="用户名:">
          <div style="text-align: left; font-size: 16px;color: #8492a6;">{{userProfile.username}}</div>
<!--          <el-input v-model="userProfile.username" readonly></el-input>-->
        </el-form-item>
        <el-form-item label="性别:" style="text-align: left;">
          <el-radio-group v-model="userProfile.sex">
            <el-radio label="x">保密</el-radio>
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="userProfile.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="所在城市:">
          <el-input v-model="userProfile.city"></el-input>
        </el-form-item>
        <el-form-item label="公司/学校:">
          <el-input v-model="userProfile.organization"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" size="small" @click="updatePersonalInfo">更新信息</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "baseInfo",
    data() {
      return {
      }
    },
    computed: {
      avatar() {
        if (this.$store.state.userProfile.userType === 'weChat') {
          return {
            fit: "fill",
            url: this.$store.state.userProfile.headImgUrl,
          };
        } else {
          return {
            fit: "fill",
            url: require("@/assets/profile/" + this.$store.state.userProfile.sysHeadIcon),
          };
        }
      },

      userProfile() {
        return this.$store.state.userProfile;
      }
    },
    methods: {
      handleChangeAvatar() {
        this.$message.error("暂未实现！！");
      },
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
  .uid {
    color: rgb(141, 158, 167);
    font-size: 14px;
    margin-left: 5px;
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
    margin: 20px;
    display: flex;
    justify-content: center;
  }
</style>