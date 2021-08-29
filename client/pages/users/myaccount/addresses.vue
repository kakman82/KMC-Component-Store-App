<template>
  <section>
    <!-- <div
      class="box"
      v-for="userAddress in userAddresses"
      :key="userAddress._id"
    >
      <AddressList :address="userAddress" />
    </div> -->
    <div>
      <StepAddress />
    </div>
    <!-- <AddressModal />
    <AddAddress />
    <UpdateAddress /> -->
  </section>
</template>

<script>
import AddressList from '../../../components/checkout/AddressList.vue'
import AddressModal from '../../../components/checkout/AddressModal.vue'
import AddAddress from '../../../components/checkout/AddAddress.vue'
import UpdateAddress from '../../../components/checkout/UpdateAddress.vue'
import StepAddress from '../../../components/checkout/StepAddress.vue'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  components: {
    AddressList,
    AddressModal,
    AddAddress,
    UpdateAddress,
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
