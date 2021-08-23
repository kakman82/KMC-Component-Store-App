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
      <div class="columns">
        <div class="column">
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <b-field
              label="Ad"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input v-model="firstName"></b-input>
            </b-field>
          </ValidationProvider>
        </div>
        <div class="column">
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <b-field
              label="Soyad"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input v-model="lastName"></b-input>
            </b-field>
          </ValidationProvider>
        </div>
      </div>
      <ValidationProvider rules="required|email" v-slot="{ errors, valid }">
        <b-field
          label="E-posta"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="email" type="email"> </b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required|passwordLength"
        v-slot="{ errors, valid }"
      >
        <b-field
          label="Şifre"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input
            v-model="password"
            type="password"
            password-reveal
            minlength="6"
            maxlength="10"
          >
          </b-input>
        </b-field>
      </ValidationProvider>
      <b-button
        class="mt-6 is-primary has-text-weight-bold"
        expanded
        @click="handleSubmit(submit)"
        >Kayıt Ol</b-button
      >
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import lodash from '../../node_modules/lodash-es'
import Cookie from 'js-cookie'

export default {
  name: 'SignupForm',
  components: { ValidationObserver, ValidationProvider },
  emits: ['closeAuthFormModal'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      serverErrMsg: '',
    }
  },

  methods: {
    async submit() {
      const reqUserData = {
        // https://stackoverflow.com/questions/38084396/lodash-title-case-uppercase-first-letter-of-every-word
        firstName: lodash.startCase(lodash.camelCase(this.firstName)),
        lastName: lodash.startCase(lodash.camelCase(this.lastName)),
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
            sameSite: 'strict',
          })
          const decoded = jwtDecode(response.token)
          // user bilgilerine serverdan gelen token bilgisini de ekleyip store gönderme
          response.user.exp = decoded.exp

          this.$store.commit('setUser', response.user)

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
    },
  },
}
</script>
