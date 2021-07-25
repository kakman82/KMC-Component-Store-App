<template>
  <div class="container is-fluid">
    <section class="section">
      <CurrencyRates />
    </section>
    <section class="section is-large p-2 mb-6">
      <div class="card p-2">
        <div class="columns is-justify-content-space-between for-mobile">
          <div class="column is-7">
            <CartProductTable />
          </div>
          <div class="column is-4" v-if="$store.state.cart.cart.length > 0">
            <CheckoutBox />
          </div>
        </div>
      </div>
      <!-- Footer ın sayfada tabana oturması için ekledim  -->
      <br />
    </section>
    <!-- Footer ın sayfada tabana oturması için ekledim  -->
    <br />
  </div>
</template>

<script>
import CartProductTable from '../components/cart/CartProductTable.vue'
import CurrencyRates from '../components/cart/CurrencyRates.vue'
import CheckoutBox from '../components/cart/CheckoutBox.vue'

export default {
  components: { CartProductTable, CurrencyRates, CheckoutBox },
  head: {
    title: 'Sepet | KMC Elektronik',
  },
}
</script>

<style scoped>
/* Mobile görünümde sipariş tutarındaki div in ilk önce görünmesi için bu tanım yapıldı ref: https://stackoverflow.com/questions/41709977/bulma-change-stack-order-of-columns */
@media (max-width: 768px) {
  .for-mobile {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
