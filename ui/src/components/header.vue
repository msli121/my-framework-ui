<template>
  <div>
    <header class="header-area">
      <div class="sticky-area">
        <div class="navigation">
          <div class="container">
            <div class="row">
              <div class="col-lg-3">
                <div class="logo">
                  <a class="navbar-brand"
                    ><img src="../assets/img/logo.png" alt=""
                  /></a>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="main-menu">
                  <nav class="navbar navbar-expand-lg">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                      <span class="navbar-toggler-icon"></span>
                      <span class="navbar-toggler-icon"></span>
                    </button>

                    <div
                      class="collapse navbar-collapse justify-content-center"
                      id="navbarSupportedContent"
                    >
                      <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            href="#"
                            @click="chooseHome"
                            >首页
                            <span class="sub-nav-toggler"> </span>
                          </a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link" href="#"
                            >服务
                            <span class="sub-nav-toggler"> </span>
                          </a>
                          <ul class="sub-menu">
                            <li><a href="#" @click="chooseApplication">留学申请书</a></li>
                            <li><a href="#" @click="chooseJob">留学课程作业</a></li>
                            <li><a href="#" @click="choosePaper">国际期刊论文</a></li>
                            <li><a href="#" @click="choosePersonDoc">个人文档</a></li>
                            <li><a href="#" @click="chooseCommercialUse">商业用途</a></li>
                            <li><a href="#" @click="chooseAuthor">作家</a></li>
                          </ul>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#" @click="chooseOrder"
                            >报价&下单
                            <span class="sub-nav-toggler"> </span>
                          </a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link" href="#"
                            >更多问题
                            <span class="sub-nav-toggler"> </span>
                          </a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link" href="#"
                            >资源
                            <span class="sub-nav-toggler"> </span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="contact.html">关于我们</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="header-right-content">
                  <a href="#" @click="register" class="main-btn">登录|注册</a>
                  <div class="search-box">
                    <button class="search-btn">
                      <i class="la la-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="search-popup">
        <span class="search-back-drop"></span>

        <div class="search-inner">
          <div class="auto-container">
            <div class="upper-text">
              <div class="text">Search for anything.</div>
              <button class="close-search">
                <span class="la la-times"></span>
              </button>
            </div>

            <form method="post" action="index.html">
              <div class="form-group">
                <input
                  type="search"
                  name="search-field"
                  value=""
                  placeholder="Search..."
                  required=""
                />
                <button type="submit"><i class="la la-search"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header",
  props: {
    ifcontent: String,
    default: null,
  },
  data() {
    return {};
  },
  methods: {
    // 登录or注册
    register() {
      this.$emit("success", "register");
    },
    chooseHome() {
      this.$emit("success", "home");
    },
    chooseApplication() {

    },
    chooseJob() {

    },
    choosePaper() {

    },
    choosePersonDoc() {

    },
    chooseCommercialUse() {

    },
    chooseAuthor() {

    },
    // 报价&下单
    chooseOrder() {
      this.$emit("success", "order");
    }
  },
};
</script>