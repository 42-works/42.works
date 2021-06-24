<template lang="pug">
.header-landing(ref="header")
  .header-contact
    .text-contact
      | hello@42.com
    .text-contact.phone
      | +7 (999) 696-65-50
    .text-contact
      | telegram
    .image.telegram-icon
      img(:src="require(`../assets/images/landing/telegram.svg`)")
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
</template>

<script>
import Logo from "../assets/images/logo-main.svg?inline";
import LogoShadow from "../assets/images/landing/logo-main-shadow.svg?inline";

export default {
  components: {
    Logo,
    LogoShadow,
  },

  data() {
    return {
      mouse: {
        X: 0,
        Y: 0,
      },
      paralaxCenter: {
        X: 0,
        Y: 0,
      },
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
  }
};
</script>

<style lang="scss" scoped>
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
  font-weight: 400;
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
</style>
