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
            label="Adres Seçimi"
            icon-pack="fas"
            icon="map-marked-alt"
          >
            <StepAddress />
          </b-step-item>
          <b-step-item
            step="2"
            label="Sipariş Onayı"
            icon-pack="fas"
            icon="check-circle"
          >
            <StepOrderDetails @go-previous="previous" />
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
import StepAddress from '../components/checkout/StepAddress.vue'
import StepOrderDetails from '../components/checkout/StepOrderDetails.vue'
import StepOrderSummary from '../components/checkout/StepOrderSummary.vue'
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
  head: {
    title: 'Sipariş Onay | KMC Elektronik',
  },
  components: { StepAddress, StepOrderDetails, StepOrderSummary },
  data() {
    return {
      activeStep: 0,
      hasNavigation: false,
      mobileMode: 'minimalist',
    }
  },
  async created() {
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
        this.$store.commit('setUserAddresses', response.addresses)
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    next() {
      this.activeStep = 1
    },
    previous() {
      this.activeStep = 0
    },
  },
}
</script>
