<template>
  <div class="upload-file-show">
    <div style="width: 60%; border: 1px solid #ebebeb;border-radius: 3px;transition: .2s; padding: 8px 0 8px 8px;">
      <div class="ocr-image-show" style=" height: 400px; overflow-y: auto; overflow-x: auto">
        <el-image :src="file.fileContent" style="display: block;" fit="container"></el-image>
      </div>
    </div>
    <div class="ocr-result-show" style=" width:35%;border: 1px solid #ebebeb;border-radius: 3px;padding: 8px 0px 8px 8px;">
      <div class="show-result" v-loading="showLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <span style="display: inline-block; width: 100%;" v-for="(item, index) in selectedOcrResult" :key="index">[{{index + 1}}] {{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Icon from 'vue-svg-icon/Icon'
export default {
  name: "uploadFileShow",
  // components: {Icon},
  props: {
    file: Object,
  },
  data() {
    return {
      showLoading: false,
    }
  },
  computed: {
    selectedOcrResult() {
      return JSON.parse(this.file.recognitionContent);
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.upload-file-show {
  display: flex;
  justify-content: space-between;
}
.show-result {
  height: 400px;
  overflow-y: auto;
  text-align: left;
}
</style>