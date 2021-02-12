<template>
  <div>
    <div class="ocr-banner">
      <div class="ocr-banner-content">
        <div class="ocr-banner-title">PDF识别</div>
        <div class="ocr-banner-info">针对多场景、多业务的PDF识别，基于深度学习技术，高精度识别PDF文件内容</div>
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
          <h3>上传图片</h3>
          <el-upload
              action="#"
              with-credentials
              :multiple="multiple"
              :file-list="fileList"
              :limit="limit"
              :on-exceed="handleExceed"
              list-type="picture-card"
              :on-change="handlePictureChange"
              :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2MB</div>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleFileOcr(file)">
                  <i class="el-icon-full-screen"></i>
                </span>
                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <h3>识别效果</h3>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 60%; border: 1px solid #ebebeb;border-radius: 3px;transition: .2s; padding: 8px 0px 8px 8px;">
              <div class="ocr-image-show" style=" height: 400px; overflow-y: auto; overflow-x: auto">
                <el-image :src="selectedImageSrc" style="display: block;" fit="container"></el-image>
              </div>
            </div>
            <div class="ocr-result-show" style=" width:35%;border: 1px solid #ebebeb;border-radius: 3px;padding: 8px 0px 8px 8px;">
              <div class="show-result" v-loading="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <span style="display: inline-block; width: 100%;" v-for="(item, index) in selectedOcrResult" :key="index">[{{index + 1}}] {{item.text}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  import { baseMixin }  from "../base/baseMixin";
  import {uploadSinglePicture} from "../base/api";
  import pageFooter from "../components/footer/pageFooter";
  // import testData from "../base/test.js";

  export default {
    name: "ocr",
    components: {Icon, pageFooter},
    mixins: [baseMixin],

    data() {
      return {
        proofImage: "",
        showLoading: false,
        multiple: false,
        dialogVisible: false,
        disabled: false,
        dialogImageUrl: '',
        limit: 5,
        fileList: [],
        ocrResultList: [],
        selectedImageSrc: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        selectedOcrResult: []
      }
    },

    methods: {

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

      handleRemove(file) {
        let that = this;
        this.fileList.forEach((item, index, arr) => {
          if(item.uid === file.uid) {
            arr.splice(index, 1);
            that.ocrResultList.splice(index, 1);
          }
        });
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      handleFileOcr(file) {
        this.selectedImageSrc = file.url;
        let that = this;
        this.fileList.forEach((item, index, arr) => {
          if(item.uid === file.uid) {
            console.log("item", item,  index, arr, that.ocrResultList);
            that.selectedOcrResult = that.ocrResultList[index];
          }
        });
      },

      handleExceed(files, fileList) {
        console.log(files.length, fileList.length);
        this.$message.warning(`文件个数超出限制，最多暂存 ${this.limit} 个文件`);
      },

      handlePictureChange(file, fileList) {
        console.log("handlePictureChange", file, fileList);
        this.fileList = fileList;
        this.selectedImageSrc = file.url;
        let that = this;
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isAllowedType = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg';
        if(isLt2M && isAllowedType) {
          this.transferImag2Base64(file.raw).then(res => {
            let base64 = res.split(",");
            console.log("base64 result ", base64);
            let requestBody = {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.raw.type,
              fileData: base64[1]
            };
            that.showLoading = true;
            that.imageUrl = res;
            uploadSinglePicture(requestBody).then(res => {
              if(res.flag === "T") {
                that.$message.success("上传成功");
                that.selectedOcrResult = res.data;
                that.ocrResultList.push(res.data);
              } else {
                that.fileList.forEach((item, index, arr) => {
                  if(item.uid === file.uid) {
                    arr.splice(index, 1);
                  }
                });
                that.$message.error(res.msg);
              }
              that.showLoading = false;
            }).catch(error => {
              that.fileList.forEach((item, index, arr) => {
                if(item.uid === file.uid) {
                  arr.splice(index, 1);
                }
              });
              that.showLoading = false;
              that.$message.error("上传失败，请重试");
              console.log(error);
            })
          }).catch(e => {
            that.fileList.forEach((item, index, arr) => {
              if(item.uid === file.uid) {
                arr.splice(index, 1);
              }
            });
            that.showLoading = false;
            that.$message.error("上传失败，请重试");
            console.log(e);
          })
        } else {
          that.fileList.forEach((item, index, arr) => {
            if(item.uid === file.uid) {
              arr.splice(index, 1);
            }
          });
          this.$message.error('请选择正确格式图片，大小不能超过 2MB')
        }
      },

    }
  }
</script>

<style scoped lang="less">

  .ocr-banner {
    box-sizing: border-box;
    position: relative;
    height: 450px;
    background: url("../assets/images/pdf-background.jpg") no-repeat 50% 50%;
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
    width: 1300px;
    margin: 0 auto;
  }

  .function-container > h2 {
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
    display: inline-block;
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
    width: 1300px;
    margin: 0 auto;
    min-height: 900px;
  }

  .demo-show-container > h2 {
    font-size: 28px;
    color: #333333;
    text-align: center;
    font-weight: bold;
    line-height: 1.5;
  }

  .show-container {
    width: 1260px;
    min-height: 600px;
    text-align: left;
    padding: 0px 20px 20px 20px;
    //display: flex;
    //flex-flow: nowrap;
    //justify-content: space-between;
    //align-items: center;

    border: 1px dashed #f68084;
    //padding: 0 20px 0px 20px;
    //border: 1px dashed #d9d9d9;
    //border-radius: 6px;
    border-radius: 6px;
  }

  .show-container > h3 {
    //font-weight: 400;
    //color: #1f2f3d;
    height: 64px;
    line-height: 64px;
    text-align: center;
    margin: 0;
  }

  .upload-file {
    text-align:center;
    align-items: center;
    display: flex;
  }

  /deep/ .el-upload-dragger {
    height: 400px;
    width: 580px;
    overflow-y: auto;
    overflow-x: auto;
  }

  .icon-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .show-result {
    height: 400px;
    overflow-y: auto;
  }

</style>