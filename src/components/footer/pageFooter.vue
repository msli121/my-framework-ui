<template>
  <div class="footer">
    <div class="footer-center">
      <div class="footer-top">
        <div class="about-us">
          <h3>关于我们</h3>
          <img :src="url" alt>
        </div>
        <div class="contact-us"></div>
        <div class="relevant-service"></div>
      </div>
      <div class="footer-bottom">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageFooter",
  data() {
    return {
      url: require("@/assets/icons/yzq-origin.jpg")
    }
  },
  methods: {

  }
};
</script>

<style scoped>
  .footer {
    background: #333333;
  }
  .footer-center {
    width: 1200px;
    margin: 0 auto;
    /*padding: 60px 0 58px;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }
  .footer-top {
    padding: 25px 0 55px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
  .footer-top>div {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    min-height: 173px;
  }
  .about-us {
    width: 38%;
    border-right: 4px solid #4e4e4e;
    padding-right: 60px;
  }
  .contact-us {
    width: 22%;
    border-right: 4px solid #4e4e4e;
    text-align: center;
    padding: 0 5px;
  }
  .relevant-service {
    width: 22%;
    text-align: center;
    padding: 0 10px;
  }
</style>