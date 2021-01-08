module.exports = {
  devServer: {
    proxy: {
      // api是后端数据接口的地址
      '/api': {
        // 后端主机
        target: "http://111.229.37.167/",
        // 允许跨域
        changOrigin: true
      }
    }
  }
}