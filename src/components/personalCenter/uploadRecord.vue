<template>
  <div>
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
              <el-image
                  style="width: 220px;height: 220px;cursor: pointer;background-color: #e4e4e4;"
                  :src="file.url"
                  fit="contain"></el-image>
              <div class="upload-show-card-info">
                <span>{{file.fileName}}</span>
                <div>
                  <span>{{file.uploadTime}}</span>
                  <el-button icon="el-icon-delete" type="text" ></el-button>
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
  export default {
    name: "baseInfo",
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
          {url: "", fileName: "test2", uploadTime: "2021-02-20 12:30:59", star: false, },
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
    margin: 10px 20px 20px 30px;
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
    height: 400px;
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
  }
  .upload-show-card-image {
    width: 220px;
    height: 220px;
    cursor: pointer;
    background-color: #e4e4e4;
  }
</style>