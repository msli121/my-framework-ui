export const baseMixin = {
  data() {
    return {
      tableLoading: false,
      page: {
        limit: 10,
        offset: 1
      },
      // 首页背景图
      homeBgImages: [
        { fitType: "none", url: require("@/assets/images/ocr1.jpg") },
        { fitType: "none", url: require("@/assets/images/ocr2.jpg") },
        { fitType: "none", url: require("@/assets/images/ocr3.jpg") },
        { fitType: "none", url: require("@/assets/images/ocr4.jpg") },
      ],
      // 首页产品列表
      homeProductionList: [
        {
          fitType: "fill",
          url: require("@/assets/images/productionShow1.png"),
          title: "增值税发票识别",
          pathOrUrl: "",
          description: "能有效识别增值税普票、电子发票的关键字段",
        },
        {
          fitType: "fill",
          url: require("@/assets/images/productionShow2.jpg"),
          title: "通用图片文字识别",
          pathOrUrl: "",
          description: "提供高精度、高可靠的图片文字检测和识别",
        },
        {
          fitType: "fill",
          url: require("@/assets/images/productionShow3.png"),
          title: "特定场景服务定制",
          pathOrUrl: "",
          description: "针对特定需求场景，支持特定的OCR服务",
        },
      ],
      // ocr 页面展示的功能列表
      ocrFunctionList: [
        {icon: "ocr", title: "文字识别", info: "一款支持PDF文档和doc、ppt、图片、txt文档等多种格式之间的转换的软件", url: "", path: ""},
        {icon: "ocr", title: "图片识别", info: "一款支持PDF文档和doc、ppt、图片、txt文档等多种格式之间的转换的软件", url: "", path: ""},
        {icon: "ocr", title: "数字识别", info: "识别图片中的数字，适用于手机号提取、快递单号提取、充值号码提取等场景", url: "", path: ""},
      ]
    }
  }
}