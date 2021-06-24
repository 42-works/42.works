<template lang="pug">
.landing(ref="landing")
  <!-- Tetris(v-if="isTetrisActive", :color="'#FFFFFF'", :opacity="0.1") -->
  .header
    .header-contact
      .text-contact
        | hello@42.com
      .text-contact.phone
        | +7 (999) 696-65-50
      .text-contact
        | telegram
      .image.telegram-icon
        img(:src="require(`~/assets/images/landing/telegram.svg`)")
    .header-content
      .header-info
        .header-title
          | </Привет,
        .header-title-small
          | это студия разработки 42:/>
        .text-header
          | Нам нужны твои мозги.
        button.header-button Рассказать о себе
      .logo
        .logo-image(ref="logo")
          Logo
        .logo-shadow(ref="logoShadow")
          LogoShadow
  .content
    .before-slider.text
      p
      | Мы занимаемся решением задач бизнеса во всемирной сети интернет.
      p
      | От лендосиков до музыкальных стриминоговых платформ на блокчейне, от сайтов доставки пиццы до сервисов Банка Силикиновой Долины.
    .Slider
      Swiper
    .after-slider
      Contact
</template>

<script>
import Header from "~/components/HeaderLanding";
import Swiper from "~/components/SliderLanding";
import Logo from "~/assets/images/logo-main.svg?inline";
import LogoShadow from "~/assets/images/landing/logo-main-shadow.svg?inline";
import Slider from "~/components/SliderLanding";
import Contact from "~/components/ContactLanding";


import Tetris from "~/components/Tetris";

export default {
  components: {
    Header,
    Swiper,
    Contact,
    Logo,
    LogoShadow,
    Tetris,
    Slider,
    Contact,
  }
,
  

  data() {
    return {
      isTetrisActive: false,
      mouse: {
        X: 0,
        Y: 0,
      },
      paralaxCenter: {
        X: 0,
        Y: 0,
      },
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
      this.setStartParalaxCenter();
    }
  },

  beforeDestroy() {
    this.$refs.landing.removeEventListener("mousemove", this.mouseMove);

    window.removeEventListener("mousewheel", this.wheelHandler);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchend", this.touchEndHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);

    document.documentElement.style.backgroundColor = "";
  },

  methods: {
    onResize() {
      this.setStartParalaxCenter();
      if (window.innerWidth <= 768) {
        this.isTetrisActive = false;
      } else {
        this.isTetrisActive = true;
      }
    },

    setStartParalaxCenter() {
      if (window.innerWidth > 768) {
        this.$refs.landing.addEventListener("mousemove", this.mouseMove);
        this.paralaxCenter.X =
          this.$refs.logo.getBoundingClientRect().left +
          this.$refs.logo.offsetWidth / 2;
        this.paralaxCenter.Y =
          this.$refs.logo.getBoundingClientRect().top +
          this.$refs.logo.offsetHeight / 2;
      } else {
        this.$refs.landing.removeEventListener("mousemove", this.mouseMove);
      }
    },

    mouseMove(evt) {
      this.mouse.X = evt.clientX;
      this.mouse.Y = evt.clientY;

      const leftLogo = this.mouse.X - this.paralaxCenter.X;

      this.$refs.logo.style.top =
        -this.getOffset(this.mouse.Y - this.paralaxCenter.Y) + "px";
      this.$refs.logo.style.left =
        -this.getOffset(this.mouse.X - this.paralaxCenter.X) + "px";
      this.$refs.logoShadow.style.top =
        this.getOffset(this.mouse.Y - this.paralaxCenter.Y) + "px";
      this.$refs.logoShadow.style.left =
        this.getOffset(this.mouse.X - this.paralaxCenter.X) + "px";
    },

    getOffset(currentOffset) {
      const maxOffset = 35;
      if (Math.abs(currentOffset) * 0.03 > maxOffset) {
        if (currentOffset < 0) {
          return -maxOffset;
        } else {
          return maxOffset;
        }
      } else {
        return currentOffset * 0.03;
      }
    },

    wheelHandler(e) {
      document.documentElement.style.backgroundColor = "#000105";
    },

    touchStartHandler(e) {
      this.touchStart = e.touches[0].clientY;
    },

    touchMoveHandler(e) {
      this.touchEnd = e.changedTouches[0].clientY;
      document.documentElement.style.backgroundColor = "#000105";
    },
  },
};
</script>

<style lang="scss" scoped>
.landing {
  font-family: "noto-sans";
  position: relative;
  background-color: #000105;
  color: #ffffff;
}

.header {
  max-width: 1075px;
  margin: 0 auto;
  padding: 40px 16px 0;
}

.header-contact {
  display: flex;
  justify-content: space-between;
}

.phone {
  flex: 1 1;
  margin: 0 33px;
}

.text-contact {
  align-items: center;
  font-weight: 300;
  font-size: 16px;
  line-height: 170%;
  letter-spacing: 0.01em;
}

.image img {
  width: 100%;
  display: block;
}

.telegram-icon {
  margin-left: 16px;
  width: 20px;
}

.header-content {
  display: flex;
  margin-top: 135px;
}

.header-title {
  font-weight: 600;
  font-size: 56px;
  line-height: 69px;
  letter-spacing: 0.01em;
}

.header-title-small {
  margin-top: 12px;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.01em;
}

.text-header {
  margin-top: 62px;
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
}

.logo {
  position: relative;
  margin-left: 230px;
}

.logo-image {
  position: relative;
  z-index: 10;
  width: 445px;
  height: 316px;
}

.logo-shadow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

.logo-shadow svg {
  width: 445px;
}

.before-slider {
  max-width: 579px;
  margin: 108px auto;
}

.after-slider {
  max-width: 710px;
  margin: 108px auto;
}

button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  min-width: 184px;
  text-align: center;

  border: 2px solid $white;
  background-color: $black;
  cursor: pointer;
  box-sizing: border-box;

  transition: 0.2s;

  &:before,
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
  }

  &:before {
    bottom: -10px;
    left: -2px;
    width: 192px;
    height: 8px;
    border-top: 8px solid $white;
    border-bottom: none;
    border-left: 8px solid $black;
    box-sizing: border-box;
    transition: border-top 0.2s;
  }

  &:after {
    top: -2px;
    right: -10px;
    height: 49px;
    width: 8px;
    border-left: 8px solid $white;
    border-bottom: none;
    border-top: 8px solid $black;
    transition: border-left 0.2s;
  }

  &:hover {
    background-color: #3431dc;
  }

  &:active {
    top: 8px;
    left: 8px;
    &:before {
      bottom: 0;
      left: 0;
      width: 160px;
    }
    &:after {
      right: 0;
      top: 0;
      height: 30px;
    }
  }
}

.header-button {
  margin-top: 20px;
  font-size: 18px;
  line-height: 32px;
  padding: 0 34px;
  z-index: 1;
  color: #ffffff;
  &:before {
    width: 232px;
  }
}

.header-button:hover {
  border: 2px solid $white;
  color: $white;

  &::before {
    border-top: 8px solid $white;
  }

  &::after {
    border-left: 8px solid $white;
  }
}
</style>
