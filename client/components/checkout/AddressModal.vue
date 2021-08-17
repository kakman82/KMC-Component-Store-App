<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          {{ modalHeader }}
        </p>

        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <AddAddress v-if="modalType === 'add'" />
        <UpdateAddress v-if="modalType === 'update'" />
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-small" @click="close">Kapat</button>
      </footer>
    </div>
  </div>
</template>

<script>
import AddAddress from './AddAddress.vue'
import UpdateAddress from './UpdateAddress.vue'
export default {
  name: 'AddressModal',
  components: { AddAddress, UpdateAddress },

  computed: {
    modalType() {
      return this.$store.getters['getModalType']
    },
    isOpen() {
      if (this.modalType === 'add' || this.modalType === 'update') {
        return true
      } else {
        return false
      }
    },
    modalHeader() {
      if (this.modalType === 'add') {
        return 'Yeni Adres Ekle'
      }
      if (this.modalType === 'update') {
        return 'Adresi Düzenle'
      }
    },
  },
  methods: {
    close() {
      this.$store.commit('resetAddressModalStatus', this.modalType)
    },
  },
}
</script>

<style></style>
