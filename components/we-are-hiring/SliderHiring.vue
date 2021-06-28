<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide">
        <div class='slide-title'>Matter.online</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/1"><img src="~/assets/images/we-are-hiring/matter.jpg"/></a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Palmyra</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/2"><img src="~/assets/images/we-are-hiring/palmyra.jpg"/></a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Pizza Sicilia</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="project/11"><img src="~/assets/images/we-are-hiring/sicilia.jpg"/></a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Mighty</div>
        <div class='slide-subtitle'>Mobile app</div>
        <div class='slide-img'>
          <a href="https://mighty.business/">
           <img src="~/assets/images/we-are-hiring/mighty.jpg"/>
          </a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Confetti</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='slide-img'>
          <a href="https://www.confettiapp.io/">
           <img src="~/assets/images/we-are-hiring/confetti.jpg"/>
          </a>
        </div>
      </swiper-slide>
      <swiper-slide class="slide">
        <div class='slide-title'>Violet</div>
        <div class='slide-subtitle'>Backend development</div>
        <div class='slide-img'>
          <a href="https://www.joinviolet.com/">
            <img src="~/assets/images/we-are-hiring/violet.jpg"/>
          </a>
        </div>
      </swiper-slide>
    </swiper>


    <div class="slider-mobile">
      <div class="item">
        <div class='slide-title'>Matter.online</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/1"><img src="~/assets/images/we-are-hiring/matter.jpg"/></a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Palmyra</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/2"><img src="~/assets/images/we-are-hiring/palmyra.jpg"/></a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Pizza Sicilia</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="project/11"><img src="~/assets/images/we-are-hiring/sicilia.jpg"/></a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Mighty</div>
        <div class='slide-subtitle'>Mobile app</div>
        <div class='item-img'>
          <a href="https://mighty.business/">
            <img src="~/assets/images/we-are-hiring/mighty.jpg"/>
          </a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Confetti</div>
        <div class='slide-subtitle'>Full stack development</div>
        <div class='item-img'>
          <a href="https://www.confettiapp.io/">
            <img src="~/assets/images/we-are-hiring/confetti.jpg"/>
          </a>
        </div>
      </div>
      <div class="item">
        <div class='slide-title'>Violet</div>
        <div class='slide-subtitle'>Backend development</div>
        <div class='item-img'>
          <a href="https://www.joinviolet.com/">
            <img src="~/assets/images/we-are-hiring/violet.jpg"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, Navigation, directive } from "vue-awesome-swiper";

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
  .swiper-container {
    height: 460px!important;
  }
  .slide {
    width: 518px!important;
  }
  .slide-title {
    font-weight: bold;
    font-size: 40px;
    line-height: 56px;
    letter-spacing: 0.01em;
  }
  .slide-subtitle {
    font-size: 18px;
    line-height: 40px;
    letter-spacing: 0.01em;
    color: #4F4F4F;
  }
  .slide-img {
    width: 100%;
    margin-top: 24px;
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
