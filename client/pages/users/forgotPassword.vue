<template>
  <section class="section is-medium mt-6">
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="title has-text-centered">Şifre Yenileme</h1>
        <h2 class="subtitle mt-3 has-text-centered">
          Şifre yenileme linkini gönderebilmemiz için e-posta adresini
          girmelisin
        </h2>
        <b-message
          v-if="errMsg"
          type="is-danger"
          has-icon
          icon-size="is-medium"
        >
          {{ errMsg }}
        </b-message>
        <div class="box">
          <b-field label="E-posta">
            <b-input
              v-model="email"
              type="email"
              required
              validation-message="Lütfen e-posta adresinizi giriniz."
            >
            </b-input>
          </b-field>
          <b-button type="is-primary" expanded @click="forgotPassword"
            >Şifremi Yenile!</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head: {
    title: 'Şifre Yenileme | KMC Elektronik',
  },
  data() {
    return {
      email: '',
      errMsg: '',
    }
  },
  methods: {
    async forgotPassword() {
      try {
        const response = await this.$axios.$post('users/forgotPassword', {
          email: this.email.toLowerCase(),
        })
        if (response.success) {
          this.$router.push('/')

          this.$buefy.toast.open({
            type: 'is-success',
            message: response.message,
            duration: 10000,
          })
        }
      } catch (error) {
        console.log(error)
        this.errMsg =
          'E-posta adresi hatalı ya da bu adrese sahip kullanıcı bulunmuyor!'
      }
    },
  },
}
</script>

<style></style>
