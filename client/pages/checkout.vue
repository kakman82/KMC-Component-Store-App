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
            <article class="message is-info">
              <div class="message-body">
                Aşağıda sipariş detayları belirtilmiştir. Onay verildğinde
                sipariş bize ulaşacaktır.
              </div>
            </article>
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
import Cookie from 'js-cookie'
import StepAddress from '../components/checkout/StepAddress.vue'
import StepOrderSummary from '../components/checkout/StepOrderSummary.vue'
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
  head: {
    title: 'Sipariş Onay | KMC Elektronik',
  },
  components: { StepAddress, StepOrderSummary },
  data() {
    return {
      activeStep: 0,
      hasNavigation: false,
      mobileMode: 'minimalist',
    }
  },
  async created() {
    const token = Cookie.get('access_token')
    try {
      const response = await this.$axios.$get('/users/addresses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.error && response.error.name === 'TokenExpiredError') {
        return this.$store.commit('logout', {
          type: 'is-danger',
          duration: 7000,
          message:
            'Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!',
        })
      }
      if (response.success) {
        this.addresses = response.addresses
        this.$store.commit('setUserAddresses', this.addresses)
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    next() {
      this.activeStep = 1
    },
  },
}
</script>
