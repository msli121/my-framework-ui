<template>
	<el-carousel indicator-position="outside">
    <el-carousel-item v-for="image in images" :key="image.url">
      <el-image
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
        {fitType: 'fill', url: '/images/ocr1.jpg'},
        {fitType: 'contain', url: '/images/ocr2.jpg'},
        {fitType: 'cover', url: '/images/ocr3.jpg'},
        {fitType: 'none', url: '/images/ocr4.jpg'},
      ]
    }
  }
}
</script>

<style scoped>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 150px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>
