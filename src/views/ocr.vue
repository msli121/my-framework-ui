<template>
  <div>
    <div class="ocr-banner">
      <div class="ocr-banner-content">
        <div class="ocr-banner-title">通用OCR识别</div>
        <div class="ocr-banner-info">针对多场景、多业务的通用ocr识别，基于深度学习技术，支持图片文字识别、pdf内容识别、发票内容识别等常见需求，还可返回文字的位置信息、字符内容等</div>
      </div>
    </div>
    <div class="body-container">
      <div class="function-list-bg">
        <div class="function-container">
          <h2>功能介绍</h2>
          <div class="function-list-body">
            <div class="function-item-container" v-for="(item, index) in ocrFunctionList" :key="index">
              <icon :name="item.icon" height="64" width="64"></icon>
              <div class="function-item-content">
                <h3>{{item.title}}</h3>
                <p>{{item.info}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-show-container">
        <h2>功能演示</h2>
        <div class="show-container">
<!--          <h3>上传图片</h3>-->
          <div class="upload-file">
            <el-upload
                drag
                :limit="2"
                accept="image/jpg,image/png,image/jpeg"
                action=""
                :auto-upload="false"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-change="fileChange">
              <el-image v-if="imageUrl" style="width: 100%; height: 100%"
                  :src="imageUrl" fit="scaleDown"></el-image>
<!--              <img v-if="imageUrl" :src="imageUrl" class="image-container"/>-->
              <div v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过2MB</div>
              </div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  import baseMixin  from "../base/baseMixin";
export default {
  name: "ocr",
  components: {Icon},
  mixins: [baseMixin],
  data() {
    return {
      imageUrl: '',
      proofImage: ""
    }
  },
  methods: {
    fileChange(file, fileList) {
      let that = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(fileList.length >= 2) {
        this.$message.error("只能上传一张图片")
        return
      }
      if(isLt2M) {
        this.transferImag2Base64(file.raw).then(res => {
          console.log("base64 result ", res);
          that.imageUrl = res;
        }).catch(e => {
          this.$message.error("上传失败，请重试");
          console.log(e);
        })
      } else {
        this.$message.error('图片大小不能超过 2MB!')
      }
    },

    transferImag2Base64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() { // 图片转base64完成后返回reader对象
          resolve(reader.result)
        }
        reader.onerror = reject
      })
    },

    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList.length, fileList);
    },
  }
}
</script>

<style scoped lang="less">
  .ocr-banner {
    box-sizing: border-box;
    position: relative;
    height: 450px;
    background: url("https://ai.bdstatic.com/file/A319A3C404CD46C09DA38D9D42FD627C") no-repeat 50% 50%;
    background-size: cover;
    overflow: hidden;
  }
  .ocr-banner-content {
    overflow: hidden;
    text-align: left;
    width: 730px;
    padding-right: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 1;
  }
  .ocr-banner-title {
    height: 67px;
    font-size: 48px;
    letter-spacing: 2px;
    color: #fff;
    position: relative;
  }
  .ocr-banner-info {
    margin: 20px 110px 0 0;
    font-size: 16px;
    line-height: 26px;
    color: #fff;
    /*color: #faad15;*/
  }
  .body-container {
    background-color: #ffff;
    width: 100%;
  }
  .function-list-bg {
    background-image: url("../assets/images/production-list-bg.jpg");
    background-size: 100%;
    background-color: #edeeef;
    /*height: 540px;*/
    padding: 30px 0 60px 0;
  }
  .function-container {
    width: 1200px;
    margin: 0 auto;
  }
   h2 {
    font-size: 28px;
    color: #333333;
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
  }
  .function-list-body {
    max-width: 100%;
    display: flex;
    margin: 60px auto 0;
    justify-content: space-between;
  }
  .function-item-container {
    display: flex;
    justify-content: left;
  }
  .function-item-content {
    text-align: left;
    margin-right: 10px;
  }
  .function-item-content > h3 {
    height: 64px;
    line-height: 64px;
    margin: 0;
  }
  .function-item-content > p {
    margin: 0;
    height: 42px;
    font-size: 14px;
    color: #666666;
    line-height: 1.5;
  }
  .demo-show-container {
    width: 1200px;
    margin: 0 auto;
    height: 800px;
  }
  .show-container {
    width: 100%;
    height: 500px;
    display: flex;
    flex-flow: nowrap;
    justify-content: left;
    align-items: center;
    border: 1px dashed #f68084;
    border-radius: 6px;
  }
  .upload-file {
    width: 400px;
    height: 300px;
    text-align:center;
    align-items: center;
    display: flex;
    margin-left: 20px;
  }

</style>