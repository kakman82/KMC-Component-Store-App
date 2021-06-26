<template>
  <article class="panel is-info">
    <p class="panel-heading has-text-centered">Sipariş Tutarı</p>

    <a class="panel-block is-justify-content-space-between">
      <b>Sepet Toplamı:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> {{ cartTotalTL }}</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b>Hizmet Bedeli<small>(%10)</small>:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> {{ serviceFeeTL }}</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b>KDV Tutarı<small>(%18)</small>:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> {{ taxFee }}</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b class="is-size-5 has-text-success-dark">Genel Toplam:</b>
      <b class="is-size-5 has-text-success-dark">
        <i class="fas fa-lira-sign fa-1x"></i>
        {{ sumTotal }}
      </b>
    </a>
    <button
      class="button is-success is-medium is-fullwidth has-text-weight-bold"
    >
      Sipariş Oluştur
    </button>
  </article>
</template>

<script>
import * as module from '../formatHelper'
export default {
  name: 'CheckoutBox',
  computed: {
    getCartTotalTLValue() {
      return this.$store.getters['cart/getCartTotalTL']
    },
    cartTotalTL() {
      return module.formatNumber(this.getCartTotalTLValue, 2)
    },
    serviceFeeTL() {
      const fee = this.getCartTotalTLValue * 0.1
      return module.formatNumber(fee, 2)
    },
    taxFee() {
      const total = this.getCartTotalTLValue + this.getCartTotalTLValue * 0.1
      const tax = total * 0.18
      return module.formatNumber(tax, 2)
    },
    sumTotal() {
      const totalWithFee =
        this.getCartTotalTLValue + this.getCartTotalTLValue * 0.1
      const addTax = totalWithFee + totalWithFee * 0.18
      return module.formatNumber(addTax, 2)
    },
  },
}
</script>
