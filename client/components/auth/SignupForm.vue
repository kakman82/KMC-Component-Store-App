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
    <div class="columns">
      <div class="column">
        <b-field label="Ad">
          <b-input
            v-model="firstName"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Soyad">
          <b-input
            v-model="lastName"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
    </div>

    <b-field label="E-posta">
      <b-input
        v-model="email"
        type="email"
        required
        validation-message="Geçerli bir e-posta adresi girilmelidir."
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
import Cookie from 'js-cookie'

export default {
  name: 'SignupForm',
  emits: ['closeAuthFormModal'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      formValid: false,
      serverErrMsg: '',
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
      // check if it is email or not
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
        // server error message kısmına consol dan ulaşmak için response try catch bloğu dışında tanımladım ki,
        // catch içinde ulaşabileyim yoksa response not defined hatası alıyorum
        let response = ''
        try {
          response = await this.$axios.$post('/auth/signup', reqUserData)

          if (response.success) {
            Cookie.set('access_token', response.token, {
              expires: 7,
              sameSite: 'strict',
            })
            // user bilgilerini store gönderme
            this.$store.commit('setUser', {
              id: response.user._id,
              firstName: response.user.firstName,
              lastName: response.user.lastName,
              email: response.user.email,
              role: response.user.role,
            })

            this.$buefy.toast.open({
              duration: 5000,
              message: response.message,
              type: 'is-success',
            })

            // sipariş sayfasına yönlendirme
            this.$router.push('/checkout')
            // form alanlarının temizlenmesi;
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.password = ''
            this.serverErrMsg = ''

            // modal dialog form kapatılması
            this.$emit('closeAuthFormModal')
          }
        } catch (error) {
          // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
          this.serverErrMsg = error.response.data.messageTR || error
          console.log(error)
        }
      }
    },
  },
}
</script>
