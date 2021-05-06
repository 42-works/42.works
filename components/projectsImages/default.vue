<template lang="pug">
  .wrapper(:class="name")
    .image
      img(@click="closePreview" :src="require(`~/static/images/${name}/image.jpg`)" :alt="name")
    //- ImagePreview(v-if="previewOpen" @closePopup="closePreview" :name="name" ref="imagePreviev")
</template>

<script>
import ImagePreview from '~/components/ImagePreview'

export default {
  name: 'Default',

  props: [
    'name'
  ],

  components: {
    ImagePreview
  },

  data() {
    return {
      previewOpen: false
    }
  },

  methods: {
    closePreview() {
      this.previewOpen = !this.previewOpen
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    border-top: 1px solid #EDECE9;
  }

  .image {
    max-width: 1920px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .palmyra .image {
    height: 942px;
  }

  .hammer .image {
    height: 2785px;
  }

  .iamip .image {
    height: 2057px;
  }

  .iamip .image {
    height: 2057px;
  }

  .forge .image {
    height: 3112px;
  }

  .chisel .image {
    height: 1582px;
  }

  .statebird .image {
    height: 2784px;
  }

  .uptime .image {
    height: 2885px;
  }

  .bitcannery .image {
    height: 1433px;
  }

  .smartomato .image {
    height: 2894px;
  }

  .image img {
    width: 100%;
    display: block;
    object-fit: cover;
    height: 100%;
  }

  .chisel,
  .statebird,
  .uptime {
    border-top: none;
  }

  @media (max-width: 1024px) {
    .wrapper .image {
      height: auto;
    }

    .image img {
      width: 184%;
      margin-left: -41%;
      object-fit: contain;
    }

    .sicilia img {
      width: 121%;
      margin-left: -11%;
    }

    .matter img {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
