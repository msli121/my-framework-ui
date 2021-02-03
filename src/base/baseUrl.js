let apiBaseUrl = "";
switch (process.env.NODE_ENV) { //注意变量名是自定义的
    case 'development':
      // 开发环境url
      apiBaseUrl = "http://localhost:8888/api";
      break;
    case 'production':
      // 生产环境url
      apiBaseUrl = "http://47.117.127.63:8888/api";
      break;
}
export default apiBaseUrl;