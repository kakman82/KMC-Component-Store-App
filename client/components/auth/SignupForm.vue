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
        :loading="isLoading"
        @click="handleSubmit(submit)"
        >Kayıt Ol</b-button
      >
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { capitalizeEachWord } from '../../plugins/formatHelper'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

export default {
  name: 'SignupForm',
  components: { ValidationObserver, ValidationProvider },
  emits: ['closeAuthFormModal', 'call-create-order'],
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      serverErrMsg: '',
      isLoading: false,
    }
  },

  methods: {
    async submit() {
      const reqUserData = {
        firstName: capitalizeEachWord(this.firstName),
        lastName: capitalizeEachWord(this.lastName),
        email: this.email.toLowerCase(),
        password: this.password,
      }
      // server error message kısmına consol dan ulaşmak için response try catch bloğu dışında tanımladım ki,
      // catch içinde ulaşabileyim yoksa response not defined hatası alıyorum
      let response = ''
      try {
        this.isLoading = true
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
          this.isLoading = false
          // modal dialog form kapatılması
          this.$emit('closeAuthFormModal')
          // CarSummary.vue daki create orderın tekrar çağrılması bu sayede amountlar store a set edilip /checkout sayfasına oto yönledirecek
          this.$emit('call-create-order')

          // form alanlarının temizlenmesi;
          this.firstName = ''
          this.lastName = ''
          this.email = ''
          this.password = ''
          this.serverErrMsg = ''
        }
      } catch (error) {
        this.isLoading = false
        // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
        if (error.response) {
          return (this.serverErrMsg = error.response.data.messageTR)
        } else {
          this.serverErrMsg = error.message
          console.log(error)
        }
      }
    },
  },
}
</script>
