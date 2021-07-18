<template>
  <b-navbar class="is-info is-fixed-top has-shadow">
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
    <!-- Sayfa Navigasyon template deki end start başta ya da sonda olmasını belirliyor güzel -->
    <template #end>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon pack="fas" icon="home" size="is-small"></b-icon>
        <span class="ml-2 has-text-weight-medium">Ana Sayfa</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/cart' }">
        <b-icon pack="fas" icon="shopping-cart" size="is-small"></b-icon>
        <span class="ml-2 has-text-weight-medium">Sepete Git</span>
      </b-navbar-item>
      <!-- User Menu Dropdown -->
      <b-navbar-item v-if="$auth.loggedIn">
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <p class="is-white">
              <b-icon pack="fas" icon="user-circle" size="is-small"></b-icon>
              <span class="ml-1 has-text-weight-medium">{{
                $auth.user.firstName
              }}</span>
            </p>
          </template>
          <b-dropdown-item aria-role="menuitem">
            <b-icon pack="fas" icon="shopping-bag" size="is-small"></b-icon>
            <span class="ml-1 has-text-weight-medium">Siparişlerim</span>
          </b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            v-if="$auth.user.role === 'admin'"
          >
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
            <span class="ml-1 has-text-weight-medium">Çıkış</span>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
      <!-- Sign-up & Login Buttonları -->
      <b-navbar-item tag="div">
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
                    <b-field label="Email">
                      <b-input type="email" placeholder="Your email" required>
                      </b-input>
                    </b-field>
                    <b-field label="Password">
                      <b-input
                        type="password"
                        password-reveal
                        placeholder="Your password"
                        required
                      >
                      </b-input>
                    </b-field>
                    <b-checkbox>Remember me</b-checkbox>
                  </section>
                  <footer class="modal-card-foot">
                    <b-button label="Login" type="is-primary" />
                  </footer>
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
export default {
  name: 'Navbar',
}
</script>
