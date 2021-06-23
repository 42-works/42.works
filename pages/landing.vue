<template lang="pug">
.landing
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
    .after-slider
      Contact
</template>

<script>
import Header from "~/components/HeaderLanding";
import Swiper from "~/components/SliderLanding";
import Contact from "~/components/ContactLanding";

export default {
  components: {
    Header,
    Swiper,
    Contact
  }
};
</script>

<style lang="scss" scoped>
.landing {
  position: relative;
  background: #000105;
  color: #ffffff;
}
.header {
}
.content {
}

.before-slider {
  max-width: 579px;
  margin: 108px auto;
}
.text {
  text-align: center;
  p {
    margin: 16px 0;
  }
}

.after-slider {
  max-width: 710px;
  margin: 108px auto;
}
</style>
