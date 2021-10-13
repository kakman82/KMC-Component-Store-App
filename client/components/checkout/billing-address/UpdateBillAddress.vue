<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Fatura Adresini Güncelle
        </p>

        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <p>React öğreneceğim...</p>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-small" @click="close">Kapat</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { capitalizeEachWord } from '../../../plugins/formatHelper'
export default {
  name: 'UpdateBillAddress',
  components: { ValidationObserver, ValidationProvider },
  props: ['isOpen', 'addressData'],
  emits: ['close-modal'],
  data() {
    return {
      serverErrMsg: null,
      isLoading: false,
      invoiceType: '',
      fullName: '',
      tcNumber: '',
      companyName: '',
      taxNumber: '',
      taxOffice: '',
      sameAsDeliveryAddress: '',
      selectedProvince: '',
      selectedDistrict: '',
      selectedNeighbourhood: '',
      fullAddress: '',
    }
  },
  methods: {
    close() {
      this.$emit('close-modal')
    },
  },
  //   computed: {
  //     deliveryAddress() {
  //       if (this.sameAsDeliveryAddress === 'evet') {
  //         return this.$store.getters['addresses/getSelectedDeliveryAddress']
  //       } else {
  //         return {}
  //       }
  //     },
  //   },
  //   watch: {
  //     sameAsDeliveryAddress(newVal) {
  //       newVal === 'hayır' ? this.$store.dispatch('addresses/getProvinces') : ''
  //     },
  //   },
  //   methods: {
  //     getDistricts() {
  //       this.$store.dispatch('addresses/getDistricts', this.selectedProvince)
  //     },
  //     getNeighbourhoods() {
  //       const data = {
  //         province: this.selectedProvince,
  //         district: this.selectedDistrict,
  //       }
  //       this.$store.dispatch('addresses/getNeighbourhoods', data)
  //     },
  //     async createBillAddress() {
  //       const newBillAddress = {
  //         billType: this.invoiceType,
  //         companyName: capitalizeEachWord(this.companyName),
  //         companyTaxNumber: this.taxNumber,
  //         companyTaxOffice: capitalizeEachWord(this.taxOffice),
  //         personFullName: capitalizeEachWord(this.fullName),
  //         personIDNumber: this.tcNumber,
  //         province:
  //           this.sameAsDeliveryAddress === 'evet'
  //             ? this.deliveryAddress.province
  //             : this.selectedProvince,
  //         district:
  //           this.sameAsDeliveryAddress === 'evet'
  //             ? this.deliveryAddress.district
  //             : this.selectedDistrict,
  //         neighbourhood:
  //           this.sameAsDeliveryAddress === 'evet'
  //             ? this.deliveryAddress.neighbourhood
  //             : this.selectedNeighbourhood,
  //         fullAddress:
  //           this.sameAsDeliveryAddress === 'evet'
  //             ? this.deliveryAddress.fullAddress
  //             : this.fullAddress,
  //       }
  //       this.isLoading = true
  //       let response = ''
  //       try {
  //         response = await this.$axios.$post(
  //           '/users/billingAddresses',
  //           newBillAddress
  //         )
  //         if (response.error && response.error.name === 'TokenExpiredError') {
  //           return this.$store.commit('logout', {
  //             type: 'is-danger',
  //             duration: 7000,
  //             message: `Oturum süresi dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!`,
  //           })
  //         }
  //         if (response.success) {
  //           this.isLoading = false
  //           this.close()
  //           this.$buefy.toast.open({
  //             type: 'is-success',
  //             duration: 3000,
  //             message: response.message,
  //           })

  //           this.$store.commit(
  //             'addresses/setUserBillingAddress',
  //             response.billAddress
  //           )
  //         }
  //       } catch (error) {
  //         this.isLoading = false
  //         if (response.error) {
  //           this.serverErrMsg = response.error.data.message
  //         } else {
  //           this.serverErrMsg = error.message
  //           console.log(error)
  //         }
  //       }
  //     },
  //     close() {
  //       this.$store.commit('addresses/showModal', {
  //         type: 'showAddBillingAddress',
  //         action: false,
  //       })
  //       // reset state pttaddress data after closing
  //       this.$store.commit('addresses/resetPttAddresses')

  //       this.isLoading = false
  //       this.invoiceType = ''
  //       this.fullName = ''
  //       this.tcNumber = ''
  //       this.companyName = ''
  //       this.taxNumber = ''
  //       this.taxOffice = ''
  //       this.sameAsDeliveryAddress = ''
  //       this.selectedProvince = ''
  //       this.selectedDistrict = ''
  //       this.selectedNeighbourhood = ''
  //       this.fullAddress = ''
  //     },
  //   },
}
</script>
<style></style>
