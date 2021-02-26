<template>
  <div>
    <div class="account-item-title">
      <i class="el-icon-user"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">基本信息<span class="uid">(UID:{{userProfile.uid}})</span></span>
    </div>
    <div class="account-item-body" v-loading="loading">
      <el-form ref="form" :model="baseInfo" label-width="80px">
        <el-form-item label="头像:" style="text-align: left;margin-bottom: 12px;">
          <el-avatar :size="50" :src="avatar.url"></el-avatar>
          <el-button type="text" style="font-size: 12px;margin-left: 10px;" @click="handleChangeAvatar">更换头像</el-button>
        </el-form-item>
        <el-form-item label="用户名:">
          <div style="text-align: left; font-size: 16px;color: #8492a6;">{{baseInfo.username}}</div>
<!--          <el-input v-model="userProfile.username" readonly></el-input>-->
        </el-form-item>
        <el-form-item label="性别:" style="text-align: left;">
          <el-radio-group v-model="baseInfo.sex">
            <el-radio label="x">保密</el-radio>
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期:">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="baseInfo.birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="所在城市:">
          <el-input v-model="baseInfo.city"></el-input>
        </el-form-item>
        <el-form-item label="公司/学校:">
          <el-input v-model="baseInfo.organization"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button type="primary" size="small" @click="updatePersonalInfo">更新信息</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getUserBaseInfo, updateUserBaseInfo} from "@/base/api";

  export default {
    name: "baseInfo",
    data() {
      return {
        baseInfo: {},
        loading: false,
      }
    },
    mounted() {
      let uid = this.$store.state.userProfile.uid;
      console.log("mounted", this.$store.state.userProfile.uid);
      this.getUserInfo(uid);
    },
    computed: {
      avatar() {
        if (this.$store.state.userProfile.avatar) {
          return {
            fit: "fill",
            url: this.$store.state.userProfile.avatar,
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
      getUserInfo(uid) {
        this.loading = true;
        getUserBaseInfo(uid).then(res => {
          if(res.flag === 'T') {
            this.baseInfo = res.data;
          }
          this.loading = false;
        }).catch(e => {
          console.log("获取用户基本信息失败");
          console.log(e);
          this.loading = false;
        })
      },
      handleChangeAvatar() {
        this.$message.info("暂时无法修改头像 ^_^");
      },
      updatePersonalInfo() {
        console.log(this.baseInfo);
        this.loading = true;
        let that = this;
        updateUserBaseInfo(this.baseInfo).then(res => {
          if(res.flag === 'T') {
            that.$message.success("更新成功");
            that.$store.commit("updateBaseInfo", this.baseInfo);
          }
          that.loading = false;
        }).catch(e => {
          that.loading = false;
          console.log("更新用户基本信息失败");
          console.log(e);
        })
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