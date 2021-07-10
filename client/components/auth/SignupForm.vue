<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Ad">
          <b-input
            v-model="firstName"
            required
            validation-message="Lütfen giriş yapınız."
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Soyad">
          <b-input
            v-model="lastName"
            required
            validation-message="Lütfen giriş yapınız."
          ></b-input>
        </b-field>
      </div>
    </div>

    <b-field label="E-posta">
      <b-input
        v-model="email"
        type="email"
        required
        validation-message="Lütfen geçerli bir e-posta adresi giriniz."
      >
      </b-input>
    </b-field>

    <b-field label="Şifre">
      <b-input
        v-model="password"
        type="password"
        password-reveal
        required
        minlength="6"
        maxlength="10"
        validation-message="En az 6 en çok 10 karakter olmalıdır."
      >
      </b-input>
    </b-field>
    <b-button
      class="mt-6 is-primary has-text-weight-bold"
      expanded
      :disabled="checkFormValidation() ? false : true"
      @click="userSignUp"
      >Kayıt Ol</b-button
    >
  </section>
</template>

<script>
import lodash from '../../node_modules/lodash-es'

export default {
  name: 'SignupForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      formValid: false,
    }
  },

  methods: {
    checkFormValidation() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.password ||
        this.password.length < 6 ||
        this.password.length > 10
      ) {
        return false
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
        return false
      }

      return true
    },
    async userSignUp() {
      if (this.checkFormValidation) {
        const reqUserData = {
          firstName: lodash.capitalize(this.firstName),
          lastName: lodash.capitalize(this.lastName),
          email: this.email.toLowerCase(),
          password: this.password,
        }
        console.log('request data: ', reqUserData)

        try {
          const response = await this.$axios.$post('/auth/signup', reqUserData)

          if (response.success) {
            this.$buefy.toast.open({
              duration: 2000,
              message: response.message,
              type: 'is-success',
            })

            this.$router.push('/placeorder')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
