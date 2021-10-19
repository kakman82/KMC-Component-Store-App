<template>
  <b-button
    rounded
    outlined
    :disabled="!newStatus"
    :loading="isLoading"
    type="is-primary is-small"
    @click="updateOrderStatus"
  >
    Kaydet
  </b-button>
</template>

<script>
export default {
  name: 'ChangeOrderStatus',
  props: ['orderId', 'newStatus'],
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    updateOrderStatus() {
      this.isLoading = true
      console.log('metod çalıştı: ', this.orderId, this.newStatus)
      this.isLoading = false
    },
  },
}
</script>

<style></style>
