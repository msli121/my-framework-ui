<template>
  <div>
    <el-carousel height="400px" :interval="3000">
      <el-carousel-item v-for="(image, index) in homeBgImages" :key="index">
        <el-image
            style="height: 400px"
            :src="image.url"
            :fit="image.fitType"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="home-body-container">
      <div class="production-list-bg">
        <div class="production-main">
          <h2>产品列表</h2>
          <div class="production-list-body">
            <div
                class="production-item-container"
                v-for="production in homeProductionList"
                :key="production.url">
              <el-image
                  style="width: 380px; height: 230px"
                  :src="production.url"
                  :fit="production.fitType">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i></div>
              </el-image>

              <div class="production-info">
                <div class="production-info-title">{{ production.title }}</div>
                <div class="production-info-des">{{ production.description }}</div>
                <div class="production-info-link">
                  <a @click="handleProductionClick(production)">了解详情</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>

  import {baseMixin} from "../base/baseMixin";
  import pageFooter from "./footer/pageFooter"

  export default {
    name: "homePage",
    mixins: [baseMixin],
    components: {pageFooter},
    data: function () {
      return {}
    },
    mounted() {
      console.log("homePageMounted");
      console.log("homePage", this.homeBgImages, this.homeProductionList)
    },
    methods: {
      handleProductionClick(production) {
        this.$router.push({path: production.pathOrUrl})
      }
    },
  };
</script>

<style lang="less" scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #fff;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #fff;
  }

  .home-body-container {
    background-color: #ffff;
    width: 100%;
  }

  .production-list-bg {
    background-image: url("../assets/images/production-list-bg.jpg");
    background-size: 100%;
    background-color: #edeeef;
    height: 540px;
    padding-top: 30px;
  }

  .production-list-bg .production-main {
    width: 1200px;
    margin: 0 auto;
  }

  .production-main > h2 {
    font-size: 28px;
    color: #333333;
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
  }

  .production-list-body {
    max-width: 100%;
    display: flex;
    margin: 60px auto 0;
    justify-content: space-between;
  }

  .production-item-container {
    width: 380px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #E6E6FA;
    border-top: 0;
  }

  .production-info {
    border-top: 0;
    padding: 20px 48px 22px;
    color: #000;
    letter-spacing: 0;
  }

  .production-info-title {
    font-size: 22px;
    height: 38px;
    line-height: 38px;
    display: flex;
  }

  .production-info-des {
    line-height: 24px;
    margin-top: 10px;
    overflow: hidden;
    font-size: 14px;
    color: #999;
  }

  .production-info-link {
    margin-top: 10px;
    padding-bottom: 8px;
    text-align: left;
  }

  .production-info-link a {
    margin-left: 5px;
    text-decoration: underline;
    color: #036fe2;
    cursor: pointer;
    font-size: 14px;
  }
</style>