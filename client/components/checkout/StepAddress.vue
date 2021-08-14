<template>
  <div class="box">
    <article class="message is-info">
      <div class="message-body">
        Kayıtlı teslimat adreslerinden birini seçerek onay kısmına
        ilerleyebilirsin.
      </div>
    </article>
    <button
      class="button is-primary is-small"
      @click="$store.commit('setAddressModalStatus', 'add')"
    >
      <span class="icon">
        <i class="fas fa-edit"></i>
      </span>
      <span>Yeni Adres Ekle</span>
    </button>
    <div
      class="modal"
      :class="{ 'is-active': $store.state.openAddAddressModal }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title is-size-5 has-text-weight-bold">
            Yeni Adres Oluştur
          </p>

          <button
            class="delete"
            aria-label="close"
            @click="$store.commit('resetAddressModalStatus', 'add')"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Add New Address -->
          <AddAddress />
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button
            class="button is-small"
            @click="$store.commit('resetAddressModalStatus', 'add')"
          >
            Kapat
          </button>
        </footer>
      </div>
    </div>
    <section class="hero" v-show="getAddresses.length === 0">
      <div class="hero-body">
        <article class="message is-warning">
          <div class="message-header">
            <p>Dikkat!</p>
          </div>
          <div class="message-body">
            Kayıtlı teslimat adresi bulunmamaktadır. <br />
            <strong>Yeni Adres Ekle</strong> butonu yardımıyla teslimat adresi
            ekleyebilirsin.
          </div>
        </article>
      </div>
    </section>
    <div class="is-flex is-flex-wrap-wrap">
      <DeliveryAddresses
        v-for="(data, index) in getAddresses"
        :key="index"
        :address="data"
      />
    </div>
  </div>
</template>

<script>
import DeliveryAddresses from './DeliveryAddresses.vue'
import AddAddress from './AddAddress.vue'

export default {
  name: 'StepAddress',
  components: { DeliveryAddresses, AddAddress },
  computed: {
    getAddresses() {
      return this.$store.getters['getUserAddresses']
    },
  },
}
</script>

<style></style>
