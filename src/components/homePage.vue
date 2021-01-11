<template>
  <div>
    <el-carousel height="400px" :interval="300000">
      <el-carousel-item v-for="image in images" :key="image.url">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      images: [
        { fitType: "none", url: "/images/ocr1.jpg" },
        { fitType: "none", url: "/images/ocr2.jpg" },
        { fitType: "none", url: "/images/ocr3.jpg" },
        { fitType: "none", url: "/images/ocr4.jpg" },
      ],
    };
  },
  methods: {},
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
    height: 600px;
    width: 100%;
  }
  
  .production-list-bg {
    background-image: url(/images/production-list-bg.jpg);
    background-size: 100%;
    background-color: #edeeef;
    height: 400px;
    padding-top: 30px;
  }
  .production-list-bg.production-main {
    width: 1200px;
    margin: 0 auto;
  }
  .production-main>h2 {
    font-size: 28px;
    color: #333333;
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
}
</style>