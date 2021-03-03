<template>
  <div style="height: 100%; overflow-y: hidden;">
    <el-dialog title="文件详情" :visible.sync="uploadFileShowFlag" width="70%">
      <upload-file-show :file="selectedFile"></upload-file-show>
    </el-dialog>
    <div class="account-item-title">
      <i class="el-icon-upload"></i>
      <span style="display: inline-block; width: 20px;"></span>
      <span class="account-item-title-content">上传记录</span>
    </div>
    <div class="account-item-body" v-loading="loading">
      <div style="position: absolute; right: 40px; z-index: 5">
        <el-upload
            ref="upload"
            :action="fileUploadApiUrl"
            multiple
            :data="{uid: userProfile.uid}"
            :show-file-list="false"
            :limit="limit"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="all">
          <span slot="label">全部 <span class="file-amount">({{allUploadFileList.length}})</span></span>
          <div v-if="allUploadFileList.length === 0" style="text-align: center;">
            <icon name="no-data" height="128" width="128" style="text-align: center"></icon>
            <p style="color: #AAA; font-size: 15px;text-align: center" >空空...</p>
          </div>
          <div v-else class="upload-show-container">
            <el-card v-for="(file, index) in allUploadFileList" :key="index" class="upload-show-card-box" shadow="hover">
              <el-image class="upload-show-card-image" @click="showUploadFileDetail(file)"
                  :src="file.fileContent"
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
          <span slot="label">图片 <span class="file-amount">({{ocrUploadFileList.length}})</span></span>
          <div v-if="ocrUploadFileList.length === 0" style="text-align: center;">
            <icon name="no-data" height="128" width="128" style="text-align: center"></icon>
            <p style="color: #AAA; font-size: 15px;text-align: center" >空空...</p>
          </div>
          <div v-else class="upload-show-container">
            <el-card v-for="(file, index) in ocrUploadFileList" :key="index" class="upload-show-card-box" shadow="hover">
              <el-image class="upload-show-card-image" @click="showUploadFileDetail(file)"
                        :src="file.fileContent"
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
        <el-tab-pane name="pdf">
          <span slot="label">PDF <span class="file-amount">({{pdfUploadFileList.length}})</span></span>
          <div v-if="pdfUploadFileList.length === 0" style="text-align: center;">
            <icon name="no-data" height="128" width="128" style="text-align: center"></icon>
            <p style="color: #AAA; font-size: 15px;text-align: center" >空空...</p>
          </div>
          <div v-else class="upload-show-container">
            <el-card v-for="(file, index) in pdfUploadFileList" :key="index" class="upload-show-card-box" shadow="hover">
                <el-image class="upload-show-card-image" @click="showUploadFileDetail(file)"
                          :src="file.fileContent"
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
        <el-tab-pane name="others">
          <span slot="label">其他 <span class="file-amount">({{otherUploadFileList.length}})</span></span>
          <div v-if="otherUploadFileList.length === 0" style="text-align: center;">
            <icon name="no-data" height="128" width="128" style="text-align: center"></icon>
            <p style="color: #AAA; font-size: 15px;text-align: center" >空空...</p>
          </div>
          <div v-else class="upload-show-container">

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-svg-icon/Icon'
  import uploadFileShow from "@/components/personalCenter/uploadFileShow";
  import {cancelFileStar, deleteFile, getAllUploadFile, setFileStar} from "../../base/api";
  import apiBaseUrl from "../../base/baseUrl";

  export default {
    name: "baseInfo",
    components: {Icon, uploadFileShow},
    data() {
      return {
        loading: false,
        uploadFileShowFlag: false,
        activeName: 'all',
        fileUploadApiUrl: apiBaseUrl + "/file/upload",
        limit: 4,
        fileList: [],
        selectedFile: {},
        allUploadFileList: [],
        ocrUploadFileList: [],
        pdfUploadFileList: [],
        otherUploadFileList: [],
      }
    },
    mounted() {
      this.getAllUpFile();
    },
    computed: {
      userProfile() {
        return this.$store.state.userProfile;
      }
    },
    methods: {
      getAllUpFile() {
        let that = this;
        this.loading = true;
        console.log("getAllUploadFile");
        getAllUploadFile(this.$store.state.userProfile.uid).then(res => {
          if(res.flag === 'T') {
            this.allUploadFileList = res.data;
            this.allUploadFileList.forEach(item => {
              if(item.sourceGroup === 'ocr') {
                this.ocrUploadFileList.push(item);
              } else if(item.sourceGroup === 'pdf') {
                this.pdfUploadFileList.push(item);
              } else {
                this.otherUploadFileList.push(item);
              }
            })
          } else {
            that.$message.error("获取文件失败");
          }
          that.loading = false;
        }).catch(e => {
          console.log("获取文件失败");
          console.log(e);
        })
      },

      showUploadFileDetail(file) {
        this.selectedFile = file;
        this.uploadFileShowFlag = true;
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCancelStar(file) {
        file.star = false;
        console.log("handleCancelStar", file)
        cancelFileStar(file.id).then(res => {
          if(res.flag === 'T') {
            file.star = false;
          }
        }).catch(e => {
          console.log("取消收藏失败")
          console.log(e);
        })
      },
      handleSetStar(file) {
        file.star = true;
        console.log("handleSetStar", file)
        setFileStar(file.id).then(res => {
          if(res.flag === 'T') {
            file.star = true;
          }
        }).catch(e => {
          console.log("文件收藏失败")
          console.log(e);
        })
      },
      handleDeleteFile(file) {
        let that = this;
        this.$confirm('确认删除？').then( res => {
          console.log(res);
          deleteFile(file.id).then(res => {
            if(res.flag === 'T') {
              that.allUploadFileList.forEach((item, index, arr) => {
                if(item.id === file.id) {
                  arr.splice(index, 1);
                }
              });
              that.ocrUploadFileList.forEach((item, index, arr) => {
                if(item.id === file.id) {
                  arr.splice(index, 1);
                }
              });
              that.pdfUploadFileList.forEach((item, index, arr) => {
                if(item.id === file.id) {
                  arr.splice(index, 1);
                }
              });
              that.$message.success("删除成功")
            }
          })
        }).catch( e => {
          console.log(e);
        });
      },

      handleExceed() {
        this.$notify.error({
          title: '错误',
          message: "最多同时上传"+this.limit+"个文件"
        });
      },

      handleBeforeUpload() {
        this.loading = true;
      },

      handleUploadSuccess() {
        this.loading = false;
        this.$notify.success({
          title: '成功',
          message: '上传成功'
        });
        this.$refs.upload.clearFiles();
      },

      handleUploadError(res) {
        this.loading = false;
        this.$notify.error({
          title: '错误',
          message: '上传失败'
        });
        console.log(res);
        this.$refs.upload.clearFiles()
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
    position: relative;
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
    margin-right: 60px;
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