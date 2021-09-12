<template>
  <section>
    <StepAddress />
  </section>
</template>

<script>
import StepAddress from '../../../components/checkout/StepAddress.vue'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  components: {
    StepAddress,
  },
  head: {
    title: 'Adreslerim | KMC Elektronik',
  },
  computed: {
    sessionUserId() {
      return this.$store.getters['getUser'].id
    },
  },
  created() {
    this.getUserAddresses()
  },
  methods: {
    async getUserAddresses() {
      try {
        const response = await this.$axios.$get('/users/addresses')

        if (response.error && response.error.name === 'TokenExpiredError') {
          return this.$store.commit('logout', {
            type: 'is-danger',
            duration: 7000,
            message:
              'Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!',
          })
        }
        if (response.success) {
          const activeAddresses = response.addresses.filter(
            (el) => el.active === true
          )
          this.$store.commit('setUserAddresses', activeAddresses)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
