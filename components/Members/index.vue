<template lang="pug">
  .member
    .image(
      id="gl"
      data-imageOriginal="images/team/ball.jpg"
      data-imageDepth="images/team/ball-map.jpg"
      data-horizontalThreshold="25"
      data-verticalThreshold="20"
    )

    .text
      .name
        | {{ member.name }}
      .position
        | {{ member.position }}
</template>

<script>
if (process.client) {
  var Sketch = require('./sketch').default

}

export default {
  name: 'Member',

  props: {
    member: Object
  },
  mounted() {
    if (process.client) {
      new Sketch()
    }

  }
}
</script>

<style lang="scss" scoped>


  .member {
    text-align: center;
    max-width: 175px;
    width: 100%;

  }

  .image {
    width: 161px;
    height: 161px;
    margin-bottom: 7px;

    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  #gl {
    width: 161px;
    height: 161px;
  }

  canvas {
    display: block;
  }

  .name {
    margin-bottom: 3px;

    color: #3431DC;
    font-size: 16px;
    line-height: 28px;
    text-align: center;
    text-transform: uppercase;
  }

  .position {
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    color: #000105;
  }

  @media (max-width: 560px) {
    .member {
      margin-left: auto;
      margin-right: auto;
    }

    .image img {
      width: 180px;
      height: 180px;
    }
  }
</style>
