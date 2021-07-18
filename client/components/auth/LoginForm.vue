<template>
  <section>
    <b-message
      v-if="serverErrMsg"
      type="is-danger"
      has-icon
      icon-size="is-medium"
    >
      {{ serverErrMsg }}
    </b-message>

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
      @click="userLogin"
      >Giriş Yap</b-button
    >
  </section>
</template>

<script>
import lodash from '../../node_modules/lodash-es'

export default {
  name: 'LoginForm',
  emits: ['closeAuthFormModal'],
  data() {
    return {
      email: '',
      password: '',
      formValid: false,
      serverErrMsg: '',
    }
  },

  methods: {
    checkFormValidation() {
      if (!this.email || !this.password) {
        return false
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
        return false
      }
      return true
    },
    async userLogin() {
      if (this.checkFormValidation) {
        const reqUserData = {
          firstName: lodash.capitalize(this.firstName),
          lastName: lodash.capitalize(this.lastName),
          email: this.email.toLowerCase(),
          password: this.password,
        }
        // server error message kısmına consol dan ulaşmak için response try catch bloğu dışında tanımladım ki, catch içinde ulaşabileyim yoksa response not defined hatası alıyorum
        let response = ''
        try {
          response = await this.$axios.$post('/auth/signup', reqUserData)

          if (response.success) {
            this.$buefy.toast.open({
              duration: 5000,
              message: response.message,
              type: 'is-success',
            })
            this.$emit('closeAuthFormModal')
            this.$router.push('/placeorder')
          }
        } catch (error) {
          // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
          this.serverErrMsg = error.response.data.messageTR
          console.log(error.response)
        }
      }
    },
  },
}
</script>
