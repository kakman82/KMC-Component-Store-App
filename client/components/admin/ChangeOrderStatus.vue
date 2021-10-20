<template>
  <b-field grouped position="is-centered">
    <b-select
      rounded
      size="is-small"
      :value="statusInfo"
      @input="setNewStatus($event)"
    >
      <option v-for="(status, index) in statuses" :key="index">
        {{ status }}
      </option>
    </b-select>
    <b-button
      rounded
      outlined
      :disabled="isDisabled"
      :loading="isLoading"
      type="is-primary is-small"
      @click="updateOrderStatus"
    >
      Değiştir
    </b-button>
  </b-field>
</template>

<script>
export default {
  name: 'ChangeOrderStatus',
  props: ['orderId', 'statusInfo'],
  emits: ['refresh-orders'],
  data() {
    return {
      isLoading: false,
      isDisabled: true,
      newStatus: '',
      statuses: [
        'Ödeme Bekliyor',
        'Tedarik Aşamasında',
        'Yola Çıktı',
        'Teslim Edildi',
        'İptal',
      ],
    }
  },
  methods: {
    setNewStatus(e) {
      this.isDisabled = false
      this.newStatus = e
    },
    async updateOrderStatus() {
      try {
        const reqData = {
          orderId: this.orderId,
          newStatus: this.newStatus,
        }
        this.isLoading = true
        const response = await this.$axios.$patch('/users/orders', reqData)
        if (response.success) {
          this.$emit('refresh-orders')
          this.isLoading = false
          this.isDisabled = true
          this.$buefy.toast.open({
            message: response.message,
            type: 'is-success',
          })
        }
      } catch (error) {
        this.isLoading = false
        this.isDisabled = true
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
