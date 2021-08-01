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
      :disabled="$store.getters['cart/getCurrRates'] === null"
      @click="createOrder"
    >
      Sipariş Oluştur
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
              <LoginForm @closeAuthFormModal="closeAuthModal" />
            </b-tab-item>
            <b-tab-item label="Kayıt Ol" icon-pack="fas" icon="user-plus">
              <!-- Sign-up Form -->
              <SignupForm @closeAuthFormModal="closeAuthModal" />
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
import * as module from '../formatHelper'
export default {
  name: 'CheckoutBox',
  components: { SignupForm, LoginForm },
  props: ['dateTodayToCheck'],
  emits: ['forceRerender'],
  data() {
    return {
      isAuthModalActive: false,
    }
  },
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
        // herşey ok se;
      } else {
        this.$router.push('/placeorder')
      }
    },
    closeAuthModal() {
      this.isAuthModalActive = false
    },
  },
}
</script>
