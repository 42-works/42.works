<template lang="pug">
  .home(ref="home")
    Tetris(v-if="isTetrisActive")
    .container
      .logo-wrapper
        .logo
          .logo-image(ref="logo")
            Logo
          .logo-shadow(ref="logoShadow")
            LogoShadow
        .logo-text
          | We create the face of the Internet
      nav.nav
        ul
          li.nav-item
            nuxt-link.nav-link(to="/projects") Projects
          li.nav-item
            nuxt-link.nav-link(to="/about") About
          li.nav-item
            nuxt-link.nav-link(to="/team") Team
          li.nav-item
            nuxt-link.nav-link(to="/contact") Contact
</template>

<script>
import Logo from "~/assets/images/logo-main.svg?inline";
import LogoShadow from "~/assets/images/logo-main-shadow.svg?inline";

import Tetris from "~/components/Tetris";

export default {
  components: {
    Logo,
    LogoShadow,
    Tetris
  },

  data() {
    return {
      isTetrisActive: false,
      mouse: {
        X: 0,
        Y: 0
      },
      paralaxCenter: {
        X: 0,
        Y: 0
      },
      touchStart: 0,
      touchEnd: 0
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
    this.$refs.home.removeEventListener("mousemove", this.mouseMove);

    window.removeEventListener("mousewheel", this.wheelHandler);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchend", this.touchEndHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);

    document.body.style.backgroundColor = "";
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
        this.$refs.home.addEventListener("mousemove", this.mouseMove);
        this.paralaxCenter.X =
          this.$refs.logo.getBoundingClientRect().left +
          this.$refs.logo.offsetWidth / 2;
        this.paralaxCenter.Y =
          this.$refs.logo.getBoundingClientRect().top +
          this.$refs.logo.offsetHeight / 2;
      } else {
        this.$refs.home.removeEventListener("mousemove", this.mouseMove);
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
      console.log(document.body);
      if (e.deltaY < 0) {
        document.body.style.backgroundColor = "#3431DC";
      } else if (e.deltaY > 0) {
        document.body.style.backgroundColor = "#615EEE";
      }
    },

    touchStartHandler(e) {
      this.touchStart = e.touches[0].clientY;
    },

    touchMoveHandler(e) {
      this.touchEnd = e.changedTouches[0].clientY;
      document.body.style.backgroundColor =
        this.touchStart < this.touchEnd ? "#3431DC" : "#615EEE";
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #3431dc;
}
</style>

<style scoped lang="scss">
.home {
  position: relative;
  height: 100vh;
  min-height: 650px;
  background: linear-gradient(180deg, #3431dc 0%, #615eee 100%);
}

.logo-wrapper {
  padding-top: 40px;
}

.container {
  position: relative;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  max-width: 750px;
  width: 100%;
  margin: 0 auto;
}

.nav {
  margin-top: 80px;
}

.nav-link {
  display: block;

  font-size: 70px;
  line-height: 80px;
  letter-spacing: 0.02em;
  text-decoration: none;
  font-weight: bold;
  color: #ffffff;

  transition: all 0.1s linear;

  &:hover {
    -webkit-text-stroke: 2px white;
    color: transparent;
  }
}

.nav ul {
  list-style: none;
  padding-left: 45px;
}

.nav-item {
  margin-bottom: 34px;

  &:last-child {
    margin-bottom: 0;
  }
}

.logo {
  position: relative;
  margin-bottom: 48px;
}

.logo-image {
  position: relative;
  z-index: 10;
  width: 289px;
  height: 201px;
}

.logo-shadow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

.logo-shadow svg {
  width: 275px;
}

.logo-text {
  font-size: 21px;
  line-height: 32px;
  letter-spacing: 0.01em;

  color: #ffffff;
}

@media (max-width: 768px) {
  .home {
    height: auto;
    min-height: 100vh;
    padding-bottom: 60px;
    padding-top: 60px;
  }

  .container {
    top: auto;
    transform: translateY(0);
    flex-flow: column nowrap;
    justify-content: center;
  }

  .logo {
    max-width: 250px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
  }

  .logo-text {
    text-align: center;
  }

  .logo-shadow svg {
    height: auto;
    width: 245px;
  }

  .nav {
    margin-top: 55px;
  }

  .nav ul {
    padding-left: 0;
  }

  .nav-item {
    text-align: center;
    margin-bottom: 16px;
  }

  .nav-link {
    display: inline;
    font-size: 46px;
    line-height: 52px;
  }

  .logo-image {
    width: 250px;
    height: 170px;
    left: 0 !important;
    top: 0 !important;
  }

  .logo-shadow {
    left: 24px !important;
    top: 31px !important;
  }
}

@media (max-width: 500px) {
  .logo {
    margin-left: 0;
  }

  .logo-text {
    text-align: left;
  }

  .nav-item {
    text-align: left;
  }
}
</style>
