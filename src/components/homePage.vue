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
    <div class="home-body-container"></div>
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
    background-color: #edeeef;
    height: 500px;
    width: 100%;
  }
  
</style>