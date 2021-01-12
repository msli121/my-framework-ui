module.exports = {
  devServer: {
    proxy: {
      //  /api 是后端项目上下文路径
      '/api': {
        // 后端主机
        target: "http://localhost:8888",
        // 允许跨域
        changOrigin: true
      }
    }
  }
}