<template lang="pug">
  .conditions
    .main-image
      img(src="../assets/images/eugen.png" alt="main-img")
    p.text
      | Сейчас мы проводим небольшой набор в команду с максимально гибкими условиями:  
    .text_wrapper
      .text-item
        .title
          | Парт тайм
        .description
          |  для тех, кто еще учится и хочет познакомиться с индустрией     
      .text-item
        .title
          | Фулл тайм
        .description
          |  для тех, кто решил не писать диплом и уже имеет опыт работы.  
    p.text
      |  Если тебе интересны веб технологии и кроссплатформенная мобильная разработка – пиши     
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .text {
    max-width: 384px;
    font-weight: normal;
    font-size: 16px;
    line-height: 170%;
    text-align: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    margin: 37px auto;
  }
  .text_wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .title {
      font-weight: normal;
      font-size: 24px;
      line-height: 170%;
      letter-spacing: 0.01em;
      color: #FFFFFF;
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
</style>
