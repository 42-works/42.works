<template lang="pug">
.tetris(ref="tetris")
  div(:class="`el el-${index}`", v-for="index in 6", :ref="`el-${index}`")
    .square(:style="{ border: `2px solid ${color}` }")
    .square(:style="{ border: `2px solid ${color}` }")
    .square(:style="{ border: `2px solid ${color}` }")
    .square(:style="{ border: `2px solid ${color}` }")
</template>

<script>
const CREATE_EL_TIME = 2300;
const EL_HEIGHT = 136;

export default {
  props: {
    color: String,
  },

  data() {
    return {
      types: ["I", "L", "J", "O", "Z", "T"],
      transform: [0, 90, 180, 270],
      interval: null,
      leftOffset: null,
      lastLeftOffset: null,
      animationTimeSec: 0,
      containerHeight: 0
    };
  },

  mounted() {
    if (process.browser) {
      this.tetris = this.$refs.tetris;
      this.containerHeight = this.tetris.clientHeight;
      this.animationTimeSec = this.tetris.clientHeight / 1.1 / 60; // animation time seconds
      this.interval = setInterval(() => {
        this.createTetrisElem();
      }, CREATE_EL_TIME);
    }
  },

  destroyed() {
    clearInterval(this.interval);
  },

  methods: {
    createTetrisElem() {
      this.getLeftOffset();
      const el = this.$refs[
        `el-${this.getRandomInt(this.types.length - 1)}`
      ][0].cloneNode(true);
      el.style.transform = `rotate(${
        this.transform[this.getRandomInt(this.transform.length)]
      }deg)`;
      this.tetris.appendChild(el);

      setTimeout(() => {
        this.lastLeftOffset = this.leftOffset;
        el.style.cssText = `left: ${this.leftOffset}px; transition: top ${this.animationTimeSec}s linear; top: ${this.containerHeight}px`;
      }, 1000);
      setTimeout(() => {
        el.remove();
      }, this.animationTimeSec * 1000 + 1000); // animation time miliseconds
    },

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    },

    getLeftOffset() {
      this.leftOffset = this.getRandomInt(window.innerWidth);
      if (
        this.lastLeftOffset + 200 > this.leftOffset &&
        this.lastLeftOffset - 200 < this.leftOffset
      ) {
        return this.getLeftOffset();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$size: 34px;
$borderWidth: 2px;

.tetris {
  position: absolute;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.square {
  position: absolute;
  width: $size;
  height: $size;
  border: $borderWidth solid rgb(102, 100, 214);
}

.el {
  width: $size * 4;
  height: $size * 4;

  top: -($size * 4);
  position: absolute;
  overflow: hidden;
}

.el-1 {
  .square:nth-child(1) {
    left: 0;
    top: 0;
  }

  .square:nth-child(2) {
    left: 0;
    top: ($size - $borderWidth) * 1;
  }

  .square:nth-child(3) {
    left: 0;
    top: ($size - $borderWidth) * 2;
  }

  .square:nth-child(4) {
    left: 0;
    top: ($size - $borderWidth) * 3;
  }
}

.el-2 {
  .square:nth-child(1) {
    left: 0;
    top: 0;
  }

  .square:nth-child(2) {
    left: 0;
    top: ($size - $borderWidth) * 1;
  }

  .square:nth-child(3) {
    left: 0;
    top: ($size - $borderWidth) * 2;
  }

  .square:nth-child(4) {
    left: $size - $borderWidth;
    top: ($size - $borderWidth) * 2;
  }
}

.el-3 {
  .square:nth-child(1) {
    left: $size - $borderWidth;
    top: 0;
  }

  .square:nth-child(2) {
    left: $size - $borderWidth;
    top: ($size - $borderWidth) * 1;
  }

  .square:nth-child(3) {
    left: $size - $borderWidth;
    top: ($size - $borderWidth) * 2;
  }

  .square:nth-child(4) {
    left: 0;
    top: ($size - $borderWidth) * 2;
  }
}

.el-4 {
  .square:nth-child(1) {
    left: 0;
    top: 0;
  }

  .square:nth-child(2) {
    left: $size - $borderWidth;
    top: 0;
  }

  .square:nth-child(3) {
    left: 0;
    top: $size - $borderWidth;
  }

  .square:nth-child(4) {
    left: $size - $borderWidth;
    top: $size - $borderWidth;
  }
}

.el-5 {
  .square:nth-child(1) {
    left: 0;
    top: 0;
  }

  .square:nth-child(2) {
    left: $size - $borderWidth;
    top: 0;
  }

  .square:nth-child(3) {
    left: ($size - $borderWidth) * 2;
    top: $size - $borderWidth;
  }

  .square:nth-child(4) {
    left: $size - $borderWidth;
    top: $size - $borderWidth;
  }
}

.el-6 {
  width: $size * 3;
  height: $size * 2;

  .square:nth-child(1) {
    left: ($size - $borderWidth) * 2;
    top: $size - $borderWidth;
  }

  .square:nth-child(2) {
    left: $size - $borderWidth;
    top: 0;
  }

  .square:nth-child(3) {
    left: 0;
    top: $size - $borderWidth;
  }

  .square:nth-child(4) {
    left: $size - $borderWidth;
    top: $size - $borderWidth;
  }
}
</style>
