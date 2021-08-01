<template>
  <div class="container is-fluid">
    <section class="section">
      <CurrencyRates
        :key="componentKey"
        :dateTodayForCurrency="today"
        :reRenderTimes="componentKey"
      />
    </section>
    <section class="section is-large p-2 mb-6">
      <div class="card p-2">
        <div class="columns is-justify-content-space-between for-mobile">
          <div class="column is-7">
            <CartProductTable />
          </div>

          <div class="column is-4" v-if="$store.state.cart.cart.length > 0">
            <CheckoutBox
              :dateTodayToCheck="today"
              @forceRerender="forceRerender"
            />
          </div>
        </div>
      </div>
      <br />
    </section>
    <br />
  </div>
</template>

<script>
import CartProductTable from '../components/cart/CartProductTable.vue'
import CurrencyRates from '../components/cart/CurrencyRates.vue'
import CheckoutBox from '../components/cart/CheckoutBox.vue'
import * as module from '../components/formatHelper'

export default {
  components: { CartProductTable, CurrencyRates, CheckoutBox },
  head: {
    title: 'Sepet | KMC Elektronik',
  },
  data() {
    return {
      componentKey: 0,
      today: module.formatDate(Date.now()),
      // curr comp re-render testi için;
      //today: '20 Haziran 2021, Pazar',
    }
  },
  methods: {
    // günün tarihi eskide kalmış ise sayfada kurların apiden alındığı componentin tekrar re-render edilmesi için
    // ref: https://michaelnthiessen.com/force-re-render/
    forceRerender() {
      this.componentKey += 1
      // günün tarihi olarak düzeltme;
      this.today = module.formatDate(Date.now())
      // kullanıcıya bilg msj funct çağrılması;
      this.showCurrUpdateInfoMsg()
      //console.log('currency component re-render edildi...')
    },
    showCurrUpdateInfoMsg() {
      this.$buefy.dialog.alert({
        title: 'Kur bilgileri güncellendi...',
        message:
          'Günün tarihine göre kur bilgileri güncellenmiştir. <br /> Sipariş tutarınız yeni kurlara göre revize edilmiştir. <br /> Yeni fiyatlara göre tekrar sipariş oluşturabilirsiniz. ',
        type: 'is-warning',
        hasIcon: true,
        icon: 'exclamation-triangle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
        confirmText: 'Tamam',
      })
    },
  },
}
</script>

<style scoped>
/* Mobile görünümde sipariş tutarındaki div in ilk önce görünmesi için
 bu tanım yapıldı
ref: https://stackoverflow.com/questions/41709977/bulma-change-stack-order-of-columns 
*/
@media (max-width: 768px) {
  .for-mobile {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
