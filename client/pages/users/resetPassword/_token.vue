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
          <b-field label="Yeni Şifre">
            <b-input
              v-model="newPassword"
              type="password"
              required
              password-reveal
              minlength="6"
              maxlength="10"
              validation-message="En az 6 en çok 10 karakter olmalıdır."
            >
            </b-input>
          </b-field>
          <b-button
            type="is-primary"
            expanded
            :loading="isLoading"
            :disabled="!validation"
            @click="resetPassword"
            >Yeni Şifremi Oluştur!</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cookie from 'js-cookie'
export default {
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
  computed: {
    validation() {
      if (
        !this.newPassword ||
        this.newPassword.length < 6 ||
        this.newPassword.length > 10
      ) {
        return false
      } else {
        return true
      }
    },
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
          `/users/resetPassword/${resetToken}`,
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
        }
      } catch (error) {
        //console.log(error.response)
        this.isLoading = false
        if (error.response) {
          this.errMsg = error.response.data.message
        } else {
          this.errMsg = error
        }
      }
    },
  },
}
</script>

<style></style>
