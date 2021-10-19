<template>
  <section style="width: 95%">
    <StepDeliveryAddress />
  </section>
</template>

<script>
import StepDeliveryAddress from '../../../components/checkout/StepDeliveryAddress.vue'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  components: {
    StepDeliveryAddress,
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
    this.$store.dispatch('addresses/getUserDeliveryAddresses')
  },
}
</script>

<style></style>
