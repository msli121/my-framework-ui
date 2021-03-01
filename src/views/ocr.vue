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
          <el-upload
            action="#"
            with-credentials
            :multiple="multiple"
            :file-list="fileList"
            :limit="limit"
            :on-exceed="handleExceed"
            list-type="picture-card"
            :before-upload="handlePictureBeforeUpload"
            :on-change="handlePictureChange"
            :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip" style="font-weight: bold;">支持上传 jpg/jpeg/png 文件，大小不超过 6MB</div>
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
          <h3>原图预览</h3>
          <div style="display: flex; justify-content: center">
            <div style="width: 80%; border: 1px dashed #f68084;border-radius: 3px;transition: .2s; padding: 8px 0px 8px 8px;">
              <div style=" height: 400px; overflow-y: auto; overflow-x: auto">
                <el-image :src="selectedImageSrc" style="display: block;" fit="container"></el-image>
              </div>
            </div>
          </div>
          <h3>识别效果</h3>
          <div style="display: flex; justify-content: flex-end; width: 90%;">
            <el-form label-width="90px">
                <el-form-item label="识别可信度">
                  <el-col :span="22">
                    <el-select size="small" v-model="confidence" @change="handleConfidenceChange" placeholder="请选择可信度">
                      <el-option label="可信度100%以下" value="1.0"></el-option>
                      <el-option label="可信度99%以下" value="0.99"></el-option>
                      <el-option label="可信度94%以下" value="0.96"></el-option>
                      <el-option label="可信度90%以下" value="0.9"></el-option>
                      <el-option label="可信度80%以下" value="0.8"></el-option>
                      <el-option label="可信度70%以下" value="0.7"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
            </el-form>
          </div>
          <div style="display: flex; justify-content: center;">
            <div style="width: 80%;  border: 1px dashed #f68084;border-radius: 3px;transition: .2s; padding: 8px 0px 8px 8px;">
              <div style=" height: 400px; overflow-y: auto; overflow-x: auto; position: relative;"
                   v-loading="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-input v-for="(item, index) in selectedOcrResult.recognitionContent" :key="index"
                    :class="{'confidence-low': item.confidence < confidence }"
                    :style="'display: inline-block; ' + 'position: absolute; ' +
                            'width: ' + (item.text_region[1][0] - item.text_region[0][0] + 40) + 'px;' +
                            'left:' + (item.text_region[0][0]) + 'px;' +
                            'top:' + (item.text_region[0][1]) + 'px;' "
                    size="mini"
                    v-model="item.text">
                </el-input>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; width: 90%; margin-top: 20px;">
            <el-button type="text"
                       style="margin-right: 20px;"
                       @click="handleCopyOcrResult">复制识别文本</el-button>
            <el-button type="success" @click="handleEditSave">修改保存</el-button>
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
  import {editAndSaveOcrResult, uploadSinglePicture} from "../base/api";
  import pageFooter from "../components/footer/pageFooter";
  import testData from "../base/test.js";

export default {
  name: "ocr",
  components: {Icon, pageFooter},
  mixins: [baseMixin],

  data() {
    return {
      confidence: 0.99,
      proofImage: "",
      showLoading: false,
      multiple: false,
      dialogVisible: false,
      disabled: false,
      login: false,
      dialogImageUrl: '',
      limit: 5,
      fileList: [],
      ocrResultList: [],
      // selectedImageSrc: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      selectedImageSrc: require("../assets/data/fapiao_demo.png"),
      selectedOcrResult: testData,
    }
  },
  computed: {

    loginSuccess() {
      return this.$store.state.loginSuccess;
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

    handleConfidenceChange(value) {
      console.log("value: ", value, this.confidence);
    },

    handlePictureBeforeUpload(file) {
      console.log("handlePictureBeforeUpload", file)
    },

    handlePictureChange(file, fileList) {
      console.log("handlePictureChange", file);
      if(!this.loginSuccess) {
        this.$message.warning("请先登录");
        fileList.forEach((item, index, arr) => {
          if(item.uid === file.uid) {
            arr.splice(index, 1);
          }
        });
      } else {
        this.fileList = fileList;
        this.selectedImageSrc = file.url;
        let that = this;
        console.log("handlePictureChange", file, fileList);
        const isLt6M = file.size / 1024 / 1024 < 6;
        // const isAllowedType = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg';
        const isAllowedType = true;
        if(isLt6M && isAllowedType) {
          this.transferImag2Base64(file.raw).then(res => {
            console.log("base64 result ", res);
            let requestBody = {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.raw.type,
              fileContent: res,
              sourceGroup: 'ocr',
              uid: this.$store.state.userProfile.uid
            };
            that.showLoading = true;
            uploadSinglePicture(requestBody).then(res => {
              console.log("res",res);
              if(res.flag === "T") {
                that.$message.success("上传成功");
                that.selectedOcrResult = res.data;
                that.selectedOcrResult.recognitionContent = JSON.parse(res.data.recognitionContent);
                that.ocrResultList.push(that.selectedOcrResult);
                console.log("that.ocrResultList", that.ocrResultList);
                console.log("that.selectedOcrResult", that.selectedOcrResult);
              } else {
                that.$message.error(res.msg);
                that.fileList.forEach((item, index, arr) => {
                  if(item.uid === file.uid) {
                    arr.splice(index, 1);
                  }
                });
              }
              that.showLoading = false;
            }).catch(error => {
              that.showLoading = false;
              console.log("上传失败，请重试");
              that.fileList.forEach((item, index, arr) => {
                if(item.uid === file.uid) {
                  arr.splice(index, 1);
                }
              });
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
          this.$message.error('请选择正确格式图片，大小不能超过 6MB')
        }
      }
    },

    handleCopyOcrResult() {
      if(!this.loginSuccess) {
        this.$message.error("请先登录")
      } else {
        let that = this;
        let copyText = "";
        let recognitionContent = this.selectedOcrResult.recognitionContent;
        for(let i=1; i <= recognitionContent.length; i++) {
          copyText = copyText + "[" + i + "]" + recognitionContent[i-1].text + "\n";
        }
        this.$copyText(copyText).then(
            function (e) {
              console.log("copyText", copyText, e);
              that.$message.success("复制成功");
            },
            function (e) {
              console.log("copyText", copyText, e);
              that.$message.success("复制失败");
            }
        );
      }
    },

    handleEditSave() {
      if(!this.loginSuccess) {
        this.$message.error("请先登录");
      } else if(this.selectedOcrResult.id === 0) {
        this.$message.warning("示例图片无法保存，请上传图片");
      } else {
        let that = this;
        that.showLoading = true;
        editAndSaveOcrResult(this.selectedOcrResult).then(res => {
          if(res.flag === 'T') {
            this.$message.success("保存成功");
          } else {
            this.$message.error(res.msg);
          }
          that.showLoading = false;
        }).catch(e => {
          that.showLoading = false;
          console.log(e);
        })
      }
    },

    onCopySuccess() {
      this.$message.success('复制成功');
    },

    onCopyError() {
      this.$message.error('复制失败');
    },

  }
}
</script>

<style scoped lang="less">
  /deep/ .el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
  }
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
    margin-bottom: 40px;
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

  .confidence-low {
    border: 1px solid red;
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
    text-align: center;
    padding: 0px 20px 20px 20px;
    border: 1px solid #ebebeb;
    border-radius: 6px;
  }

  .show-container > h3 {
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
  /deep/.el-input__inner:focus {
    border-color: #409eff;
    outline: 0;
    position: relative;
    z-index: 10;
  }

</style>