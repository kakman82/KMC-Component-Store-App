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

    <AddressModal />

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
      <AddressList
        v-for="(addressData, index) in getAddresses"
        :key="index"
        :address="addressData"
      />
    </div>
  </div>
</template>

<script>
import AddressList from './AddressList.vue'
import AddressModal from './AddressModal.vue'

export default {
  name: 'StepAddress',
  components: { AddressList, AddressModal },
  computed: {
    getAddresses() {
      return this.$store.getters['getUserAddresses']
    },
  },
}
</script>

<style></style>
