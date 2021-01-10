<template>
  <div class="header-container">
    <div class="header-logo-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="home">
        <home-scroll></home-scroll> 
      </el-tab-pane>
      <el-tab-pane label="OCR" name="ocr">OCR</el-tab-pane>
      <el-tab-pane label="PDF转换" name="pad">PDF转换</el-tab-pane>
    </el-tabs>
    </div>
    <div class="login-box"></div>
  </div>
</template>

<script>
import homeScroll from '../components/homeScroll.vue';

export default {
  name: "homeHeader",
  components: { homeScroll },
  data() {
    return {
      activeName: 'home'
    }
  }
  
}
</script>

<style scoped>
  /* .header-logo-box {
    width: 100%;
  } */
</style>