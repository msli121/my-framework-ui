<template>
	<el-carousel height="400px">
    <el-carousel-item v-for="image in images" :key="image.url">
      <el-image style="height: 400px"
      :src="image.url"
      :fit="image.fitType"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name: "homeScroll",
  data() {
    return {
      images: [
        {fitType: 'none', url: '/images/ocr1.jpg'},
        {fitType: 'none', url: '/images/ocr2.jpg'},
        {fitType: 'none', url: '/images/ocr3.jpg'},
        {fitType: 'none', url: '/images/ocr4.jpg'},
      ]
    }
  }
}
</script>

<style scoped>

	.el-carousel__item:nth-child(2n) {
		background-color: #fff;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #fff;
	}
</style>
