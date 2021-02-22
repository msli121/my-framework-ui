<template>
  <div style="height: 100%; overflow-y: hidden;">
    <div class="account-item-title">
      <i class="el-icon-user"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">上传记录</span>
    </div>
    <div class="account-item-body" >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="all">
          <span slot="label">全部 <span class="file-amount">({{allUploadFileAmount}})</span></span>
          <div class="upload-show-container">
            <el-card v-for="(file, index) in allUploadFileList" :key="index" class="upload-show-card-box" shadow="hover">
              <el-image class="upload-show-card-image"
                  :src="file.url"
                  fit="contain"></el-image>
              <div class="upload-show-card-info">
                <el-input class="file-name-input" maxlength="99"
                    size="mini"
                    placeholder="点击修改文件名"
                    suffix-icon="el-icon-edit"
                    v-model="file.fileName">
                </el-input>
                <div class="file-function-container">
                  <span>{{file.uploadTime.split(" ")[0]}}</span>
                  <div class="file-function-icon">
                    <a v-if="file.star" href="javascript:" @click="handleCancelStar(file)">
                      <icon name="star-fill" height="16" width="16" style="margin-right: 10px;cursor: pointer;"></icon>
                    </a>
                    <a v-else href='javascript:' @click="handleSetStar(file)">
                      <icon name="star" height="16" width="16" style="margin-right: 10px;cursor: pointer;"></icon>
                    </a>
                    <a href='javascript:' @click="handleDeleteFile(file)">
                      <icon name="trash" height="16" width="16" style="margin-right: 10px;cursor: pointer;"></icon>                    </a>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane name="ocr">
          <span slot="label">OCR <span class="file-amount">({{ocrUploadFileAmount}})</span></span>
          OCR
        </el-tab-pane>
        <el-tab-pane name="pdf">
          <span slot="label">PDF <span class="file-amount">({{pdfUploadFileAmount}})</span></span>
          PDF
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'

  export default {
    name: "baseInfo",
    components: {Icon},
    data() {
      return {
        personalInfoForm: {
          userName: "admin",
          gender: "male",
          birthday: "",
          city: "",
          organization: ""
        },
        activeName: 'all',
        allUploadFileAmount: 0,
        ocrUploadFileAmount: 0,
        pdfUploadFileAmount: 0,
        currentDate: new Date(),
        allUploadFileList: [
          {url: "", fileName: "test1", uploadTime: "2021-02-20 12:30:59", star: false, },
          {url: "", fileName: "test2", uploadTime: "2021-02-20 12:30:59", star: true, },
          {url: "", fileName: "test3", uploadTime: "2021-02-20 12:30:59", star: false, },
          {url: "", fileName: "test1", uploadTime: "2021-02-20 12:30:59", star: false, },
          {url: "", fileName: "test1", uploadTime: "2021-02-20 12:30:59", star: false, },
          {url: "", fileName: "test1", uploadTime: "2021-02-20 12:30:59", star: false, },
        ]
      }
    },
    methods: {
      updatePersonalInfo() {

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCancelStar(file) {
        file.star = false;
        console.log("handleCancelStar", file);
      },
      handleSetStar(file) {
        file.star = true;
        console.log("handleSetStar", file);
      },
      handleDeleteFile(file) {
        this.$message.error("无法删除");
        console.log("handleDeleteFile", file);
      }
    }
  }
</script>

<style scoped lang="less">
  .account-item-title {
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #e2e9ed;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    background: #eef2f4;
    padding: 12px 28px;
    min-height: 46px;
    color: rgb(0, 205, 172);
  }
  .account-item-title-content {
    display: inline-block;
    font-size: 16px;
    cursor: default;
  }
  .account-item-body {
    margin: 10px 0 20px 30px;
    text-align: left;
  }
  /deep/ .el-tabs__nav {
     left: 0;
  }
  /deep/ .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: bold;
    color: #303133;
    position: relative;
  }
  .file-amount {
    font-size: 12px;
    font-weight: 500;
  }
  .upload-show-container {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    display: flex;
    flex-flow: row wrap;
  }
  .upload-show-card-box {
    width: 220px;
    height: 290px;
    margin-top: 20px;
    margin-right: 40px;
  }
  /deep/.el-card.is-hover-shadow:hover {
    box-shadow: 0 4px 12px 5px rgb(193 201 213 / 50%);
  }
  /deep/.el-card__body {
    padding: 0;
    height: 100%;
  }

  .upload-show-card-image {
    width: 220px;
    height: 220px;
    cursor: pointer;
    background-color: #e4e4e4;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .upload-show-card-info {
    padding-left: 10px;
    padding-right: 10px;
    /*display: flex;*/
    /*justify-content: flex-start;*/
  }
  .file-name-input {
    color: #666666;
    font-size: 14px;
  }
  .file-function-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .file-function-container span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    color: #CCCCCC;
    font-size: 14px;
    margin-left: 5px;
  }
  .file-function-icon {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>