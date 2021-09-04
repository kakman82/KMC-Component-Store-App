<template>
  <div class="card m-5" style="width: 300px">
    <header class="card-header">
      <p class="card-header-title">
        <b-radio
          v-model="selected"
          :native-value="address"
          name="name"
          class="has-text-primary"
          @input="$store.commit('setSelectedAddress', selected)"
        >
          {{ address.title }}
        </b-radio>
      </p>
      <div class="buttons is-flex-wrap-nowrap is-justify-content-flex-end">
        <button class="button is-white p-2" @click="onUpdate(address._id)">
          <span class="icon">
            <i class="fas fa-edit has-text-primary"></i>
          </span>
        </button>
        <button class="button is-white p-2 mr-2" @click="onDelete(address._id)">
          <span class="icon">
            <i class="far fa-trash-alt has-text-danger"></i>
          </span>
        </button>
      </div>
    </header>

    <div class="card-content">
      <p class="has-text-weight-bold">{{ address.companyName }}</p>
      <p class="has-text-weight-semibold">
        {{ address.firstName }} {{ address.lastName }}
      </p>
      <p class="has-text-weight-light is-italic is-size-6">
        {{ address.phone }}
      </p>
      <p class="is-text-overflow">
        {{ address.neighbourhood }} {{ address.fullAddress }}
      </p>
      <p>{{ address.district }} / {{ address.province }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressList',
  props: ['address'],
  data() {
    return {
      selected: '',
    }
  },

  methods: {
    onUpdate(id) {
      // seçilen adresi id ile store dan updateforma getirmek için
      this.$store.commit('addressToUpdate', id)
      this.$store.commit('setAddressModalStatus', 'update')
    },
    onDelete(id) {
      this.$buefy.dialog.confirm({
        title: 'Adres sil?',
        message:
          'Kayıtlı adresi <b>silmek</b> istediğine emin misin? <br /> <u>Bu işlem geri alınamaz!</u>',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        confirmText: 'Sil',
        cancelText: 'Vazgeç',
        onConfirm: () => this.deleteAddress(id),
      })
    },
    async deleteAddress(addressId) {
      try {
        const response = await this.$axios.$delete(
          `/users/address/${addressId}`
        )
        if (response.success) {
          this.$store.commit('deleteAddress', addressId)
          this.$buefy.toast.open({
            type: 'is-success',
            duration: 5000,
            message: response.message,
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.is-text-overflow {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-header {
  word-break: break-all;
}
</style>
