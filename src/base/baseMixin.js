export default {
  data() {
    return {
      tableLoading: false,
      page: {
        limit: 10,
        offset: 1
      },
      // ocr 页面展示的功能列表
      ocrFunctionList: [
        {icon: "ocr", title: "文字识别", info: "一款支持PDF文档和doc、ppt、图片、txt文档等多种格式之间的转换的软件", url: "", path: ""},
        {icon: "ocr", title: "图片识别", info: "一款支持PDF文档和doc、ppt、图片、txt文档等多种格式之间的转换的软件", url: "", path: ""},
        {icon: "ocr", title: "数字识别", info: "识别图片中的数字，适用于手机号提取、快递单号提取、充值号码提取等场景", url: "", path: ""},
      ]
    }
  }
}