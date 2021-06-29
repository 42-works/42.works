<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide">
        <a href="./project/1">
          <div class="slide-title">Matter.online</div>
          <div class="slide-subtitle">Full stack development</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/matter.jpg" />
          </div>
        </a>
      </swiper-slide>

      <swiper-slide class="slide">
        <a href="./project/2">
          <div class="slide-title">Palmyra</div>
          <div class="slide-subtitle">Full stack development</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/palmyra.jpg" />
          </div>
        </a>
      </swiper-slide>

      <swiper-slide class="slide">
        <a href="./project/11">
          <div class="slide-title">Pizza Sicilia</div>
          <div class="slide-subtitle">Full stack development</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/sicilia.jpg" />
          </div>
        </a>
      </swiper-slide>

      <swiper-slide class="slide">
        <a href="https://mighty.business/" target="_blank">
          <div class="slide-title">Mighty</div>
          <div class="slide-subtitle">Mobile app</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/mighty.jpg" />
          </div>
        </a>
      </swiper-slide>

      <swiper-slide class="slide">
        <a href="https://www.confettiapp.io/" target="_blank">
          <div class="slide-title">Confetti</div>
          <div class="slide-subtitle">Full stack development</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/confetti.jpg" />
          </div>
        </a>
      </swiper-slide>

      <swiper-slide class="slide">
        <a href="https://www.joinviolet.com/" target="_blank">
          <div class="slide-title">Violet</div>
          <div class="slide-subtitle">Backend development</div>
          <div class="slide-img">
            <img src="~/assets/images/we-are-hiring/violet.jpg" />
          </div>
        </a>
      </swiper-slide>
    </swiper>

    <div class="slider-mobile">
      <a href="./project/1" class="item">
        <div class="slide-title">Matter.online</div>
        <div class="slide-subtitle">Full stack development</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/matter.jpg" />
        </div>
      </a>
      <a href="./project/2" class="item">
        <div class="slide-title">Palmyra</div>
        <div class="slide-subtitle">Full stack development</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/palmyra.jpg" />
        </div>
      </a>
      <a href="./project/11" class="item">
        <div class="slide-title">Pizza Sicilia</div>
        <div class="slide-subtitle">Full stack development</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/sicilia.jpg" />
        </div>
      </a>
      <a href="https://mighty.business/" target="_blank" class="item">
        <div class="slide-title">Mighty</div>
        <div class="slide-subtitle">Mobile app</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/mighty.jpg" />
        </div>
      </a>
      <a href="https://www.confettiapp.io/" target="_blank" class="item">
        <div class="slide-title">Confetti</div>
        <div class="slide-subtitle">Full stack development</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/confetti.jpg" />
        </div>
      </a>
      <a href="https://www.joinviolet.com/" target="_blank" class="item">
        <div class="slide-title">Violet</div>
        <div class="slide-subtitle">Backend development</div>
        <div class="item-img">
          <img src="~/assets/images/we-are-hiring/violet.jpg" />
        </div>
      </a>
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
  display: none;
}
.swiper-container {
  height: 460px !important;
}
.slide {
  width: 518px !important;
  a {
    color: #ffffff;
    text-decoration: none;
    &:hover {
      .slide-img {
        transform-origin: 50% 50%;
        transform: scale(1.1);
      }
    }
  }
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
  color: #4f4f4f;
}
.slide-img {
  width: 100%;
  margin-top: 24px;
  transition: 0.2s;
  z-index: 100;

  img {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .slider-mobile {
    display: block;
    .item {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      text-align: center;
      margin-top: 67px;
      color: #ffffff;
      text-decoration: none;
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
  .slide-subtitle {
    margin-bottom: 12px;
  }
}
</style>
