<template>
  <div class="footer">
    <div class="footer-center">
      <div class="footer-top">
        <div class="about-us">
          <h3>关于我们</h3>
          <img :src="url" style="width: 46px; height: 46px; border-radius: 10px;" alt>
          <p>{{ description }}</p>
        </div>
        <div class="relevant-service">
          <h3>小程序</h3>
          <p>敬请期待</p>
        </div>
        <div class="contact-us">
          <h3>联系方式</h3>
          <ul>
            <li>
              <span>联系手机号：18012411994</span>
            </li>
            <li>
              <span>联系微信：18012411994</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ copyRight }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageFooter",
  data() {
    return {
      url: require("@/assets/icons/logo.png"),
      description: "一群进击的小伙伴…^…^…",
      copyRight: "Copyright ©2020-2021.All Rights Reserved. 亿图OCR 版权所有"
    }
  },
  methods: {}
};
</script>

<style scoped>
.footer {
  background: #485563;
  /*background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;*/
  /*background-blend-mode: multiply,multiply;*/
}

.footer-center {
  width: 1300px;
  margin: 0 auto;
  /*padding: 60px 0 58px;*/
  /*display: flex;*/
  /*justify-content: space-between;*/
}

.footer-top {
  padding: 25px 0 25px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  /*border-bottom: 1px solid #666666;*/
  border-bottom: 1px solid #d7d2cc;
}

.footer-top > div {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  min-height: 173px;
}

.footer-top > div h3 {
  margin-top: 0;
  font-size: 16px;
  color: #f7f7f7;
  margin-bottom: 10px;
}

.about-us {
  width: 38%;
  border-right: 2px solid #d7d2cc;
  padding-right: 60px;
  text-align: left;
  /*float: left;*/
}

.about-us p {
  font-size: 14px;
  color: #999999;
  margin-top: 12px;
  line-height: 1.5;
}

.contact-us {
  width: 22%;
  /*border-right: 4px solid #4e4e4e;*/
  display: inline-block;
  text-align: left;
  /*float: left;*/
}

/*.contact-center {*/
/*  display: inline-block;*/
/*  text-align: left;*/
/*}*/
.footer .contact-us ul {
  font-size: 14px;
  margin: 0;
  padding-left: 0;
}

.footer .contact-us ul li {
  margin-bottom: 10px;
}

.footer .contact-us ul span {
  color: #fff;
  opacity: .7;
  -webkit-transition: opacity .3s;
  -o-transition: opacity .3s;
  transition: opacity .3s;
}

.relevant-service {
  width: 36%;
  border-right: 2px solid #d7d2cc;
  text-align: left;
  padding: 0 10px;
  /*float: left;*/
}

.relevant-service p {
  font-size: 14px;
  color: #999999;
  margin-top: 12px;
  line-height: 1.5;
}

.footer-bottom {
  padding: 10px 0;
}

.footer-bottom p {
  font-size: 12px;
  color: #999999;
  text-align: center;
  /* margin-top: 15px; */
  text-align: center;
}
</style>