<template>
  <section class="section is-medium mt-5">
    <div class="columns mx-6">
      <div class="column is-8">
        <b-steps
          size="is-medium"
          v-model="activeStep"
          animated
          :has-navigation="hasNavigation"
          :mobile-mode="mobileMode"
        >
          <b-step-item
            step="1"
            label="Teslimat Adresi"
            icon-pack="fas"
            icon="map-marked-alt"
          >
            <StepDeliveryAddress />
          </b-step-item>
          <b-step-item
            step="2"
            label="Fatura Adresi ve Ödeme"
            icon-pack="fas"
            icon="money-bill-wave"
          >
            <StepBillingAddressAndPayment />
          </b-step-item>
          <b-step-item
            step="3"
            label="Sipariş Onayı"
            icon-pack="fas"
            icon="check-circle"
          >
            <StepOrderDetails />
          </b-step-item>
        </b-steps>
      </div>
      <div class="column is-4">
        <StepOrderSummary :stepInfo="activeStep" @nextStep="next" />
      </div>
    </div>
  </section>
</template>

<script>
import StepDeliveryAddress from '../components/checkout/StepDeliveryAddress.vue'
import StepOrderDetails from '../components/checkout/StepOrderDetails.vue'
import StepOrderSummary from '../components/checkout/StepOrderSummary.vue'
import StepBillingAddressAndPayment from '../components/checkout/StepBillingAddressAndPayment.vue'
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
  head: {
    title: 'Sipariş Onay | KMC Elektronik',
  },
  components: {
    StepDeliveryAddress,
    StepOrderDetails,
    StepOrderSummary,
    StepBillingAddressAndPayment,
  },
  data() {
    return {
      activeStep: 0,
      hasNavigation: false,
      mobileMode: 'minimalist',
    }
  },
  created() {
    this.$store.dispatch('addresses/getUserDeliveryAddresses')
    this.$store.dispatch('addresses/getUserBillingAddress')
  },
  methods: {
    next() {
      this.activeStep += 1
    },
  },
}
</script>
