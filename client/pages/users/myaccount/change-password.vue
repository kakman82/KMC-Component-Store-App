<template>
  <div class="card ml-6" style="width: 600px">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">Şifre Değiştir</p>
    </header>
    <div class="card-content">
      <div class="content">
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

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Mevcut Şifre"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="currentPassword" type="password"></b-input>
              </b-field>
            </ValidationProvider>

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
                <b-input v-model="newPassword" type="password"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              rules="required|confirmed:password"
              name="Password Confirmation"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Yeni Şifre Tekrar"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="newPasswordConfirm" type="password">
                </b-input>
              </b-field>
            </ValidationProvider>

            <b-button
              class="mt-6 is-primary has-text-weight-bold"
              @click="handleSubmit(changePassword)"
              >Değiştir</b-button
            >
          </section>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  components: { ValidationObserver, ValidationProvider },
  head: {
    title: 'Şifre Değ | KMC Elektronik',
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      serverErrMsg: '',
    }
  },
  methods: {
    async changePassword() {
      let response = ''
      try {
        const reqData = {
          userId: this.$store.getters['getUser'].id,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        }
        response = await this.$axios.$patch(
          '/users/profile/updateMyPassword',
          reqData
        )
        console.log(response)
        if (response.success) {
          this.$buefy.toast.open({
            type: 'is-success',
            message: response.message,
            duration: 5000,
          })

          this.$router.push('/users/myaccount')

          Cookies.set('access_token', response.token, {
            sameSite: 'strict',
          })

          const decoded = jwtDecode(response.token)

          response.user.exp = decoded.exp

          this.$store.commit('setUser', response.user)

          this.currentPassword = ''
          this.newPassword = ''
          this.newPasswordConfirm = ''
          this.serverErrMsg = ''
        }
      } catch (error) {
        if (error && error.response) {
          this.serverErrMsg = error.response.data.message
        } else {
          console.log(error)
          this.serverErrMsg = error.message
        }
      }
    },
  },
}
</script>

<style></style>
