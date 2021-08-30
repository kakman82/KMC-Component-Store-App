<template>
  <section class="section is-medium mt-6">
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="title has-text-centered">Yeni Şifre Oluşturma</h1>
        <h2 class="subtitle mt-3 has-text-centered">
          Yeni şifreni aşağıdaki forma girerek belirleyebilirsin.
        </h2>

        <div class="box container" style="width: 70%">
          <b-message
            v-if="errMsg"
            type="is-danger"
            has-icon
            icon-size="is-medium"
          >
            {{ errMsg }}
          </b-message>
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <ValidationProvider
              rules="required|passwordLength"
              vid="password"
              name="Password"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Yeni Şifre"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="newPassword"
                  type="password"
                  password-reveal
                  minlength="6"
                  maxlength="10"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <b-button
              type="is-primary"
              expanded
              :loading="isLoading"
              @click="handleSubmit(resetPassword)"
              >Yeni Şifremi Oluştur!
            </b-button>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'
export default {
  components: { ValidationObserver, ValidationProvider },
  head: {
    title: 'Yeni Şifre Oluşturma | KMC Elektronik',
  },
  data() {
    return {
      newPassword: '',
      errMsg: '',
      isLoading: false,
    }
  },
  methods: {
    async resetPassword() {
      //console.log('token: ', this.$route.params.token)
      if (this.errMsg) {
        this.errMsg = ''
      }
      let response = ''
      try {
        this.isLoading = true
        const resetToken = this.$route.params.token
        response = await this.$axios.$patch(
          `/auth/resetPassword/${resetToken}`,
          { password: this.newPassword }
        )
        if (response.success) {
          this.$router.push('/')

          this.isLoading = false
          this.newPassword = ''

          this.$buefy.toast.open({
            duration: 5000,
            message: response.message,
            type: 'is-success',
          })

          Cookie.set('access_token', response.token, {
            sameSite: 'strict',
          })

          const decoded = jwtDecode(response.token)
          // user bilgilerine serverdan gelen token bilgisini de ekleyip store gönderme
          response.user.exp = decoded.exp

          this.$store.commit('setUser', response.user)
        }
      } catch (error) {
        this.isLoading = false
        // serverdan gelen hata mesajına ve diğer detaylara error.response olarak erişebiliyorum
        if (error.response) {
          //console.log(error.response)
          return (this.errMsg = error.response.data.message)
        } else {
          this.errMsg = error.message
          console.log(error)
        }
      }
    },
  },
}
</script>

<style></style>
