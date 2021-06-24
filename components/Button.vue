<template lang="pug">
button.button(:class="className") {{ title }}
</template>

<script>
export default {
  name: "v-btn",
  props: {
    title: {
      type: String,
      default: "Send message",
    },
    disabled: {
      type: Boolean,
    },
  },
  computed: {
    className() {
      return {
        disabled: this.disabled,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  color: #000000;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 48px;
  width: 184px;
  padding-bottom: 4px;
  padding-left: 0;
  padding-right: 0;

  line-height: 39px;
  font-size: 21px;
  text-align: center;
  letter-spacing: 0.02em;

  border: 2px solid $black;
  background-color: $white;
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
    z-index: 10;
    bottom: -10px;
    left: -2px;
    width: 192px;
    height: 8px;
    border-top: 8px solid $black;
    border-bottom: none;
    border-left: 8px solid $white;
    box-sizing: border-box;
    transition: border-top 0.2s;
  }

  &:after {
    z-index: 10;
    top: -2px;
    right: -10px;
    height: 49px;
    width: 8px;
    border-left: 8px solid $black;
    border-bottom: none;
    border-top: 8px solid $white;
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

.button:hover {
  border: 2px solid $black;
  color: $white;

  &::before {
    border-top: 8px solid $black;
  }

  &::after {
    border-left: 8px solid $black;
  }
}

.disabled {
  pointer-events: none;
  border-color: $grayDark !important;
  color: $grayDark !important;

  &::after {
    border-left-color: $grayDark !important;
  }

  &::before {
    border-top-color: $grayDark !important;
  }
}
</style>
