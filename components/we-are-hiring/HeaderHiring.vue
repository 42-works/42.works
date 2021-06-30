<template lang="pug">
.header-landing(ref="header")
  .header-contact
    .text-contact
      a(href='mailto:hello@42.com')
        | hello@42.com
    .text-contact.phone
      a(href="tel:+7(999)696-65-50")
        | +7 (999) 696-65-50

    a(title='Telegram' href='https://telegram.me/adimov' class="telegram" target='_blank')
      .text-contact
        | telegram
      TelegramIcon.telegram-icon
  .header-content
    .header-info
      .header-text
        .header-title
          | <Привет,
        .header-title-small
          | это студия разработки 42/>
      .logo.mobile
        .logo-image(ref="logo")
          Logo
        .logo-shadow(ref="logoShadow")
          LogoShadow
      .text-header#blink
        | Нам нужны твои мозги.
      .button-header
        Button(@click="scrollTo", :title="'Рассказать о себе'")
    .logo.desktop
      .logo-image(ref="logo")
        Logo
      .logo-shadow(ref="logoShadow")
        LogoShadow
</template>

<script>
import Logo from "~/assets/images/logo-main.svg?inline";
import TelegramIcon from "~/assets/images/we-are-hiring/telegram.svg?inline";
import LogoShadow from "~/assets/images/we-are-hiring/logo-main-shadow.svg?inline";
import Button from "../Button";

export default {
  components: {
    Logo,
    LogoShadow,
    Button,
    TelegramIcon
  },

  data() {
    return {
      mouse: {
        X: 0,
        Y: 0
      },
      paralaxCenter: {
        X: 0,
        Y: 0
      }
    };
  },

  mounted() {
    if (process.browser) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
      this.setStartParalaxCenter();
    }
  },

  beforeDestroy() {
    this.$refs.header.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.setStartParalaxCenter();
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

    setStartParalaxCenter() {
      if (window.innerWidth > 768) {
        this.$refs.header.addEventListener("mousemove", this.mouseMove);
        this.paralaxCenter.X =
          this.$refs.logo.getBoundingClientRect().left +
          this.$refs.logo.offsetWidth / 2;
        this.paralaxCenter.Y =
          this.$refs.logo.getBoundingClientRect().top +
          this.$refs.logo.offsetHeight / 2;
      } else {
        this.$refs.header.removeEventListener("mousemove", this.mouseMove);
      }
    },

    mouseMove(evt) {
      this.mouse.X = evt.clientX;
      this.mouse.Y = evt.clientY;
      this.$refs.logo.style.top =
        -this.getOffset(this.mouse.Y - this.paralaxCenter.Y) + "px";
      this.$refs.logo.style.left =
        -this.getOffset(this.mouse.X - this.paralaxCenter.X) + "px";
      this.$refs.logoShadow.style.top =
        this.getOffset(this.mouse.Y - this.paralaxCenter.Y) + "px";
      this.$refs.logoShadow.style.left =
        this.getOffset(this.mouse.X - this.paralaxCenter.X) + "px";
    },
    scrollTo() {
      this.$parent.$refs.contact.scrollIntoView({
        behavior: "smooth",
        alignToTop: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#blink {
  -webkit-animation: blink 2s linear infinite;
  animation: blink 2s linear infinite;
}
@keyframes blink {
  0% {
    color: rgb(255, 255, 255);
  }
  70% {
    color: rgb(114, 114, 114);
  }
  90% {
    color: rgb(255, 255, 255);
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
}
.header-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.phone {
  flex: 1 1;
  margin: 0 33px;
}
.text-contact {
  a {
    align-items: center;
    font-weight: 300;
    font-size: 16px;
    line-height: 170%;
    letter-spacing: 0.01em;
    text-decoration: none;
    color: #ffffff;
  }
}
.telegram {
  display: flex;
  color: #ffffff;
  text-decoration: none;
}
.telegram-icon {
  display: block;
  margin-left: 16px;
}
.header-content {
  display: flex;
  margin-top: 135px;
}
.header-info {
  margin-right: 10px;
}
.header-title {
  font-weight: 700;
  font-size: 56px;
  line-height: 69px;
  letter-spacing: 0.01em;
}
.header-title-small {
  margin-top: 12px;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.01em;
  overflow: hidden;
  border-right: 0.15em solid white;
  white-space: nowrap;
  margin: 0 auto;
  animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
}
.text-header {
  margin-top: 62px;
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
}
.logo.mobile {
  display: none;
}
.logo {
  position: relative;
  margin-left: auto;
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
.button-header {
  margin-top: 20px;
}
.button-header ::v-deep .button {
  height: 47px;
  width: 236px;
  font-family: "play";
  color: #ffffff;
  border: 2px solid $white;
  background-color: $black;
  &:before {
    width: 236px;
    height: 8px;
    border-top: 8px solid $white;
    border-left: 8px solid transparent;
  }
  &:after {
    height: 55px;
    width: 8px;
    border-left: 8px solid $white;
    border-top: 8px solid transparent;
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
      width: 0;
      border-left: none;
      border-top: none;
    }
    &:after {
      right: 0;
      top: 0;
      height: 0;
      border-left: none;
      border-top: none;
    }
  }
}

@media (max-width: 850px) {
  .text-contact {
    a {
      font-size: 13px;
    }
  }
  .phone {
    flex: none;
    margin: 0;
    a {
      font-size: 12px;
    }
  }
  .telegram-icon {
    margin-left: 8px;
  }
  .telegram {
    font-size: 14px;
    .text-contact {
      display: none;
    }
  }
  .header-content {
    margin-top: 30px;
    flex-direction: column;
  }
  .header-title-small {
    max-width: 270px;
  }
  .logo.desktop {
    display: none;
  }
  .logo.mobile {
    display: flex;
    justify-content: center;
    margin: 45px auto;
  }
  .logo-image {
    max-width: 261px;
    height: auto;
  }
  .logo-shadow {
    display: none;
    top: 48px;
    right: 73px;
  }
  .header-info {
    text-align: center;
    margin-right: 0;
  }
  .header-title {
    font-size: 40px;
  }
  .header-title-small {
    margin-top: 0px;
    font-size: 20px;
    line-height: 27px;
  }
  .text-header {
    font-size: 16px;
    line-height: 32px;
  }
  .button {
    margin: auto;
  }
}
</style>
