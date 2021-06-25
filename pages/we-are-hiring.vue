<template lang="pug">
.hiring(ref="hiring")
  <!-- Tetris(v-if="isTetrisActive", :color="'#FFFFFF'", :opacity="0.1") -->
  .header
    Header
  .content
    img.bg(:src="require(`../assets/images/we-are-hiring/bg-top.svg`)")
    img.bg.bg-bottom(:src="require(`../assets/images/we-are-hiring/bg-bottom.svg`)")
    .text-before-slider
      p
      | Мы занимаемся решением задач бизнеса во всемирной сети интернет.
      p
      | От лендосиков до музыкальных стриминоговых платформ на блокчейне, от сайтов доставки пиццы до сервисов Банка Силикиновой Долины.
    .slider
      Swiper
    .conditions
      Conditions
    .contact(:ref="'contact'")
      Contact(@toggleModal="toggleModal")
  transition(name="fade")
    Modal(v-if="showModal", :toggleModal="toggleModal", :modalText="modalText")
</template>

<script>
import Header from "~/components/we-are-hiring/HeaderHiring";
import Swiper from "~/components/we-are-hiring/SliderHiring";
import Slider from "~/components/we-are-hiring/SliderHiring";
import Contact from "~/components/we-are-hiring/ContactHiring";
import Conditions from "~/components/we-are-hiring/ConditionsHiring";
import Modal from "~/components/Modal";

import Tetris from "~/components/Tetris";

export default {
  components: {
    Header,
    Swiper,
    Contact,
    Tetris,
    Slider,
    Contact,
    Modal,
    Conditions,
  },

  data() {
    return {
      isTetrisActive: false,
      touchStart: 0,
      touchEnd: 0,
      showModal: false,
      modalText: "",
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
    toggleModal(status) {
      if (status === 200) {
        this.modalText = "Your message has been sent!";
      } else {
        this.modalText =
          "The message has not been sent. Please try again later";
      }

      this.showModal = !this.showModal;
    },
  },
};
</script>

<style lang="scss">
.hiring {
  font-family: play;
  font-weight: 300;
  font-style: normal;
  position: relative;
  background-color: #151515;
  color: #ffffff;
}
</style>

<style lang="scss" scoped>
.header {
  max-width: 1075px;
  height: 589px;
  margin: 0 auto;
  padding: 40px 16px 0;
}
.text-before-slider {
  max-width: 650px;
  text-align: center;
  margin: 100px auto 0 auto;
  padding-left: 26px;
  padding-right: 26px;
  font-size: 16px;
  line-height: 170%;
  letter-spacing: 0.01em;
  p {
    margin-top: 28px;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
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
  margin: 20px auto 0 auto;
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
@media (max-width: 768px) {
  .header {
    padding-top: 23px;
  }
  .conditions {
    margin: 100px auto 0 auto;
  }
  .slider {
    margin-top: 73px;
  }
  .contact {
    padding-left: 26px;
    padding-right: 26px;
  }
}
</style>
