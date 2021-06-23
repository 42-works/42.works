<template lang="pug">
  .page-gradient.team
    .gradient
    .content
      .team-block
        .gradient-container
          .text-block
            h2.title
              | Our team
            .text
              | 42 was built to be different. An alternative to the large agency. We are a collective of design-obsessed digital junkies, based in Rostov-on-Don. Our focus is to create new interactive experiences for users; striking the perfect balance between usability and aesthetic. We seek to push creative and developmental boundaries, while bringing ambitious ideas to life.
      .gradient-container.team-container
        .team-list
          ul
            li.team-member(v-for="member in team")
              Member(:member="member")
      Mail
</template>

<script>
import Member from "~/components/Member";
import Mail from "~/components/Mail";

export default {
  name: "Team",
  layout: "item-page",

  components: {
    Member,
    Mail
  },

  data() {
    return {
      team: [
        {
          image: "boris.jpg",
          name: "Boris Adimov",
          position: "CTO"
        },
        {
          image: "eugene.jpg",
          name: "Eugene Taktarov",
          position: "Teamlead, Fullstack Developer"
        },
        {
          image: "sergey.jpg",
          name: "Sergey Paluy",
          position: "CMO"
        },
        {
          image: "vitaliy.jpg",
          name: "Vitaliy Galaychuk",
          position: "Middle Backend Developer"
        },
        {
          image: "artyom.jpg",
          name: "Artyom Irza",
          position: "Senior Backend Developer"
        },
        {
          image: "rita.jpg",
          name: "Margarita Popova",
          position: "UI/UX Lead"
        },
        {
          image: "eugenia.jpg",
          name: "Evgenia Skorik",
          position: "Designer"
        },
        {
          image: "ivan.jpg",
          name: "Ivan Markov",
          position: "Middle Frontend Developer"
        },
        {
          image: "denis.jpg",
          name: "Denis Pelevin",
          position: "Middle Frontend Developer"
        },
        {
          image: "arseniy.jpg",
          name: "Arseniy Adimov",
          position: "Middle Backend Developer"
        },
        {
          image: "igor.jpg",
          name: "Igor Bostan",
          position: "Middle Backend Developer"
        },
        // {
        //   image: 'eugenia.jpg',
        //   name: 'Emil Karamanov',
        //   position: 'Middle Frontend Developer'
        // },
        {
          image: "kirill.jpg",
          name: "Kirill Zhaborovskiy",
          position: "Middle Frontend Developer"
        },
        {
          image: "dmitriy.jpg",
          name: "Dmitriy Nichyushkin",
          position: "Backend Developer"
        },
        {
          image: "viktor.jpg",
          name: "Victor Ivanov",
          position: "Frontend Developer"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding-top: 200px;
}

.team-block {
  padding-bottom: 100px;
  border-bottom: 0.5px solid #dbdbdb;
}

.title {
  margin-bottom: 20px;
  font-size: 40px;
  line-height: 56px;
  color: #000000;
}

.text {
  font-size: 21px;
  line-height: 40px;
  letter-spacing: 0.01em;
  color: rgba(0, 1, 5, 0.6);
  font-weight: lighter;
}

.team-list {
  padding-top: 94px;
}

.team-list ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  width: 100%;
}

.team-container {
  padding-right: 198px;
}

.team-member {
  display: inline-block;
  margin-bottom: 55px;
}

@media (max-width: 1024px) {
  .team-container {
    padding-left: 24px;
    padding-right: 24px;
  }

  .team-list ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content {
    padding-top: 60px;
  }

  .team-block {
    padding-bottom: 60px;
  }

  .team-list {
    padding-top: 60px;
    margin-bottom: 60px;
  }

  .team-list ul {
    justify-content: space-around;
  }

  .title {
    margin-bottom: 16px;
    font-size: 31px;
    line-height: 46px;
  }

  .text {
    font-size: 18px;
    line-height: 32px;
  }
}

@media (max-width: 560px) {
  .team-list ul {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
