<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <section>
      <b-message
        v-if="serverErrMsg"
        type="is-danger"
        has-icon
        icon-size="is-medium"
      >
        {{ serverErrMsg }}
      </b-message>
      <ValidationProvider rules="required|email" v-slot="{ errors, valid }">
        <b-field
          label="E-posta"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="email" type="email"> </b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider rules="required" v-slot="{ errors, valid }">
        <b-field
          label="Şifre"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="password" type="password" password-reveal>
          </b-input>
        </b-field>
      </ValidationProvider>

      <b-button
        tag="router-link"
        :to="{ path: '/forgotPassword' }"
        type="is-ghost"
        class="pl-0"
        >Şifremi unuttum!</b-button
      >
      <b-button
        class="mt-3 is-primary has-text-weight-bold"
        expanded
        :loading="isLoading"
        @click="handleSubmit(submit)"
        >Giriş Yap</b-button
      >
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

export default {
  name: 'LoginForm',
  components: { ValidationObserver, ValidationProvider },
  emits: ['closeAuthFormModal', 'call-create-order'],
  data() {
    return {
      email: '',
      password: '',
      serverErrMsg: '',
      isLoading: false,
    }
  },

  methods: {
    async submit() {
      const reqUserData = {
        email: this.email.toLowerCase(),
        password: this.password,
      }
      // server error message kısmına consol dan ulaşmak için response try catch bloğu dışında tanımladım ki, catch içinde ulaşabileyim yoksa response not defined hatası alıyorum
      let response = ''
      try {
        this.isLoading = true
        response = await this.$axios.$post('/auth/login', reqUserData)
        if (!response.success) return (this.serverErrMsg = response.message)
        if (response.success) {
          Cookie.set('access_token', response.token, {
            sameSite: 'strict',
          })
          const decoded = jwtDecode(response.token)
          // user bilgilerine serverdan gelen token bilgisini de ekleyip store gönderme
          response.user.exp = decoded.exp

          this.$store.commit('setUser', response.user)

          // eğer kullanıcı ana sayfadaki giriş yap butonu ile login oldu ise ana sayfaya yönlendir
          // değilse zaten sepet sayfasından login olmuş demektir ve direkt checkout sayfasında yönlendir
          //console.log(this.$route)
          if (this.$route.path === '/cart') {
            // bu emit sepet sayfasından login olunduğu zaman modalın kapatılması için
            this.$emit('closeAuthFormModal')
            // CarSummary.vue daki create orderın tekrar çağrılması bu sayede amountlar store a set edilip /checkout sayfasına oto yönledirecek
            this.$emit('call-create-order')
          } else {
            this.$router.push('/')
          }
          this.isLoading = false

          this.$buefy.toast.open({
            duration: 5000,
            message: response.message,
            type: 'is-success',
          })

          this.email = ''
          this.password = ''
          this.serverErrMsg = ''
        }
      } catch (error) {
        this.isLoading = false
        // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
        if (error.response) {
          //console.log(error.response)
          return (this.serverErrMsg = error.response.data.message)
        } else {
          this.serverErrMsg = error.message
          console.log(error)
        }
      }
    },
  },
}
</script>
