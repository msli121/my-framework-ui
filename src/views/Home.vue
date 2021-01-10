<template>
  <div>
    <div class="header-container">
      <div class="header-logo-box"></div>
      <div class="header-main-box ">
        <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="首页" name="home">
          <home-scroll></home-scroll>
          <home-body></home-body>
          <!-- <home-footer></home-footer> -->
        </el-tab-pane>
        <el-tab-pane label="OCR" name="ocr">OCR</el-tab-pane>
        <el-tab-pane label="PDF转换" name="pad">PDF转换</el-tab-pane>
      </el-tabs>
      </div>
      <div class="login-box"></div>
    </div>
  </div>
</template>

<script>
import homeScroll from '../components/home/homeScroll.vue';
import homeBody from "../components/home/homeBody.vue";

export default {
  name: 'home',
  components: { homeScroll, homeBody },
  data() {
    return {
      activeName: "home"
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<style lang="less" scoped>
  .header-container {
    height: 60px;
    width: 100%;
    background: #fff;
  }

  .header-logo-box {
    position: absolute;
    height: 60px;
    left: 20px;
    top: 0px;
    width: 40px;
    border: 1px solid red;
  }

  .header-main-box {
    width: 100%;
    /* margin:0 auto; */
  }

  .login-box {
    position: absolute;
    height: 60px;
    right: 20px;
    top: 0px;
    width: 40px;
    border: 1px solid red;
  }

  /deep/ .el-tabs__header {
    margin: 0 0 1px 0
  }

  /deep/.el-tabs__nav {
    left: 45%;
  }

  /deep/ .el-tabs__active-bar {
    height: 4px;
  }

  /deep/ .el-tabs__item {
    height: 50px;
    font-size: 16px;
    line-height: 45px;
  }
</style>
