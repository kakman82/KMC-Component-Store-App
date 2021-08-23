<template>
  <section>
    <Navbar />
    <section class="section is-small">
      <section class="section">
        <h1 class="title has-text-primary">Kullanıcı Hesabım</h1>
        <hr class="solid" />
      </section>
      <section class="section">
        <div class="columns">
          <div class="column is-3">
            <div class="sidebar-page">
              <section class="sidebar-layout">
                <div class="box">
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
                        icon-pack="fas"
                        icon="users-cog"
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
                        <b-menu-item
                          icon="account"
                          label="Dashboard"
                        ></b-menu-item>

                        <b-menu-item
                          icon="cash-multiple"
                          label="Kullanıcı Yönetimi"
                        ></b-menu-item>
                        <b-menu-item
                          icon="cash-multiple"
                          label="Hizmet Bedeli Tanımı"
                        ></b-menu-item>
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
                      <b-menu-item
                        label="Adreslerim"
                        icon-pack="fas"
                        icon="address-book"
                        tag="router-link"
                        to="/users/myaccount/profile"
                      ></b-menu-item>
                    </b-menu-list>
                    <b-menu-list>
                      <b-menu-item
                        label="Siparişlerim ESKİ"
                        icon-pack="fas"
                        icon="shopping-bag"
                      ></b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="_____">
                      <b-button
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
