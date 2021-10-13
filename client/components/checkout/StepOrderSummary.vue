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
          >Hizmet Bedeli<small>(%{{ rate }})</small>:</b
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
      <div class="is-flex m-2" v-if="stepInfo === 2">
        <b-checkbox v-model="isChecked"></b-checkbox>
        <small>
          <a @click="confirmConditionsModal">Hizmet Şartları'nı</a>
          okudum, onaylıyorum.</small
        >
      </div>

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
      isChecked: false,
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
    rate() {
      const value = this.orderSummary.serviceFeeRate * 1
      if (Number.isInteger(value)) {
        return value
      } else {
        return module.formatNumber(this.orderSummary.serviceFeeRate, 2)
      }
    },
    buttonText() {
      return this.stepInfo === 2 ? 'Siparişi Onayla!' : 'İlerle'
    },
  },
  methods: {
    niceFormat(val) {
      return module.formatNumber(val, 2)
    },
    handleSubmit() {
      if (
        this.stepInfo === 0 &&
        Object.keys(this.$store.state.addresses.selectedDeliveryAddress)
          .length === 0
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
      if (
        this.stepInfo === 1 &&
        Object.keys(this.$store.state.addresses.billingAddress).length === 0
      ) {
        return this.$buefy.dialog.alert({
          title: 'Dikkat!',
          message: 'Fatura adresi oluşturulmalıdır...',
          type: 'is-warning',
          hasIcon: true,
          icon: 'exclamation-triangle',
          iconPack: 'fas',
          confirmText: 'Tamam',
        })
      }
      if (this.stepInfo < 2) this.$emit('nextStep')

      if (this.stepInfo === 2 && !this.isChecked)
        return this.confirmConditionsModal()

      if (this.stepInfo === 2 && this.isChecked) {
        return this.createOrder()
      }
    },
    async createOrder() {
      try {
        this.isLoading = true
        const deliveryAddress =
          this.$store.state.addresses.selectedDeliveryAddress
        const billingAddress = this.$store.state.addresses.billingAddress
        const cartProducts = this.$store.getters['cart/getCartProducts']
        const orderAmounts = this.$store.getters['order/getOrderAmounts']
        const orderData = {
          // mongodb id si çok uzun olduğu için daha kısa bir unique id paketi kullandım
          orderNo: uniqid('KMC-', uniqid.time()),
          deliveryAddressId: deliveryAddress._id,
          billingAddressId: billingAddress._id,
          products: cartProducts,
          orderAmounts: orderAmounts,
        }

        const response = await this.$axios.$post('/users/orders', orderData)
        if (response.success) {
          this.isLoading = false

          this.$store.commit('cart/resetCart')
          this.$store.commit('order/resetOrderAmounts')
          this.$store.commit('adresses/resetSelectedAddress')

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
    confirmConditionsModal() {
      this.$buefy.dialog.confirm({
        title: 'Hizmet Şartları',
        size: 'is-small',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.
                        <br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.
                        `,
        cancelText: 'Kapat',
        confirmText: 'Onaylıyorum',
        type: 'is-success',
        onConfirm: () => (this.isChecked = true),
      })
    },
  },
}
</script>

<style></style>
