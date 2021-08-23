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

      <b-navbar-item
        v-if="$store.getters['isLogin']"
        tag="router-link"
        :to="{ path: '/users/myaccount' }"
        class="has-text-weight-medium"
      >
        <a class="button is-info">
          <b-icon pack="fas" icon="user-circle" size="is-small"></b-icon>
          <span>
            {{ $store.state.user.firstName }}
          </span>
        </a>
      </b-navbar-item>

      <!-- User Menu Dropdown -->
      <!-- <b-navbar-item v-if="$store.getters['isLogin']">
        <b-dropdown position="is-bottom-left" aria-role="menu" append-to-body>
          <template #trigger>
            <a class="button is-info">
              <b-icon pack="fas" icon="user-circle" size="is-small"></b-icon>
              <span class="ml-1 has-text-weight-medium">
                {{ $store.state.user.firstName }}
                {{ $store.state.user.lastName }}
              </span>
            </a>
          </template>
          <b-dropdown-item aria-role="menuitem" class="px-3 py-0">
            <b-button
              class="p-0"
              type="is-light"
              icon-pack="fas"
              icon-left="user"
              tag="nuxt-link"
              :to="{ path: `/users/myaccount/${$store.state.user.id}` }"
            >
              Hesabım
            </b-button>
          </b-dropdown-item>

          <b-dropdown-item aria-role="menuitem" class="px-3 py-0">
            <b-button
              class="p-0"
              type="is-light"
              icon-pack="fas"
              icon-left="shopping-bag"
              tag="nuxt-link"
              :to="{ path: `/users/myorders/${$store.state.user.id}` }"
            >
              Siparişlerim
            </b-button>
          </b-dropdown-item>
          <b-dropdown-item aria-role="menuitem" class="px-3 py-0">
            <b-button
              class="p-0"
              type="is-light"
              icon-pack="fas"
              icon-left="users-cog"
              tag="nuxt-link"
              :to="{ path: `/users/admin/${$store.state.user.id}` }"
            >
              Admin Paneli
            </b-button>
          </b-dropdown-item>

          <hr class="dropdown-divider" aria-role="listitem" />

          <b-dropdown-item aria-role="menuitem" class="px-3 py-0">
            <b-button
              class="p-0 has-text-primary"
              type="is-light"
              icon-pack="fas"
              icon-left="sign-out-alt"
              @click="userLogout"
            >
              Çıkış Yap
            </b-button>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item> -->
      <!-- Login Buttonları -->
      <b-navbar-item v-if="!$store.getters['isLogin']">
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu">
          <template #trigger>
            <a class="button is-info">
              <b-icon pack="fas" icon="sign-in-alt" size="is-small"></b-icon>
              <span class="has-text-weight-medium">Giriş Yap</span>
            </a>
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
                  <LoginForm />
                </section>
              </div>
            </form>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue'
export default {
  name: 'Navbar',
  components: { LoginForm },
}
</script>
