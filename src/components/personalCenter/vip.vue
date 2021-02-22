<template>
  <div>
    <div class="account-item-title">
      <i class="el-icon-user"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">VIP</span>
    </div>
    <div>
      <div>
        <icon name="no-data" height="128" width="128"></icon>
        <p style="color: #AAA;">您还未开通任何VIP</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  export default {
    name: "baseInfo",
    components: {Icon},
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
</style>