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
    <b-loading :is-full-page="isFullPage" v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import uniqid from 'uniqid' // npm install uniqid
import * as module from '../../plugins/formatHelper.js'
export default {
  name: 'StepOrderSummary',
  props: ['stepInfo'],
  emits: ['nextStep'],
  data() {
    return {
      isLoading: false,
      isFullPage: true,
    }
  },
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
        this.createOrder()
      }
    },
    async createOrder() {
      try {
        this.isLoading = true
        const deliveryAddress = this.$store.getters['getSelectedAddress'][0]
        const cartProducts = this.$store.getters['cart/getCartProducts']
        const orderData = {
          // mongodb id si çok uzun olduğu için daha kısa bir unique id paketi kullandım
          orderId: uniqid('KMC-', uniqid.time()),
          deliveryAddressId: deliveryAddress._id,
          products: cartProducts,
        }
        const response = await this.$axios.$post('/users/orders', orderData)
        if (response.success) {
          this.isLoading = false
          //TODO sipariş verildikten sonra vuex deki cart&order verileri temizlencek
          //TODO aynı zamanda localstorage dan da temizlendiği emin olunacak
          //TODO Siparişiniz alındı modal mesajı ile birlikte ana sayfaya yönlendirme yapılacak

          this.$store.commit('cart/resetCart')
          this.$store.commit('order/resetOrderAmounts')

          this.$buefy.dialog.confirm({
            title: 'Sipariş alınmıştır...',
            message: `
                      <b>${response.order.orderId}</b> no.lu siparişin durumunu kullanıcı menüsünden görüntüleyebilirsin. <br /> 
                      Teşekkür eder, sağlıklı günler dileriz. <br /> 
                      KMC Elektronik.
                      `,
            type: 'is-success',
            hasIcon: true,
            icon: 'thumbs-up',
            iconPack: 'far',
            confirmText: 'Tamam',
            canCancel: false,
            onConfirm: () => this.$router.push('/'),
          })
        }
      } catch (error) {
        this.isLoading = false
        this.$buefy.toast.open({
          type: 'is-danger',
          duration: 5000,
          message: error.message,
        })
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
