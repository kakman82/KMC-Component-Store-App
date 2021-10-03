<template>
  <div class="box">
    <article class="message is-info" v-show="$route.path === '/checkout'">
      <div class="message-body">
        Kayıtlı teslimat adreslerinden birini seçerek ilerleyebilirsin.
      </div>
    </article>
    <button
      class="button is-primary is-small"
      @click="
        $store.commit('addresses/showModal', {
          type: 'showAddDeliveryAddress',
          action: true,
        })
      "
    >
      <span class="icon">
        <i class="fas fa-edit"></i>
      </span>
      <span>Yeni Adres Ekle</span>
    </button>

    <AddAddress />

    <section class="hero" v-show="getUserDeliveryAddresses.length === 0">
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
        v-for="(addressData, index) in getUserDeliveryAddresses"
        :key="index"
        :address="addressData"
      />
    </div>
  </div>
</template>

<script>
import AddressList from './delivery-address/AddressList.vue'
import AddAddress from './delivery-address/AddAddress.vue'

export default {
  name: 'StepDeliveryAddress',
  components: { AddressList, AddAddress },
  computed: {
    getUserDeliveryAddresses() {
      return this.$store.state.addresses.deliveryAddresses
    },
  },
}
</script>

<style></style>
