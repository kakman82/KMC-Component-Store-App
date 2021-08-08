<template>
  <section class="section is-medium mt-6">
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="title has-text-centered">Şifre Yenileme</h1>
        <h2 class="subtitle mt-3 has-text-centered">
          Şifre yenileme linkini gönderebilmemiz için e-posta adresini
          girmelisin
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
          <b-field label="E-posta" class="mb-5">
            <b-input
              v-model="email"
              type="email"
              required
              :validation-message="validMsg"
            >
            </b-input>
          </b-field>
          <b-button
            type="is-primary"
            expanded
            :loading="isLoading"
            :disabled="!validation"
            @click="forgotPassword"
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
      validMsg: '',
      isLoading: false,
    }
  },
  computed: {
    validation() {
      if (
        !this.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)
      ) {
        this.validMsg = 'Lütfen geçerli bir e-posta adresi giriniz.'
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    async forgotPassword() {
      if (this.errMsg) {
        this.errMsg = ''
      }
      try {
        this.isLoading = true
        const response = await this.$axios.$post('users/forgotPassword', {
          email: this.email.toLowerCase(),
        })

        if (response.success) {
          this.email = ''
          this.errMsg = ''
          this.validMsg = ''
          this.isLoading = false

          this.$buefy.dialog.confirm({
            title: 'Şifre sıfırlama linki gönderildi!',
            message: response.message,
            confirmText: 'Tamam',
            type: 'is-success',
            hasIcon: true,
            canCancel: false,
            onConfirm: () => this.$router.push('/'),
          })
        }
      } catch (error) {
        //console.log(error.response.data)
        this.isLoading = false
        this.errMsg = error.response.data.message
      }
    },
  },
}
</script>

<style></style>
