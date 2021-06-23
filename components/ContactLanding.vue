<template lang="pug">
.contact
  form.form(@submit="submitForm")
    .input-wrapper
      label.label
        | Как тебя зовут?
      input.form__input(
        type="text",
        placeholder="Name",
        name="name",
        v-model="name",
        v-validate="'required'",
        :class="{ 'is-danger': errors.has('name') }",
        @input="checkFormIsFull"
      )
      span.help.is-danger(v-show="errors.has('name')") {{ errors.first('name') }}
    .input-wrapper
      label.label
        | Предпочитаемый способ связи
        input.form__input(
          type="text",
          placeholder="Telegram, e-mail or something",
          name="contact",
          v-model="contact",
          v-validate="'required'",
          :class="{ 'is-danger': errors.has('contact') }",
          @input="checkFormIsFull"
        )
      span.help.is-danger(v-show="errors.has('contact')") {{ errors.first('contact') }}
    .input-wrapper
      .input-wrapper__textarea
        label.label
          | Чем тебе интересно заниматься и какой у тебя опыт работы?
        textarea.form__input.form__input--textarea(
          name="message",
          placeholder="Your message",
          v-model="message",
          v-validate="'required'",
          :class="{ 'is-danger': errors.has('message') }",
          @input="checkFormIsFull"
        )
        span.help.is-danger(v-show="errors.has('message')") {{ errors.first('message') }}
    .button-wrapper
      button.form__button(
        :class="{ disable: isButtonDisabled() }",
        @click="submitForm"
      ) Send message
</template>

<script>
export default {
  data() {
    return {
      formIsFull: false,
      name: "",
      contact: "",
      message: "",
      isFormSending: false,
    };
  },
  methods: {
    isButtonDisabled() {
      if (!this.formIsFull) return true;
      if (this.isFormSending) return true;
      return false;
    },
    checkFormIsFull() {
      this.formIsFull = Object.keys(this.fields).every((key) => {
        return this[key];
      });
    },
    submitForm(e) {
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.postForm();
          return;
        }

        console.warn("Not valid");
      });
    },
    clearForm() {
      this.name = "";
      this.contact = "";
      this.message = "";
    },
    postForm() {
      this.isFormSending = true;

      const createHtmlForEmail = () => {
        return `<div>
          <div>
            name: <b>${this.name}</b>
          </div>
          <div>
            telegram, e-mail or something: <b>${this.email}</b>
          </div>
          <div>
            message: <b>${this.message}</b>
          </div>
        </div>`;
      };

      const letterData = {
        to: "boris@adimov.ru",
        subject: "42.works contact form",
        text: "yo",
        html: createHtmlForEmail(),
      };

      fetch("https://api.42.works/mailer", {
        method: "POST",
        body: JSON.stringify(letterData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          // console.log('response', response)
          this.isFormSending = false;
          this.$emit("toggleModal", response.status);
          this.clearForm();
        })
        .catch((err) => {
          console.err("err", err);
          this.isFormSending = false;
          this.$emit("toggleModal", response.status);
          this.clearForm();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__input {
    height: 60px;
    width: 100%;
    border: 0.5px solid #868487;
    padding: 14px 16px;
    box-sizing: border-box;
    background-color: #141414;
    line-height: 40px;
    font-size: 16px;
    color: #ffffff;
    outline: none;
    &--textarea {
      min-height: 120px;
    }
    &::placeholder {
      opacity: 0.3;
      color: #ffffff;
    }
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
  }
  &__button {
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

    color: #ffffff;
    border: 2px solid $white;
    background-color: $black;
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
      border-top: 8px solid $white;
      border-bottom: none;
      border-left: 8px solid $black;
      box-sizing: border-box;
      transition: border-top 0.2s;
    }

    &:after {
      z-index: 10;
      top: -2px;
      right: -10px;
      height: 49px;
      width: 8px;
      border-left: 8px solid $white;
      border-bottom: none;
      border-top: 8px solid $black;
      transition: border-left 0.2s;
    }

    &:active {
      top: 8px;
      left: 8px;
      &:before {
        bottom: 0;
        left: 0;
        width: 0;
        border-left: none;
        border-top: none;
      }
      &:after {
        right: 0;
        top: 0;
        height: 0;
        border-left: none;
        border-top: none;
      }
    }
  }
  .label {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: 0.01em;
  }
  .input-wrapper {
    position: relative;
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
    &__textarea {
      margin-bottom: 29px;
    }
  }
  .disable {
    pointer-events: none;
    border-color: $grayDark;
    color: $grayDark;

    &::after {
      border-left-color: $grayDark;
    }

    &::before {
      border-top-color: $grayDark;
    }
  }
  .is-danger {
    color: $red;
  }
  .help.is-danger {
    width: 130%;
    font-size: 14px;
  }
  .help {
    position: absolute;
    left: 0;
    bottom: -17px;
  }
}
</style>

