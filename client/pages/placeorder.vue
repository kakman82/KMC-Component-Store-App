<template>
  <section class="section is-medium mt-5">
    <div class="columns mx-6">
      <div class="column is-8">
        <Steps />
      </div>
      <div class="column is-4">
        <OrderSummary />
      </div>
    </div>
  </section>
</template>

<script>
import OrderSummary from '../components/placeorder/OrderSummary.vue'
import Steps from '../components/placeorder/Steps.vue'
export default {
  // sadece login olmuş kullanıcıların bu sayfaya erişebilmesi için;
  middleware: 'authenticated',
  head: {
    title: 'Sipariş Onay | KMC Elektronik',
  },
  components: { Steps, OrderSummary },
}
</script>
