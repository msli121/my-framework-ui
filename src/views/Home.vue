<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <home-scroll></home-scroll> 
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import homeScroll from '../components/homeScroll.vue'

export default {
  name: 'home',
  components: { homeScroll }
}
</script>

<style scoped>
  .el-header {
    height: 60px;
    background: #fff;
    /* position: fixed;
    top: 0;
    left: 0; */
    /* width: 100%; */
    z-index: 5;
    border-bottom: 1px solid #e6e6e6;
  }

  .el-main {
    padding-top: 0px;
    background-color: #fff;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>
