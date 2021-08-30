<template>
  <article class="panel is-info">
    <p class="panel-heading has-text-centered">Sepet Tutarı</p>

    <a class="panel-block is-justify-content-space-between">
      <b>Sepet Toplamı:</b>
      <p><i class="fas fa-lira-sign fa-1x"></i> {{ cartTotalTL }}</p>
    </a>
    <a class="panel-block is-justify-content-space-between">
      <b
        >Hizmet Bedeli<small>(%{{ serviceFee }})</small>:</b
      >
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
      :disabled="$store.getters['cart/getCurrRates'] === null"
      @click="createOrder"
    >
      Sepeti Onayla
    </button>
    <!-- Auth Modal Kısmı - Login & Sign-up Components -->
    <div class="modal" :class="{ 'is-active': isAuthModalActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title is-size-5 has-text-weight-bold">
            Giriş yapın veya yeni bir hesap oluşturun.
          </p>

          <button
            class="delete"
            aria-label="close"
            @click="isAuthModalActive = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <b-tabs type="is-boxed" expanded>
            <b-tab-item label="Giriş Yap" icon-pack="fas" icon="sign-in-alt">
              <!-- Login Form -->
              <LoginForm
                @closeAuthFormModal="closeAuthModal"
                @call-create-order="createOrder"
              />
            </b-tab-item>
            <b-tab-item label="Kayıt Ol" icon-pack="fas" icon="user-plus">
              <!-- Sign-up Form -->
              <SignupForm
                @closeAuthFormModal="closeAuthModal"
                @call-create-order="createOrder"
              />
            </b-tab-item>
          </b-tabs>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button class="button" @click="isAuthModalActive = false">
            Kapat
          </button>
        </footer>
      </div>
    </div>
  </article>
</template>

<script>
import SignupForm from '../auth/SignupForm.vue'
import LoginForm from '../auth/LoginForm.vue'
import * as module from '../../plugins/formatHelper'
export default {
  name: 'CheckoutBox',
  components: { SignupForm, LoginForm },
  props: ['dateTodayToCheck'],
  emits: ['forceRerender'],
  data() {
    return {
      isAuthModalActive: false,
      serviceFee: null,
      totalTL: null,
      feeTL: null,
      taxTL: null,
      grandTotalTL: null,
    }
  },
  computed: {
    cartTotalTL() {
      const getVal = this.$store.getters['cart/getCartTotalTL']
      getVal > 0 ? (this.totalTL = getVal.toFixed(2) * 1) : 0
      return module.formatNumber(this.totalTL, 2)
    },
    serviceFeeTL() {
      const feeVal = this.totalTL * (this.serviceFee / 100)
      this.feeTL = feeVal.toFixed(2) * 1
      return module.formatNumber(feeVal, 2)
    },
    taxFee() {
      const taxVal = (this.totalTL + this.feeTL) * 0.18
      this.taxTL = taxVal.toFixed(2) * 1
      return module.formatNumber(taxVal, 2)
    },
    sumTotal() {
      const all = this.totalTL + this.feeTL + this.taxTL
      this.grandTotalTL = all.toFixed(2) * 1
      return module.formatNumber(all, 2)
    },
  },
  async created() {
    try {
      const response = await this.$axios.$get('/serviceFee')
      if (response.success) {
        // db den dönen veri en son kaydedilen sıralamasında - 0 index en son olan
        this.serviceFee = response.fees[0].serviceFee.$numberDecimal
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    checkTodaysDate() {
      if (module.formatDate(Date.now()) !== this.dateTodayToCheck) {
        return false
      } else {
        return true
      }
    },

    createOrder() {
      // eğer tarih bugünün değilse comp tekrar re-render etme
      if (!this.checkTodaysDate()) {
        return this.$emit('forceRerender')
      }
      // tarih ok ve kullanıcı login değilse;
      if (!this.$store.getters['isLogin'] && this.checkTodaysDate()) {
        this.isAuthModalActive = true
      }
      // tarih ok ve kullanıcı da login olmuşsa;
      if (this.$store.getters['isLogin'] && this.checkTodaysDate()) {
        const amounts = {
          cartTotalTL: this.totalTL,
          cartFeeTL: this.feeTL,
          cartTaxTL: this.taxTL,
          orderTotalTL: this.grandTotalTL,
          serviceFeeRate: this.serviceFee,
        }
        this.$store.commit('order/setOrderAmounts', amounts)
        this.$router.push('/checkout')
      }
    },
    closeAuthModal() {
      this.isAuthModalActive = false
    },
  },
}
</script>
