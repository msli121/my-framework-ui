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
                <el-button type="primary" icon="el-icon-full-screen">检测</el-button>
              </el-col>
              <el-col :span="2">
                <el-upload
                    ref="upload"
                    :action="pdfApiUrl"
                    :data="{uid: userProfile.uid}"
                    :before-upload="handlePdfBeforeUpload"
                    :on-success="handlePdfUploadSuccess"
                    :on-error="handlePdfUploadError"
                    :limit="1"
                    :show-file-list="false"
                    :auto-upload="true"
                    :with-credentials="true"
                >
                  <el-button type="primary" icon="el-icon-upload">上传</el-button>
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
            <div class="pdf-result-box"
                 style="width: 600px; height: 600px;border: 1px solid #dedede;border-radius: 3px;padding: 8px 0 0;">
              <div class="pdf-result-tools" style="border-bottom: 2px solid rgb(235, 235, 235);padding: 0px 0px 8px 8px;">
                <el-radio-group v-model="activeName" size="mini">
                  <el-radio-button label="识别结果"></el-radio-button>
                  <el-radio-button label="JSON返回"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="pdf-result-content" v-loading="pdfResultLoading"
                   style="width: 100%; height: 560px;overflow:auto;background: #e6e6e6;">
                <div>
                   <el-input type="text" size="small" style="display: block;" v-for="(item, index) in pdfRecognitionSelected.data" :key="index" v-model="item.text"></el-input>
                </div>
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
import {baseMixin} from "../base/baseMixin";
import pageFooter from "../components/footer/pageFooter";
import pdf from 'vue-pdf'
import apiBaseUrl from "../base/baseUrl";
// import testData from "../base/test.js";

export default {
  name: "pdfOcr",
  components: {Icon, pageFooter, pdf},
  mixins: [baseMixin],

  data() {
    return {
      activeName: "识别结果",
      showLoading: false,
      multiple: false,
      dialogVisible: false,
      disabled: false,
      dialogImageUrl: '',
      limit: 5,
      fileList: [],
      ocrResultList: [],
      selectedImageSrc: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
      pdfLoading: true,
      pdfResultLoading: false,
      currentPage: 1, // pdf 文件页码
      totalPdfPage: 0, // pdf 文件页码总数
      pageCount: 0, // pdf 文件总页数
      pdfUrl: '', // pdf文件地址
      pdfFileUrl: "", // 用户输入的 pdf url
      loadedRatio: 0, // 加载进度
      pdfApiUrl: "", // 后端 pdf 访问接口
      pdfRecognitionResult: [], // 初始识别结果
      pdfRecognitionSelected: {
        data: [],
      }, // 选中页的识别结果
    }
  },

  created() {
    // 设置 pdf api url
    this.pdfApiUrl = apiBaseUrl + "/pdf/pdf-upload";

    let url = "https://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf";
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    this.pdfUrl = pdf.createLoadingTask(url);
    // pdfUrl.promise.then(pdf => {
    //   this.totalPdfPage = pdf.numPages;
    //   this.pdfUrl = pdfUrl
    // })
  },


  watch: {
    pdfUrl: function (loadingTask) {
      // let loadingTask = pdf.createLoadingTask(val);
      // let totalPdfPage = 0;
      let that = this;
      loadingTask.promise.then(pdf => {
        that.totalPdfPage = pdf.numPages;
        console.log("watch totalPdfPage", that.totalPdfPage);
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

  },

  methods: {

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
      if(this.pdfRecognitionResult[pageNum - 1]) {
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
      if(!this.loginSuccess) {
        this.$message.warning("请先登录");
        return false;
      }
      else {
        this.pdfUrl = pdf.createLoadingTask(file.url);
        const isLt10M = file.size / 1024 / 1024 < 10;
        const isAllowedType = file.type === 'application/pdf';
        if(isLt10M && isAllowedType) {
          console.log("pdf 文件校验通过")
          return true;
        } else {
          this.$message.warning('请PDF格式文件，大小不能超过 10MB')
          return false;
        }
      }
    },

    handlePdfUploadSuccess(res) {
      if(res.flag === 'T') {
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

    handlePdfUploadError(err) {
      console.log("识别失败", err);
      this.$refs.upload.clearFiles();
    },

    handleClick(tab, event) {
      console.log(tab, event);
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

</style>