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
                <h3>{{ item.title }}</h3>
                <p>{{ item.info }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-show-container">
        <h2>功能演示</h2>
        <div class="show-container">
          <div style="margin: 15px 0 15px 0;">
            <el-row :gutter="10">
              <el-col :span="18">
                <el-input placeholder="请输入PDF URL查看效果" v-model="pdfFileUrl"></el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" icon="el-icon-full-screen" @click="handleCheckPdfUrl">检测</el-button>
              </el-col>
              <el-col :span="2">
                <el-upload
                    ref="upload"
                    :action="pdfApiUrl"
                    :data="{uid: userProfile.uid}"
                    :on-success="handlePdfUploadSuccess"
                    :on-error="handlePdfUploadError"
                    :before-upload="handlePdfBeforeUpload"
                    :on-change="handlePictureChange"
                    :limit="1"
                    list-type="picture"
                    :show-file-list="false"
                    :auto-upload="false"
                    :with-credentials="true">
                  <el-button slot="default" type="primary" icon="el-icon-upload">上传</el-button>
                </el-upload>
              </el-col>
            </el-row>
            <el-row>
              <p style="font-size: 13px;color: #8c8c8c;">
                <span>支持PDF文档的URL或者上传本地PDF文件。</span>
                <span style="color:indianred">请注意PDF文档大小不超过10M！</span>
              </p>
            </el-row>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div class="pdf-show-box"
                 style="width: 600px; height: 600px;border: 1.8px solid rgba(0,0,0,.65);border-radius: 3px;padding: 8px 0 0 0;">
              <div class="pdf-tools" style="border-bottom: 2px solid rgb(235, 235, 235);padding: 0 0 8px 8px;">
                <el-pagination
                    :page-size="1"
                    small
                    :pager-count="5"
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="totalPdfPage > 5 ? 5 : totalPdfPage">
                </el-pagination>
              </div>
              <div class="pdf-content" v-loading="pdfLoading"
                   element-loading-text="拼命加载中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   style="width: 100%; height: 562px;overflow:auto;background: #e6e6e6">
                <pdf ref="pdf"
                     :src="pdfUrl"
                     :page="currentPage"
                     @progress="loadedRatio = $event"
                     @num-pages="totalPdfPage=$event"
                     @page-loaded="pageLoaded($event)"
                     @loaded="loadPdfHandler"
                     @error="pdfError($event)">
                </pdf>
              </div>
            </div>
            <div class="pdf-result-box" style="width: 640px; height: 600px;padding: 0;position: relative;">
              <el-button type="primary" size="small" plain @click="handlePdfEditSave"
                         style="position: absolute; right: 20px; top: 10px; z-index: 5">修改保存</el-button>

              <el-button type="primary" size="small" plain @click="handleAmplifyPicture"
                         style="position: absolute; right: 120px; top: 10px; z-index: 5">放大查看</el-button>
              <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="识别结果" name="result">
                  <div style="width: 100%; height: 545px;background: #e6e6e6;overflow-y: auto; overflow-x: auto; position: relative;"
                       v-loading="pdfResultLoading">
                    <el-input v-for="(item, index) in pdfRecognitionSelected.data" :key="index"
                              :style="'display: inline-block; ' + 'position: absolute; ' +
                            'width: ' + getTextLength(item.text) + 'px;' +
                            'left:' + (item.text_box_position[0][0])*0.4 + 'px;' +
                            'top:' + (item.text_box_position[0][1])*0.4 + 'px;' "
                              size="mini"
                              v-model="item.text">
                    </el-input>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="文本列表" name="list">
                  <div class="pdf-result-content" v-loading="pdfResultLoading"
                       style="width: 100%; height: 545px;overflow:auto;background: #e6e6e6;">
                    <el-input type="text" size="small" style="display: block;"
                              v-for="(item, index) in pdfRecognitionSelected.data" :key="index"
                              v-model="item.text">
                    </el-input>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="JSON返回" name="json">
                  <div style="width: 100%; height: 545px;background: #e6e6e6;">
                    <vue-json-editor
                        v-model="pdfRecognitionSelected"
                        :showBtns="true"
                        :mode="'code'"
                        lang="zh"
                        @json-save="onJsonSave"
                    ></vue-json-editor>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <page-footer></page-footer>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="70%" :lock-scroll="false" title="识别结果（相对位置）" center>
      <div style="width: 100%; height: 600px;background: #e6e6e6;overflow-y: auto; overflow-x: auto; position: relative;"
           v-loading="pdfResultLoading">
        <el-input v-for="(item, index) in pdfRecognitionSelected.data" :key="index"
                  :style="'display: inline-block; ' + 'position: absolute; ' +
                            'width: ' + getTextLength(item.text) + 'px;' +
                            'left:' + (item.text_box_position[0][0])*0.4 + 'px;' +
                            'top:' + (item.text_box_position[0][1])*0.4 + 'px;' "
                  size="mini"
                  v-model="item.text">
        </el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  import {baseMixin} from "../base/baseMixin";
  import pageFooter from "../components/footer/pageFooter";
  import pdf from 'vue-pdf'
  import apiBaseUrl from "../base/baseUrl";
  import {recogniseUrlPdfFivePage, recogniseUrlPdfFivePageWithoutLogin} from "../base/api";
  import {checkUrlIsPdf} from "../utils/commonFunction";
  import vueJsonEditor from 'vue-json-editor'

  export default {
    name: "pdfOcr",
    components: {Icon, pageFooter, pdf, vueJsonEditor},
    mixins: [baseMixin],

    data() {
      return {
        activeName: "result",
        dialogVisible: false,
        pdfLoading: true,
        pdfResultLoading: true,
        currentPage: 1, // pdf 文件页码
        totalPdfPage: 0, // pdf 文件页码总数
        pageCount: 0, // pdf 文件总页数
        pdfUrl: '', //  pdf 显示文件地址
        pdfFileUrl: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf", // 用户输入的 pdf url
        localPdfUrl: "", // 本地上传 pdf 文件 url
        loadedRatio: 0, // 加载进度
        pdfApiUrl: apiBaseUrl + "/pdf/recognition/five-page", // 后端 pdf 访问接口
        pdfRecognitionResult: [], // 初始识别结果
        pdfRecognitionSelected: {}, // 选中页的识别结果
      }
    },

    mounted() {
      if (this.pdfFileUrl) {
        let changedPdfFileUrl = this.pdfFileUrl + "";
        if (changedPdfFileUrl.indexOf("http:") === 0) {
          changedPdfFileUrl = "https:" + changedPdfFileUrl.substring(5, changedPdfFileUrl.length)
        }
        console.log("this.changedPdfFileUrl", changedPdfFileUrl);
        // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
        this.pdfUrl = pdf.createLoadingTask(changedPdfFileUrl);
        // 调用接口
        recogniseUrlPdfFivePageWithoutLogin(this.pdfFileUrl).then(res => {
          this.pdfResultLoading = false;
          if (res.flag === 'T') {
            console.log("识别成功", res);
            // this.$message.success("识别成功");
            this.pdfRecognitionResult = res.data;
            this.pdfRecognitionSelected = this.pdfRecognitionResult[this.currentPage - 1];
            console.log("pdfRecognitionSelected", this.pdfRecognitionSelected)
          } else {
            console.log("识别失败", res);
            this.$message.warning(res.msg);
          }
        }).catch(err => {
          this.pdfResultLoading = false;
          console.log("识别失败", err);
        })
      }
    },

    computed: {

      loginSuccess() {
        return this.$store.state.loginSuccess;
      },

      userProfile() {
        return this.$store.state.userProfile;
      },

      getTextLength() {
        return function (val) {
          if(val === '' || val === null || val === undefined || val.length === 0) {
            return 40
          } else {
            return  String(val).length * 11 + 40
          }
        }
      }

    },

    methods: {
      // json 保存
      onJsonSave(value) {
        console.log('value:', value);
      },

      // pdf 初次加载完毕时
      loadPdfHandler() {
        // 加载的时候先加载第一页
        this.currentPage = 1;
        console.log("pdf 初始加载完毕 ");
        this.pdfLoading = false;
      },

      // 页面加载回调函数，其中 pageNum 为当前页数
      pageLoaded(pageNum) {
        this.pdfLoading = false;
        console.log("pageLoaded", pageNum);
        if (this.pdfRecognitionResult[pageNum - 1]) {
          this.pdfRecognitionSelected = this.pdfRecognitionResult[pageNum - 1];
        }
      },

      // 其他的一些回调函数。
      pdfError(error) {
        console.error(error)
      },

      // pdf 文件上传前的回调
      handlePdfBeforeUpload(file) {
        console.log("handlePdfBeforeUpload", file);
      },

      // pdf 变动时回调
      handlePictureChange(file, fileList) {
        console.log("handlePictureChange", file, fileList);
        if (!this.loginSuccess) {
          this.$message.warning("请先登录");
        } else {
          if (file.url && file.url !== this.localPdfUrl) {
            this.localPdfUrl = file.url;
            console.log("file.url", file.url);
            this.pdfUrl = pdf.createLoadingTask(file.url);
            const isLt10M = file.raw.size / 1024 / 1024 < 10;
            const isAllowedType = file.raw.type === 'application/pdf';
            if (isLt10M && isAllowedType) {
              console.log("pdf 文件校验通过")
              // 手动上传文件
              this.pdfResultLoading = true;
              this.$refs.upload.submit();
            } else {
              this.$message.warning('请PDF格式文件，大小不能超过 10MB')
            }
          } else {
            // do noting
          }
        }
      },

      // 文件上传成功
      handlePdfUploadSuccess(res) {
        this.pdfResultLoading = false;
        if (res.flag === 'T') {
          console.log("识别成功", res);
          this.$message.success("识别成功");
          this.pdfRecognitionResult = res.data;
          this.pdfRecognitionSelected = this.pdfRecognitionResult[this.currentPage - 1];
          console.log("pdfRecognitionSelected", this.pdfRecognitionSelected)
        } else {
          console.log("识别失败", res);
          this.$message.warning(res.msg);
        }
        this.$refs.upload.clearFiles();
      },

      // 文件上传失败
      handlePdfUploadError(err) {
        this.pdfResultLoading = false;
        this.localPdfUrl = "";
        console.log("识别失败", err);
        this.$refs.upload.clearFiles();
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      handleCurrentChange(val) {
        console.log("当前页:", val);
        if (val <= 5) {
          this.pdfRecognitionSelected = this.pdfRecognitionResult[val - 1];
        } else {
          this.$message.warning("最多查看前5页")
        }
      },

      handleCheckPdfUrl() {
        if (checkUrlIsPdf(this.pdfFileUrl)) {
          let changedPdfFileUrl = this.pdfFileUrl + "";
          if (changedPdfFileUrl.indexOf("http:") === 0) {
            changedPdfFileUrl = "https:" + changedPdfFileUrl.substring(5, changedPdfFileUrl.length)
          }
          console.log("this.changedPdfFileUrl", changedPdfFileUrl);
          // pdf 内容显示
          this.pdfLoading = true;
          this.pdfUrl = pdf.createLoadingTask(changedPdfFileUrl);
          // 调用后端识别接口
          this.pdfResultLoading = true;
          let requestBody = {
            uid: this.userProfile.uid,
            pdfUrl: this.pdfFileUrl
          };
          recogniseUrlPdfFivePage(requestBody).then(res => {
            this.pdfResultLoading = false;
            if (res.flag === 'T') {
              console.log("识别成功", res);
              this.$message.success("识别成功");
              this.pdfRecognitionResult = res.data;
              this.pdfRecognitionSelected = this.pdfRecognitionResult[this.currentPage - 1];
              console.log("pdfRecognitionSelected", this.pdfRecognitionSelected)
            } else {
              console.log("识别失败", res);
              this.$message.warning(res.msg);
            }
          }).catch(err => {
            this.pdfResultLoading = false;
            console.log("识别失败", err);
          })
        } else {
          this.$message.warning("PDF文件链接格式错误");
        }
      },

      handlePdfEditSave() {

      },

      handleAmplifyPicture() {
        this.dialogVisible = true;
      }

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
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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
    padding: 0 20px 20px 20px;
    border: 1px dashed #f68084;
    border-radius: 6px;
  }

  .show-container > h3 {
    height: 64px;
    line-height: 64px;
    text-align: center;
    margin: 0;
  }

  /deep/ .el-tabs__nav {
    position: unset;
  }
  /deep/ .el-tabs--border-card>.el-tabs__content {
    padding: 8px;
  }
  /deep/.el-input__inner:focus {
    border-color: #409eff;
    outline: 0;
    position: relative;
    z-index: 10;
  }
  /deep/ .jsoneditor-poweredBy {
    display: none;
  }

  /deep/ .jsoneditor-vue {
    height: 545px;
  }
</style>