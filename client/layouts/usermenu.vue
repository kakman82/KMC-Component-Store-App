<template>
  <section>
    <Navbar />
    <section class="section is-small mb-0">
      <section
        class="
          section
          is-flex is-flex-direction-row is-justify-content-space-between
        "
      >
        <h1 class="title has-text-primary">Kullanıcı Hesabım</h1>
        <b-button
          class="is-justify-content-flex-end"
          type="is-danger"
          label="Çıkış Yap"
          icon-pack="fas"
          icon-left="sign-out-alt"
          @click="userLogout"
        ></b-button>
      </section>
      <hr class="solid mt-0" />
      <section>
        <div class="columns">
          <div class="column is-3">
            <div class="sidebar-page">
              <section class="sidebar-layout">
                <div
                  class="box has-background-primary-light"
                  style="height: 600px"
                >
                  <b-menu>
                    <b-menu-list label="Menu">
                      <b-button
                        class="has-text-left"
                        type="is-ghost"
                        icon-pack="fas"
                        icon-left="user"
                        label="Kullanıcı Bilgilerim"
                        tag="router-link"
                        :to="{
                          path: '/users/myaccount/profile',
                        }"
                      >
                      </b-button>
                      <b-menu-item
                        v-show="$store.state.user.role === 'admin'"
                        icon-pack="fas"
                        icon="cogs"
                        :active="isActive"
                        expanded
                      >
                        <template #label="props">
                          Admin Paneli
                          <b-icon
                            class="is-pulled-right"
                            :icon="props.expanded ? 'menu-down' : 'menu-up'"
                          ></b-icon>
                        </template>
                        <b-button
                          class="has-text-left"
                          type="is-ghost"
                          icon-pack="fas"
                          label="Dashboard"
                          icon-left="chart-line"
                          tag="router-link"
                          :to="{
                            path: '/users/myaccount/admin/dashboard',
                          }"
                        >
                        </b-button>
                        <b-button
                          class="has-text-left"
                          type="is-ghost"
                          icon-pack="fas"
                          label="Kullanıcı Yönetimi"
                          icon-left="users-cog"
                          tag="router-link"
                          :to="{
                            path: '/users/myaccount/admin/user_accounts',
                          }"
                        >
                        </b-button>
                        <b-button
                          class="has-text-left"
                          type="is-ghost"
                          icon-pack="fas"
                          label="Sipariş Yönetimi"
                          icon-left="truck-moving"
                          tag="router-link"
                          :to="{
                            path: '/users/myaccount/admin/order-management',
                          }"
                        >
                        </b-button>
                        <b-button
                          class="has-text-left"
                          type="is-ghost"
                          label="Hizmet Bedeli Tanımı"
                          icon-pack="fas"
                          icon-left="percent"
                          tag="router-link"
                          :to="{
                            path: '/users/myaccount/admin/service-fee',
                          }"
                        >
                        </b-button>
                      </b-menu-item>
                      <b-button
                        class="has-text-left"
                        type="is-ghost"
                        icon-pack="fas"
                        icon-left="unlock-alt"
                        label="Şifre Değiştirme"
                        tag="router-link"
                        to="/users/myaccount/change-password"
                      >
                      </b-button>
                      <b-button
                        class="has-text-left"
                        type="is-ghost"
                        icon-pack="fas"
                        label="Adreslerim"
                        icon-left="address-book"
                        tag="router-link"
                        :to="{
                          path: '/users/myaccount/addresses',
                        }"
                      >
                      </b-button>
                      <b-button
                        class="has-text-left"
                        type="is-ghost"
                        icon-pack="fas"
                        label="Siparişlerim"
                        icon-left="shopping-bag"
                        tag="router-link"
                        :to="{
                          path: '/users/myaccount/orders',
                        }"
                      >
                      </b-button>
                    </b-menu-list>
                    <b-menu-list>
                      <hr class="solid" />
                      <b-button
                        class="mt-6"
                        type="is-danger"
                        label="Çıkış Yap"
                        icon-pack="fas"
                        icon-left="sign-out-alt"
                        @click="userLogout"
                      ></b-button>
                    </b-menu-list>
                  </b-menu>
                </div>
              </section>
            </div>
          </div>
          <div class="column is-9 ml-3">
            <Nuxt keep-alive />
          </div>
        </div>
      </section>
    </section>
    <Footer />
  </section>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default {
  name: 'usermenu',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    userLogout() {
      const toastMsg = {
        type: 'is-success',
        duration: 5000,
        message: 'Uygulamadan başarıyla çıkış yapılmıştır.',
      }
      this.$store.commit('logout', toastMsg)
    },
    makeActive() {
      alert('makeActive çalışıyor tıklayınca')
      this.isActive = true
    },
  },
}
</script>

<style scoped>
/* Solid border */
hr.solid {
  border-top: 2px solid #8c67ef;
}
</style>
