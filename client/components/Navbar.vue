<template>
  <!-- navbar class'a eklenen has-shadow beyaz çizgili kenarlık yapıyor  -->
  <b-navbar class="is-info is-fixed-top">
    <!-- Logo  -->
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <!-- <img src="/kmc-elektronik-logo.gif" /> -->
        <div class="container ml-6">
          <p class="ml-6 is-size-3 has-text-white has-text-weight-medium">
            KMC Elektronik.
          </p>
        </div>
      </b-navbar-item>
    </template>
    <!-- Sayfa Navigasyon template deki end ve start başta ya da sonda olmasını belirliyor güzel -->
    <template #end>
      <b-navbar-item
        tag="router-link"
        :to="{ path: '/' }"
        class="has-text-weight-medium"
      >
        <a class="button is-info">
          <b-icon pack="fas" icon="home" size="is-small"></b-icon>
          <span>Ana Sayfa</span>
        </a>
      </b-navbar-item>
      <b-navbar-item
        class="has-text-weight-medium"
        tag="router-link"
        :to="{ path: '/cart' }"
      >
        <a class="button is-info">
          <b-icon pack="fas" icon="shopping-cart" size="is-small"></b-icon>
          <span
            v-if="$store.state.cart.cart.length > 0"
            title="Badge top right"
            class="badge"
          >
            {{ $store.getters['cart/getCartLength'] }}
          </span>
          <span>Sepete Git</span>
        </a>
      </b-navbar-item>

      <!-- User Menu Dropdown -->
      <b-navbar-item v-if="$store.getters['isLogin']">
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <p class="is-white">
              <b-icon pack="fas" icon="user-circle" size="is-small"></b-icon>
              <span class="ml-1 has-text-weight-medium">
                {{ $store.state.user.firstName }}
                {{ $store.state.user.lastName }}
              </span>
            </p>
          </template>
          <b-dropdown-item aria-role="menuitem">
            <b-icon pack="fas" icon="shopping-bag" size="is-small"></b-icon>
            <span class="ml-1 has-text-weight-medium">Siparişlerim</span>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <b-icon pack="fas" icon="users-cog" size="is-small"></b-icon>
            <span class="ml-1 has-text-weight-medium">Admin Paneli</span>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
          <hr class="dropdown-divider" aria-role="listitem" />
          <b-dropdown-item aria-role="listitem">
            <b-icon pack="fas" icon="cog" size="is-small"></b-icon>
            <span class="ml-1 has-text-weight-medium">Ayarlar</span>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem">
            <b-icon pack="fas" icon="sign-out-alt" size="is-small"></b-icon>
            <span class="ml-1 has-text-weight-medium" @click="userLogout"
              >Çıkış</span
            >
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
      <!-- Login Buttonları -->
      <b-navbar-item tag="div" v-if="!$store.getters['isLogin']">
        <div class="buttons">
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
            trap-focus
          >
            <template #trigger>
              <div class="button is-info">
                <b-icon pack="fas" icon="sign-in-alt" size="is-small"></b-icon>
                <span class="has-text-weight-medium">Giriş Yap</span>
              </div>
            </template>
            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless
            >
              <form>
                <div class="modal-card" style="width: 300px">
                  <section class="modal-card-body">
                    <p
                      class="
                        is-size-6
                        has-text-weight-bold has-text-primary-dark
                      "
                    >
                      Giriş için gerekli bilgileri giriniz:
                    </p>
                    <hr />
                    <LoginForm />
                  </section>
                </div>
              </form>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import LoginForm from '../components/auth/LoginForm.vue'
import Cookie from 'js-cookie'
export default {
  name: 'Navbar',
  components: { LoginForm },
  methods: {
    async userLogout() {
      Cookie.remove('access_token')
      this.$store.commit('removeUser')

      this.$router.push('/')
    },
  },
}
</script>
