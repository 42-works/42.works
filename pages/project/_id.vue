<template lang="pug">
  .page.project
    .container
      h1.title
        | {{ project.title }}
      .block(v-for="text in project.textBlocks" :key="text.text")
        .subtitle(v-if="text.title")
          | {{ text.title }}
        .text
          | {{ text.text }}

      .block.project-footer
        .project-footer__left
          .subtitle
            | Services
          .text(v-for="service in project.services")
            | {{ service }}
        .project-footer__right(v-if="project.live")
          .subtitle
            | Live
          a.live-link(:href="`https://${project.live}`" target="_blank")
            | {{ project.live }}
    .project-images
      component(:is="loader" :name="project.name")
    .nav-bar__wrapper
      NavBar(:currentProject="project" :projects="projects")


</template>

<script>
import projects from '~/projects-config/config'
import NavBar from '~/components/NavBar'

export default {
  name: 'project',
  layout: 'item-page',

  components: {
    NavBar
  },

  asyncData (context) {
    return {
      project: projects.filter(project => project.id === Number(context.route.params.id))[0]
    }
  },

  data() {
    return {
      projects: projects,
      project: null
    }
  },

  computed: {
    loader() {
      if (!this.project.imagesComponent) {
        return null
      }
      return () => import(`~/components/projectsImages/${this.project.imagesComponent}`)
    },
  },
}
</script>

<style lang="scss" scoped>
  .project {
    padding-top: 120px;
  }

  .container {
    max-width: 716px;
    width: 100%;
    padding-bottom: 106px;
  }

  .title {
    margin-bottom: 12px;

    font-size: 40px;
    line-height: 56px;
    letter-spacing: 0.01em;
  }

  .subtitle {
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 40px;
    letter-spacing: 0.01em;
    color: #000105;
  }

  .text {
    font-weight: lighter;
    font-size: 21px;
    line-height: 40px;
    letter-spacing: 0.01em;

    color: rgba(0, 1, 5, 0.6);
  }

  .live-link {
    position: relative;

    font-size: 21px;
    line-height: 40px;
    letter-spacing: 0.01em;
    font-weight: lighter;

    color: #3431DC;
    text-decoration: none;

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: -31px;
      display: block;
      width: 24px;
      height: 24px;
      background: url('../../assets/images/live-icon.svg') no-repeat center/contain;
    }
  }

  .block {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .project-footer {
    display: flex;
    flex-flow: row nowrap;
    padding-top: 40px
  }

  .project-footer__left {
    max-width: 372px;
    width: 100%;
  }

  .project-footer__right {
    max-width: 256px;
    width: 50%;
  }

  .project-images {
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .container {
      padding-bottom: 60px;
    }

    .title {
      font-size: 48px;
      line-height: 56px;
    }

    .text {
      font-size: 18px;
      line-height: 32px;
    }

    .project-image {
      margin-top: 60px;
    }

    .block {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .subtitle {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 10px;
      font-weight: 600;
    }
  }

  @media (max-width: 600px) {
    .project-footer {
      flex-flow: column nowrap;
    }

    .project-footer__right {
      padding-top: 60px;
      width: 100%;
    }

    .live-link {
      padding-left: 28px;

      &::before {
        left: -3px;
      }
    }
  }
</style>
