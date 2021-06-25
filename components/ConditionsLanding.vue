<template lang="pug">
  .conditions
    .top-title
      | Наш стек
    .image-list
      .image-item
        img.icon(:src="require(`../assets/images/landing/react.svg`)")
        .icon-text
          | React
      .image-item
        img.icon(:src="require(`../assets/images/landing/vue.svg`)")
        .icon-text
          | Vue
      .image-item
        img.icon(:src="require(`../assets/images/landing/ruby.svg`)")
        .icon-text
          | Ruby
      .image-item
        img.icon(:src="require(`../assets/images/landing/elixir.svg`)")
        .icon-text
          | Elixir
      .image-item
        img.icon(:src="require(`../assets/images/landing/node.png`)")
        .icon-text
          | Node
      .image-item
        img.icon(:src="require(`../assets/images/landing/solidity.svg`)")
        .icon-text
          | Solidity
    .text.text-after-stack
      | Мы используем последние технологии, и не засиживаемся в фабриках фабрик энтерпрайз легаси. Работаем по принципу "клиент не всегда прав", культивируем здоровую культуру труда и делимся нашим опытом с локальным комьюнити.
    .main-image
      Star
      img(src="../assets/images/eugen.png" class="eugen-img" alt="main-img")
    .text.text-after-photo
      | Сейчас мы проводим небольшой набор в команду с максимально гибкими условиями:
    .text_wrapper
      .text-item
        .title
          | Парт тайм
        .description
          |  для тех, кто еще учится и хочет познакомиться с индустрией
      .text-item.line
      .text-item
        .title
          | Фулл тайм
        .description
          |  для тех, кто решил не писать диплом и уже имеет опыт работы.
    .text.text-after-item
      |  Если тебе интересны веб технологии и кроссплатформенная мобильная разработка – пиши
    .eye
      Eye
</template>

<script>
import Star from '~/assets/images/star.svg?inline'
import Eye from '~/assets/images/eye.svg?inline'

export default {
  components: {
    Star,
    Eye
  },
}
</script>

<style lang="scss">
  .top-title {
    font-size: 32px;
    line-height: 44px;
    letter-spacing: 0.01em;
    text-align: center;
  }
  .image-list {
    display: flex;
    margin-top: 55px;
  }
  .image-item {
    display: flex;
    flex-direction: column;
  }
  .icon {
    margin: 0 20px;
  }
  .icon-text {
    margin-top: 30px;
    font-size: 13px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.5);
  }
  .text {
    font-weight: normal;
    font-size: 16px;
    line-height: 170%;
    text-align: center;
    letter-spacing: 0.01em;
    margin-left: auto;
    margin-right: auto;
    padding-left: 26px;
    padding-right: 26px;
  }
  .text-after-stack {
    max-width: 720px;
    margin-top: 60px;
  }
  .text-after-photo {
    max-width: 450px;
    margin-top: 88px;
  }
  .text-after-item {
    max-width: 460px;
    margin-top: 57px;
  }
  .text_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    margin-top: 37px;
    .title {
      font-weight: normal;
      font-size: 24px;
      line-height: 170%;
      letter-spacing: 0.01em;
    }
    .description {
      font-weight: 300;
      font-size: 14px;
      line-height: 170%;
      letter-spacing: 0.01em;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 16px;
    }
  }
  .text-item {
    max-width: 253px;
  }

  .text-item.line {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0px;
    height: 58px;
    border: 1px solid #A1A1A1;
  }

  .main-image {
    position: relative;
    margin-top: 60px;
    .eugen-img {
      position: absolute;
      top: 18.8%;
      right: 14.5%;
    }
  }
  .eye {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 88px;
  }

  @media(max-width: 768px) {
    .top-title {
      font-size: 24px;
      line-height: 33px;
    }
    .image-list {
      margin-top: 20px;
      flex-flow: row wrap;
    }
    .image-item {
        margin-top: 36px;
    }
    .main-image {
      max-width: 468px;
      svg {
        width: 100%
      }
      img {
        width: 100%;
      }
    }
    .text_wrapper {
      flex-direction: column;
    }
    .text-item.line {
      transform: rotate(90deg);
    }
  }
   @media(max-width: 358px) {
     .image-list {
       justify-content: center;
     }
   }
</style>
