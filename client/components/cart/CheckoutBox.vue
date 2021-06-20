<template>
  <article class="panel is-info">
    <p class="panel-heading has-text-centered">Sipariş Tutarı</p>

    <a class="panel-block is-justify-content-space-between">
      <b>Sepet Toplamı:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> {{ cartTotal }}</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b>Hizmet Bedeli<small>(%10)</small>:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> 100,00</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b>KDV Tutarı<small>(%18)</small>:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> 198,00</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b class="is-size-5 has-text-success-dark">Genel Toplam:</b>
      <b class="is-size-5 has-text-success-dark">
        <i class="fas fa-lira-sign fa-1x"></i>
        1.298,00
      </b>
    </a>
    <button class="button is-success is-medium is-fullwidth has-text-weight-bold">
      Sipariş Oluştur
    </button>
  </article>
</template>

<script>
import * as module from '../formatHelper'
export default {
  name: 'CheckoutBox',
  computed: {
    cartTotal() {
      const val = this.$store.getters['cart/getCartTotal']
      return module.formatNumber(val, 2)
    },
    cartCurrency() {
      return this.$store.getters['cart/getCartCurrencyInfo'][0]
    },
  },
}
</script>
