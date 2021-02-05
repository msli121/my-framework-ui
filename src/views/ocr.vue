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
          <h3>上传图片</h3>
          <el-upload style="margin-left: 20px;"
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
<!--          <div class="upload-file">-->
<!--            <el-upload-->
<!--                drag-->
<!--                :limit="2"-->
<!--                accept="image/jpg,image/png,image/jpeg"-->
<!--                action=""-->
<!--                :auto-upload="false"-->
<!--                :show-file-list="true"-->
<!--                :on-remove="handleRemove"-->
<!--                :on-change="fileChange">-->
<!--              <el-image v-if="imageUrl" style="display: block; width: 100%; height: 100%"-->
<!--                  :src="imageUrl" fit="none"></el-image>-->
<!--              <div v-else class="icon-container">-->
<!--                <i class="el-icon-upload"></i>-->
<!--                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--                <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过2MB</div>-->
<!--              </div>-->
<!--            </el-upload>-->
<!--          </div>-->

<!--          <div class="show-result"  v-loading="showLoading"-->
<!--               element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  import { baseMixin }  from "../base/baseMixin";
  import {uploadSinglePicture} from "../base/api";
export default {
  name: "ocr",
  components: {Icon},
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
      fileList: []
    }
  },
  methods: {
    fileChange(file, fileList) {
      console.log("fileChange", file);
      let that = this;
      if(fileList.length >= 2) {
        // 数组清空
        fileList.splice(0, fileList.length);
        console.log("数组已经清空");
        fileList.push(file);
        console.log("已经添加file", file);
      }
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
          uploadSinglePicture(requestBody).then(data => {
            if(data.flag === "T") {
              console.log("上传成功！！！！", data);
            } else {
              that.$message.error(data.msg);
            }
            that.showLoading = false;
          }).catch( error => {
            // 数组清空
            fileList.splice(0, fileList.length);
            // 图片清空
            that.imageUrl = "";
            that.showLoading = false;
            that.$message.error("上传失败，请重试");
            console.log(error);
          })
        }).catch(e => {
          // 数组清空
          fileList.splice(0, fileList.length);
          // 图片清空
          that.imageUrl = "";
          that.showLoading = false;
          this.$message.error("上传失败，请重试");
          console.log(e);
        })
      } else {
        // 数组清空
        fileList.splice(0, fileList.length);
        // 图片清空
        that.imageUrl = "";
        this.$message.error('请选择正确格式图片，大小不能超过 2MB')
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

    // handleRemove(file, fileList) {
    //   // 数组清空
    //   fileList.splice(0, fileList.length);
    //   // 图片清空
    //   this.imageUrl = "";
    // },

    handleRemove(file) {
      this.fileList.forEach((item, index, arr) => {
        if(item.uid === file.uid) {
          arr.splice(index, 1);
        }
      });
      console.log("handleRemove", file, this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("handlePictureCardPreview", file, this.fileList);
    },
    handleFileOcr(file) {
      console.log("handleFileOcr", file, this.fileList);
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      console.log(files.length, fileList.length);
      this.$message.warning(`文件个数超出限制，最多暂存 ${this.limit} 个文件`);
    },
    handlePictureChange(file, fileList) {
      console.log("handlePictureChange", file, fileList);
      this.fileList = fileList;
      // let that = this;
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // const isAllowedType = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg';
      // if(isLt2M && isAllowedType) {
      //   this.transferImag2Base64(file.raw).then(res => {
      //     let base64 = res.split(",");
      //     console.log("base64 result ", base64);
      //     let requestBody = {
      //       fileName: file.name,
      //       fileSize: file.size,
      //       fileType: file.raw.type,
      //       fileData: base64[1]
      //     };
      //     that.showLoading = true;
      //     that.imageUrl = res;
      //     uploadSinglePicture(requestBody).then(data => {
      //       if(data.flag === "T") {
      //         console.log("上传成功！！！！", data);
      //       } else {
      //         that.$message.error(data.msg);
      //       }
      //       that.showLoading = false;
      //     }).catch( error => {
      //       that.fileList.forEach((item, index, arr) => {
      //         if(item.uid === file.uid) {
      //           arr.splice(index, 1);
      //         }
      //       });
      //       that.showLoading = false;
      //       that.$message.error("上传失败，请重试");
      //       console.log(error);
      //     })
      //   }).catch(e => {
      //     that.fileList.forEach((item, index, arr) => {
      //       if(item.uid === file.uid) {
      //         arr.splice(index, 1);
      //       }
      //     });
      //     that.showLoading = false;
      //     that.$message.error("上传失败，请重试");
      //     console.log(e);
      //   })
      // } else {
      //   that.fileList.forEach((item, index, arr) => {
      //     if(item.uid === file.uid) {
      //       arr.splice(index, 1);
      //     }
      //   });
      //   this.$message.error('请选择正确格式图片，大小不能超过 2MB')
      // }
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
    min-height: 700px;
  }

  .show-container {
    width: 100%;
    min-height: 600px;
    text-align: left;
    //display: flex;
    //flex-flow: nowrap;
    //justify-content: space-between;
    //align-items: center;

    //border: 1px dashed #f68084;
    //padding: 0 20px 0px 20px;
    border: 1px dashed #d9d9d9;
    //border-radius: 6px;
    border-radius: 6px;
  }

  .show-container > h3 {
    font-weight: 400;
    color: #1f2f3d;
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
    width: 580px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    overflow: auto;
  }

</style>