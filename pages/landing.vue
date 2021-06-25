<template lang="pug">
.landing(ref="landing")
  <!-- Tetris(v-if="isTetrisActive", :color="'#FFFFFF'", :opacity="0.1") -->
  .header
    Header
  .content
    img.bg(:src="require(`../assets/images/landing/bg-top.svg`)")
    img.bg.bg-bottom(:src="require(`../assets/images/landing/bg-bottom.svg`)")
    .before-slider.text
      p
      | Мы занимаемся решением задач бизнеса во всемирной сети интернет.
      p
      | От лендосиков до музыкальных стриминоговых платформ на блокчейне, от сайтов доставки пиццы до сервисов Банка Силикиновой Долины.
    .slider
      Swiper
    .conditions
      Conditions
    .contact(:ref="'contact'")
      Contact
</template>

<script>
import Header from "~/components/HeaderLanding";
import Swiper from "~/components/SliderLanding";
import Slider from "~/components/SliderLanding";
import Contact from "~/components/ContactLanding";
import Conditions from "~/components/ConditionsLanding";

import Tetris from "~/components/Tetris";

export default {
  components: {
    Header,
    Swiper,
    Contact,
    Tetris,
    Slider,
    Contact,
    Conditions,
  },

  data() {
    return {
      isTetrisActive: false,
      touchStart: 0,
      touchEnd: 0,
    };
  },

  mounted() {
    window.addEventListener("touchstart", this.touchStartHandler);
    window.addEventListener("touchend", this.touchEndHandler);

    if (process.browser) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchend", this.touchEndHandler);

    document.documentElement.style.backgroundColor = "";
  },

  methods: {
    onResize() {
      if (window.innerWidth <= 768) {
        this.isTetrisActive = false;
      } else {
        this.isTetrisActive = true;
      }
    },

    touchStartHandler(e) {
      this.touchStart = e.touches[0].clientY;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  max-width: 1075px;
  height: 589px;
  margin: 0 auto;
  padding: 40px 16px 0;
}
.before-slider {
  max-width: 579px;
  margin: 100px auto 0 auto;
}
.slider {
  margin-top: 107px;
}
.conditions {
  max-width: 710px;
  margin: 160px auto 0 auto;
}
.contact {
  max-width: 710px;
  margin: 24px auto 0 auto;
  padding-bottom: 90px;
}
.bg {
  max-width: 100%;
  width: 100%;
}
.bg-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.before-slider.text {
  padding-left: 26px;
  padding-right: 26px;
  p {
    margin-top: 28px;
    text-align: center;

  }
}
@media(max-width: 768px) {
  .conditions {
      margin: 100px auto 0 auto;
    }
  .contact {
    padding-left: 26px;
    padding-right: 26px;
  }
}
</style>

<style lang="scss">
.landing {
  font-family: play;
  font-weight: 300;
  font-style: normal;
  position: relative;
  background-color: #151515;
  color: #ffffff;
}


</style>
