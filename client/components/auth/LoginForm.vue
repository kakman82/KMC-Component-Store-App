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
        validation-message="Lütfen e-posta adresinizi giriniz."
      >
      </b-input>
    </b-field>

    <b-field label="Şifre">
      <b-input
        v-model="password"
        type="password"
        password-reveal
        required
        validation-message="Lütfen şifrenizi giriniz."
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
          email: this.email.toLowerCase(),
          password: this.password,
        }
        // server error message kısmına consol dan ulaşmak için response try catch bloğu dışında tanımladım ki, catch içinde ulaşabileyim yoksa response not defined hatası alıyorum
        let response = ''
        try {
          response = await this.$axios.$post('/auth/login', reqUserData)

          if (response.success) {
            this.$auth.loginWith('local', { data: reqUserData })

            this.$buefy.toast.open({
              duration: 5000,
              message: response.message,
              type: 'is-success',
            })
            // eğer kullanıcı ana sayfadaki giriş yap butonu ile login oldu ise ana sayfaya yönlnedir değilse zaten sepet sayfasından login olmuş demektir ve direkt placeorder sayfasında yönlendir
            //console.log(this.$route)
            if (this.$route.path === '/cart') {
              this.$router.push('/placeorder')
            } else {
              this.$router.push('/')
            }
            // bu emit sepet sayfasından login olunduğu zaman modalın kapatılması için
            this.$emit('closeAuthFormModal')

            this.email = ''
            this.password = ''
            this.serverErrMsg = ''
          }
        } catch (error) {
          // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
          this.serverErrMsg = error.response.data.message
          //console.log(error.response)
        }
      }
    },
  },
}
</script>
