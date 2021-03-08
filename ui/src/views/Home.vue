<template>
  <div>
    <!-- Header Area -->
    <Header 
      v-bind:ifcontent="ifcontent"
      @success="success"></Header>

    <!-- content -->
    <div v-if="ifcontent==='home'">
      <div class="programe-area section-padding">
        <div class="container">
          <div class="row">
            <div class="offset-lg-2 col-lg-8 text-center">
              <div class="section-title">
                <h2>Our <b>Programe</b></h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis iusto quibusdam labore inventore similique, eaque
                  hic quam doloribus aspernatur recusandae.
                </p>
              </div>
            </div>
          </div>
          <div class="programe-wrapper">
            <div class="row no-gutters">
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/atom.png" alt="" />
                  </div>
                  <h5>Applied Physics</h5>
                  <p>Enrolled | 125</p>
                  <p class="course-qty">12 Courses</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/vote.png" alt="" />
                  </div>
                  <h5>Political Science</h5>
                  <p>Enrolled | 150</p>
                  <p class="course-qty">24 Courses</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/research.png" alt="" />
                  </div>
                  <h5>Business Studies</h5>
                  <p>Enrolled | 375</p>
                  <p class="course-qty">30 Courses</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner bor-rgt-no">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/computer.png" alt="" />
                  </div>
                  <h5>Computer Science</h5>
                  <p>Enrolled | 360</p>
                  <p class="course-qty">45 Courses</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/palette.png" alt="" />
                  </div>
                  <h5>Art & Design</h5>
                  <p>Enrolled | 120</p>
                  <p class="course-qty">32 Courses</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/microscope.png" alt="" />
                  </div>
                  <h5>Medical Science</h5>
                  <p>Enrolled | 230</p>
                  <p class="course-qty">56 Courses</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/architecture.png" alt="" />
                  </div>
                  <h5>Architecture</h5>
                  <p>Enrolled | 110</p>
                  <p class="course-qty">36 Courses</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-12">
                <div class="programe-inner bor-rgt-no">
                  <div class="programe-icon">
                    <img src="../assets/img/icon/data-mining.png" alt="" />
                  </div>
                  <h5>Data Science</h5>
                  <p>Enrolled | 56</p>
                  <p class="course-qty">10 Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="spacer">
        <div class="spacer-bg gray-bg bg-cover"></div>
      </div>

      <div class="event-area section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 text-center">
              <div class="section-title">
                <h2>Upcoming <b>Events </b></h2>
                <p>
                  At the Edupix Courses users can learn lots of thing form real
                  expert. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Fuga, optio.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-12">
              <div class="single-event-wrap">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="event-bg bg-cover">
                      <span class="event-date">30 Dec</span>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="event-content">
                      <h6>Annual Travel Camp</h6>
                      <p class="event-meta">
                        <i class="las la-clock"></i>
                        <span
                          >08.00 a.m. | <i class="las la-map-marker"></i>
                        </span>
                        <span>Chelsea Street</span>
                      </p>
                      <p>
                        Enim consectetur sit, quos natus, alias ut quibusdam non
                        nam corrupti!
                      </p>
                      <a href="single-event.html">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="single-event-wrap">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="event-bg bg-2 bg-cover">
                      <span class="event-date">02 Jan</span>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="event-content">
                      <h6>Inter-College Art Show</h6>
                      <p class="event-meta">
                        <i class="las la-clock"></i>
                        <span
                          >08.00 a.m. | <i class="las la-map-marker"></i>
                        </span>
                        <span>Chelsea Street</span>
                      </p>
                      <p>
                        Enim consectetur sit, quos natus, alias ut quibusdam non
                        nam corrupti!
                      </p>
                      <a href="single-event.html">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="single-event-wrap">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="event-bg bg-3 bg-cover">
                      <span class="event-date">16 Jan</span>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="event-content">
                      <h6>Physics Science Fair</h6>
                      <p class="event-meta">
                        <i class="las la-clock"></i>
                        <span
                          >08.00 a.m. | <i class="las la-map-marker"></i>
                        </span>
                        <span>Chelsea Street</span>
                      </p>
                      <p>
                        Enim consectetur sit, quos natus, alias ut quibusdam non
                        nam corrupti!
                      </p>
                      <a href="single-event.html">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-12">
              <div class="single-event-wrap">
                <div class="row">
                  <div class="col-lg-5">
                    <div class="event-bg bg-4 bg-cover">
                      <span class="event-date">25 Feb</span>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="event-content">
                      <h6>Workshop on Environment</h6>
                      <p class="event-meta">
                        <i class="las la-clock"></i>
                        <span
                          >08.00 a.m. | <i class="las la-map-marker"></i>
                        </span>
                        <span>Chelsea Street</span>
                      </p>
                      <p>
                        Enim consectetur sit, quos natus, alias ut quibusdam non
                        nam corrupti!
                      </p>
                      <a href="single-event.html">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Register Or Login -->
    <Register v-if="ifcontent==='register'"></Register>

    <!-- Order show -->
    <Order v-if="ifcontent==='order'"></Order>

    <!-- Footer Area -->
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
// import "../assets/css/bootstrap.min.css";
// import "../assets/css/font-awesome.min.css";
// import "../assets/css/line-awesome.min.css";
// import "../assets/css/animate.css";
// import "../assets/css/flaticon.css";
// import "../assets/css/owl.carousel.css";
// import "../assets/css/style.css";
// import "../assets/css/responsive.css";
// import "../assets/js/jquery-1.12.4.min.js";
// import "../assets/js/popper.min.js";
// import "../assets/js/bootstrap.min.js";
// import "../assets/js/wow.min.js";
// // import "../assets/js/jquery.waypoints.min.js";
// import "../assets/js/jquery.countdown.js";
// // import "../assets/js/owl.carousel.min.js";
// import "../assets/js/jquery.sticky.js";
// // import "../assets/js/main.js";

import Header from "../components/header";
import Footer from "../components/footer";
import Register from "../views/register/register";
import Order from "../views/order/index";

export default {
  name: "Home",
  components: {
    Header,
    Footer,

    Register,
    Order,
  },
  data() {
    return {
      ifcontent: "home",
    };
  },
  methods: {
    success(val) {
      this.ifcontent = val;
    },
  },
};
</script>
