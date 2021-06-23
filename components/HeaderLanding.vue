<template lang="pug">
.header
  .logo-wrapper
    .logo
      .logo-image(ref="logo")
        Logo
      .logo-shadow(ref="logoShadow")
        LogoShadow
</template>

<script>
import Logo from "~/assets/images/logo-main.svg?inline";
import LogoShadow from "~/assets/images/logo-main-shadow.svg?inline";

export default {
  components: {
    Logo,
    LogoShadow,
  },
};
</script>

<style lang="scss" scoped>
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
</style>
