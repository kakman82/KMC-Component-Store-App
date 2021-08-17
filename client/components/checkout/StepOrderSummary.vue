<template>
  <div class="card">
    <article class="panel is-info">
      <p class="panel-heading has-text-centered">Sipariş Özeti</p>

      <a class="panel-block is-justify-content-space-between">
        <b>Sipariş Toplamı:</b>
        <p>
          <i class="fas fa-lira-sign fa-1x"></i>
          {{ niceFormat(orderSummary.cartTotalTL) }}
        </p>
      </a>
      <a class="panel-block is-justify-content-space-between">
        <b
          >Hizmet Bedeli<small>(%{{ orderSummary.serviceFeeVal }})</small>:</b
        >
        <p>
          <i class="fas fa-lira-sign fa-1x"></i>
          {{ niceFormat(orderSummary.cartFeeTL) }}
        </p>
      </a>
      <a class="panel-block is-justify-content-space-between">
        <b>KDV Tutarı<small>(%18)</small>:</b>
        <p>
          <i class="fas fa-lira-sign fa-1x"></i>
          {{ niceFormat(orderSummary.cartTaxTL) }}
        </p>
      </a>
      <a class="panel-block is-justify-content-space-between">
        <b class="is-size-5 has-text-success-dark">Genel Toplam:</b>
        <b class="is-size-5 has-text-success-dark">
          <i class="fas fa-lira-sign fa-1x"></i>
          {{ niceFormat(orderSummary.orderTotalTL) }}
        </b>
      </a>

      <button
        class="button is-success is-medium is-fullwidth has-text-weight-bold"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </button>
    </article>
  </div>
</template>

<script>
import * as module from '../../plugins/formatHelper.js'
export default {
  name: 'StepOrderSummary',
  props: ['stepInfo'],
  emits: ['nextStep'],
  computed: {
    orderSummary() {
      const data = this.$store.state.order.amounts
      if (data) {
        return data
      } else {
        return 0
      }
    },
    buttonText() {
      return this.stepInfo === 0 ? 'Kaydet ve İlerle' : 'Siparişi Onayla!'
    },
  },
  methods: {
    niceFormat(val) {
      return module.formatNumber(val, 2)
    },
    handleSubmit() {
      if (
        this.stepInfo === 0 &&
        this.$store.state.selectedAddress.length === 0
      ) {
        return this.$buefy.dialog.alert({
          title: 'Dikkat!',
          message: 'Önce adres seçilmelidir...',
          type: 'is-warning',
          hasIcon: true,
          icon: 'exclamation-triangle',
          iconPack: 'fas',
          confirmText: 'Tamam',
        })
      }
      this.$emit('nextStep')

      if (this.stepInfo === 1) {
        alert('Sipariş onaylandı hadi iyisin....')
        //TODO  sipariş onay logic buradaki if bloğu altında olacak
      }
    },
  },
}
</script>

<style></style>
