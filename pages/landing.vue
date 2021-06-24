<template lang="pug">
.landing(ref="landing")
  <!-- Tetris(v-if="isTetrisActive", :color="'#FFFFFF'", :opacity="0.1") -->
  .header
    Header
  .content
    .before-slider.text
      p
      | Мы занимаемся решением задач бизнеса во всемирной сети интернет.
      p
      | От лендосиков до музыкальных стриминоговых платформ на блокчейне, от сайтов доставки пиццы до сервисов Банка Силикиновой Долины.
    .Slider
      Swiper
    .Conditions
      Conditions
    .after-slider
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
    window.addEventListener("mousewheel", this.wheelHandler);
    window.addEventListener("touchstart", this.touchStartHandler);
    window.addEventListener("touchend", this.touchEndHandler);
    window.addEventListener("touchmove", this.touchMoveHandler);

    if (process.browser) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
  },

  beforeDestroy() {
    window.removeEventListener("mousewheel", this.wheelHandler);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchend", this.touchEndHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);

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

    wheelHandler(e) {
      document.documentElement.style.backgroundColor = "#151515";
    },

    touchStartHandler(e) {
      this.touchStart = e.touches[0].clientY;
    },

    touchMoveHandler(e) {
      this.touchEnd = e.changedTouches[0].clientY;
      document.documentElement.style.backgroundColor = "#151515";
    },
    scrollTo() {
      this.$refs.contact.scrollIntoView({
        behavior: "smooth",
        alignToTop: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .landing {
//   font-family: "noto-sans";
//   position: relative;
//   background-color: #151515;
//   color: #ffffff;
// }

.header {
  max-width: 1075px;
  margin: 0 auto;
  padding: 40px 16px 0;
}

.conditions {
  max-width: 710px;
  margin: 108px auto;
}
.before-slider {
  max-width: 579px;
  margin: 108px auto;
}

.after-slider {
  max-width: 710px;
  margin: 108px auto;
}
</style>

<style lang="scss">
.landing {
  font-family: noto-sans;
  font-weight: 300;
  font-style: normal;
  position: relative;
  background-color: #151515;
  color: #ffffff;
}
</style>
