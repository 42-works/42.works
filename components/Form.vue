<template lang="pug">
  form.form(@submit="submitForm")
    .form__wrapper
      .form__row
        .input-wrapper(:class="{active: name.length > 0}")
          label.label
            | Name
          input.form__input(
            type="text"
            name="name"
            v-model="name"
            v-validate="'required'"
            :class="{'is-danger': errors.has('name')}"
            @input="checkFormIsFull"
          )
          span(v-show="errors.has('name')" class="help is-danger") {{ errors.first('name') }}
        .input-wrapper.input-wrapper__right(:class="{active: email.length > 0}")
          label.label
            | Email
          input.form__input(
            type="text"
            name="email"
            v-model="email"
            v-validate="'required|email'"
            :class="{'is-danger': errors.has('email')}"
            @input="checkFormIsFull"
          )
          span(v-show="errors.has('email')" class="help is-danger is-danger-second") {{ errors.first('email') }}
      .form__row
        .input-wrapper.input-wrapper__textarea(:class="{active: message.length > 0}")
          label.label
            | Your message
          textarea.form__input.form__input--textarea(
            name="message"
            v-model="message"
            v-validate="'required'"

            :class="{'is-danger': errors.has('message')}"
            @input="checkFormIsFull"
          )
          span(v-show="errors.has('message')" class="help is-danger") {{ errors.first('message') }}
      .form__row
        button.form__button(:class="{disable: !formIsFull}" @click="submitForm") Send message
</template>

<script>
export default {
  data() {
    return {
      formIsFull: false,
      name: '',
      email: '',
      message: ''
    }
  },

  methods: {
    checkFormIsFull() {
      this.formIsFull = Object.keys(this.fields).some(key => {
        return this[key]
      })
    },

    submitForm(e) {
      e.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.postForm();
          return;
        }

        console.warn('Not valid')
      });
    },

    clearForm() {
      this.name = ''
      this.email = ''
      this.message = ''
    },
    postForm() {
      const createHtmlForEmail = () => {
        return `<div>
          <div>
            name: <b>${this.name}</b>
          </div>
          <div>
            email: <b>${this.email}</b>
          </div>
          <div>
            message: <b>${this.message}</b>
          </div>
        </div>`
      }

      const letterData = {
        to: 'pelevin.d.y@gmail.com',
        subject: '42.works',
        text: 'yo',
        html: createHtmlForEmail()
      }

      fetch('https://api.42.works/mailer', {
        method: 'POST',
        body: JSON.stringify(letterData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('response', response)
        this.$emit('toggleModal', response.status)
        this.clearForm()
      })
      .catch((err) => {
        console.err('err', err)
        this.$emit('toggleModal', response.status)
        this.clearForm()
      })
    },
  }
}
</script>

<style scoped lang="scss">

.form {
  &__row {
    position: relative;
    margin-bottom: 64px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__input {
    height: 64px;
    width: 100%;
    border: 0.7px solid $grayDark;
    padding: 16px;
    box-sizing: border-box;
    background-color: $white;
    font-size: 21px;
    color: $black;
    letter-spacing: 0.01em;
    outline: none;
    transition: 0.2s;
    &:focus {
      border: 2px solid $black;
      box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.25);
    }
    &--textarea {
      padding-top: 14px;
      width: 100%;

      font-family: bio-sans;
      resize: vertical;
      line-height: 30px;
    }
    &::placeholder {
      opacity: 0.4;
    }
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

    border: 2px solid $black;
    background-color: $white;
    cursor: pointer;
    box-sizing: border-box;

    transition: 0.2s;

    &:before,
    &:after {
      content: '';
      position: absolute;
      z-index: -1;
    }

    &:before {
      bottom: -10px;
      left: -2px;
      width: 192px;
      height: 8px;
      border-top: 8px solid $black;
      border-bottom: none;
      border-left: 8px solid $white;
      box-sizing: border-box;
      transition: border-top .2s;
    }

    &:after {
      top: -2px;
      right: -10px;
      height: 49px;
      width: 8px;
      border-left: 8px solid $black;
      border-bottom: none;
      border-top: 8px solid $white;
      transition: border-left .2s;
    }

    &:hover {
      background-color: #3431DC;
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
}

.label {
  z-index: 10;
  position: absolute;
  left: 16px;
  top: 13px;
  font-size: 22px;

  font-family: bio-sans;
  font-size: 22px;
  line-height: 40px;
  letter-spacing: 0.01em;
  pointer-events: none;
  transition: all 0.1s linear;
  color: $grayTransparent;
  opacity: 0.8;
}

.input-wrapper.active .label {
  top: -33px;
  left: 0;
  font-size: 16px;
}

.form__row {
  display: flex;
  flex-flow: row wrap;


}

.input-wrapper {
  position: relative;
  width: calc(50% - 8px);
}

.input-wrapper__right {
  margin-left: 16px;
}

.input-wrapper.active .form__input {
  border: 2px solid $black;
  box-shadow: inset 2px 2px 0px rgba(0, 0, 0, 0.25);
  background: #ffffff;
}

.form__button {
  color: #000000;
}

.form__button:hover {
  border: 2px solid $black;
  color: $white;

  &::before {
    border-top: 8px solid $black;
  }

  &::after {
    border-left: 8px solid $black;
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
  bottom: -16px;
}

.input-wrapper__textarea {
  width: 100%;
}

@media (max-width: 768px) {
  .form__row {
    margin-bottom: 36px;
    flex-direction: column;
  }

  .input-wrapper {
    width: 100%;
  }

  .input-wrapper__right {
    margin-top: 36px;
    margin-left: 0;
  }

  .label {
    left: 9px;
    top: 5px;

    font-size: 18px;
  }

  .form__input {
    width: 100%;
    height: 48px;
    padding: 8px;
    border-radius: 0;

    font-size: 18px;
  }

  .form__input--textarea {
    padding-top: 6px;
  }

  .form__input + .help.is-danger {
    top: 49px;
    bottom: auto;

    font-size: 12px;
  }

  .help.is-danger-second {
    width: 100%;
  }

  .form__input-second {
    margin-left: 0;
  }

  .help {
    top: 49px;
    font-size: 12px;
  }
}
</style>
