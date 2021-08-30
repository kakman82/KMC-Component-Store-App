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
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="E-posta"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input v-model="email" type="email"> </b-input>
              </b-field>
            </ValidationProvider>

            <b-button
              class="mt-3"
              type="is-primary"
              expanded
              :loading="isLoading"
              @click="handleSubmit(forgotPassword)"
              >Şifremi Yenile!
            </b-button>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: { ValidationObserver, ValidationProvider },
  head: {
    title: 'Şifre Yenileme | KMC Elektronik',
  },
  data() {
    return {
      email: '',
      errMsg: '',
      isLoading: false,
    }
  },
  methods: {
    async forgotPassword() {
      if (this.errMsg) {
        this.errMsg = ''
      }
      try {
        this.isLoading = true
        const response = await this.$axios.$post('auth/forgotPassword', {
          email: this.email.toLowerCase(),
        })

        if (response.success) {
          this.email = ''
          this.errMsg = ''
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
