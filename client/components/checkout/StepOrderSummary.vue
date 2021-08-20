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
        const orderAmounts = this.$store.getters['order/getOrderAmounts']
        const orderData = {
          // mongodb id si çok uzun olduğu için daha kısa bir unique id paketi kullandım
          orderNo: uniqid('KMC-', uniqid.time()),
          deliveryAddressId: deliveryAddress._id,
          products: cartProducts,
          orderAmounts: orderAmounts,
        }

        const response = await this.$axios.$post('/users/orders', orderData)
        if (response.success) {
          this.isLoading = false
          //TODO mail testi için commente almıştım, vuex deki cart&order verileri temizlencek
          //this.$store.commit('cart/resetCart')
          //this.$store.commit('order/resetOrderAmounts')

          this.$buefy.dialog.confirm({
            title: response.message,
            message: `
                      <b>${response.order.orderNo}</b> no.lu siparişin durumunu kullanıcı menüsünden takip edebilirsin. <br />
                      Bilgilendirme e-postası gönderilmiştir. 
                      <hr />
                      Teşekkür eder, sağlıklı günler dileriz. <br /> 
                      <b>
                        KMC Elektronik.
                      </b>
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
