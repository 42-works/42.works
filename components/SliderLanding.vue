<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide">
        <div class='slide-title'>Matter.online</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/1"><img src="../assets/images/matter.jpg"></img></a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Palmyra</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/2"><img src="../assets/images/palmyra.jpg"></img></a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Pizza Sicilia</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/11"><img src="../assets/images/sicilia.jpg"></img></a>
        </div>
      </swiper-slide>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>


    <div class="slider-mobile">
      <div class="item">
        <div class='slide-title'>Matter.online</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/1"><img src="../assets/images/matter.jpg"></img></a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Palmyra</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/2"><img src="../assets/images/palmyra.jpg"></img></a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Pizza Sicilia</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/11"><img src="../assets/images/sicilia.jpg"></img></a>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>

import { Swiper, SwiperSlide, Navigation, directive } from "vue-awesome-swiper";
// import Swiper, {
//   Navigation
// } from 'swiper';

Swiper.use([Navigation]);

export default {
  
  components: {
    Swiper,
    SwiperSlide,
    Navigation
  },

  
  
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
  
};
</script>

<style lang="scss" scoped>
  .slider-mobile {
    display:none;
  }
// @import "./base.scss";
  .swiper-container {
    height: 460px!important;
  }
  
  
  .swiper {
    // background: red;
  }
  .slide {
    width: 518px!important;
    
  }
  .slide-title {
    font-weight: 600;
    font-size: 40px;
    line-height: 56px;
    letter-spacing: 0.01em;
    color: #FFFFFF;
  }
  .slide-subtitle {
    font-family: Cabin;
    font-weight: normal;
    font-size: 18px;
    line-height: 40px;
    letter-spacing: 0.01em;
    color: #4F4F4F;
  }
  .slide-img {
    width: 100%;
    margin-top: 28px;
    transition: 0.2s;
    z-index: 100;
    &:hover {
      width: 115.9%;
      transform: translate(-52px, -6%);
    }
    img {
      width: 100%;
    }
  }

  @media(max-width: 768px) {
    .slider-mobile {
      display: block;
      .item {
        max-width: 100%;
        text-align: center;
        margin-top: 67px;
        .slide-title {
          font-size: 36px;
        }
        img {
          width: 100%;
        }
      }
    }
    .swiper-container {
      display: none;
    }
  }
</style>
