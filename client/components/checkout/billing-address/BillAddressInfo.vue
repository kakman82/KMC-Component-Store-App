<template>
  <section>
    <div class="card" v-if="address">
      <header class="card-header">
        <p
          class="
            card-header-title
            has-text-primary
            is-capitalized is-marginless
          "
        >
          {{ address.billType }}
        </p>

        <button class="button is-white" @click="onUpdate">
          <span class="icon">
            <i class="fas fa-edit has-text-primary"></i>
          </span>
        </button>
      </header>
      <UpdateBillAddress
        :addressData="address"
        :isOpen="openBillAddressUpdateFormModal"
        @close-modal="closeBillAddressUpdateFormModal"
      />

      <!-- Kurumsal Fatura Adres Bilgileri -->
      <div class="card-content" v-if="address.billType === 'kurumsal'">
        <p class="has-text-weight-bold">{{ address.companyName }}</p>
        <p class="has-text-weight-semibold">
          {{ address.companyTaxOffice }} Vergi Dairesi, VKNO:
          {{ address.companyTaxNumber }}
        </p>
        <p class="is-text-overflow is-capitalized">
          {{ address.neighbourhood }} {{ address.fullAddress }}
        </p>
        <p>{{ address.district }} / {{ address.province }}</p>
      </div>
      <!-- Bireysel Fatura Adres Bilgileri -->
      <div class="card-content" v-if="address.billType === 'bireysel'">
        <p class="has-text-weight-bold">{{ address.personFullName }}</p>
        <p class="has-text-weight-semibold">TCNO: {{ tckn }}</p>
        <p class="is-text-overflow is-capitalized">
          {{ address.neighbourhood }} {{ address.fullAddress }}
        </p>
        <p>{{ address.district }} / {{ address.province }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import UpdateBillAddress from './UpdateBillAddress.vue'
export default {
  name: 'BillAddressInfo',
  components: { UpdateBillAddress },
  props: ['address'],
  data() {
    return {
      openBillAddressUpdateFormModal: false,
    }
  },
  computed: {
    tckn() {
      let tcNumber = this.address.personIDNumber
      if (tcNumber) {
        let tcknArr = tcNumber.split('')
        for (let i = 3; i < 9; i++) {
          tcknArr[i] = '*'
        }
        return tcknArr.join('')
      } else {
        return
      }
    },
  },
  methods: {
    onUpdate() {
      this.openBillAddressUpdateFormModal = true
    },
    closeBillAddressUpdateFormModal() {
      this.openBillAddressUpdateFormModal = false
    },
  },
}
</script>

<style></style>
