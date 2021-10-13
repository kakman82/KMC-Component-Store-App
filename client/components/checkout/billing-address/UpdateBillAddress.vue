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
      <section class="modal-card-body" v-if="billAddressData">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <div v-if="serverErrMsg !== null">
            <b-message
              type="is-danger"
              has-icon
              icon-size="is-small"
              size="is-small"
              class="mb-2"
            >
              {{ serverErrMsg }}
            </b-message>
          </div>
          <!-- FATURA TİP SORUSU -->
          <p class="has-text-primary">Fatura Bilgileri</p>

          <ValidationProvider
            rules="required|oneOf:kurumsal,bireysel"
            v-slot="{ errors, valid }"
          >
            <b-field
              class="mb-5"
              label="Fatura Tipi"
              custom-class="is-small"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-radio v-model="radio" native-value="kurumsal" size="is-small">
                Kurumsal
              </b-radio>

              <b-radio v-model="radio" native-value="bireysel" size="is-small">
                Bireysel
              </b-radio>
            </b-field>
          </ValidationProvider>

          <!-- BİREYSEL FATURA -->
          <div v-show="radio === 'bireysel'" class="my-5">
            <ValidationProvider
              :rules="`${
                billAddressData.invoiceType === 'bireysel' ? 'required' : ''
              }`"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Fatura Ad ve Soyad"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.personFullName"
                  size="is-small"
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              :rules="`${
                billAddressData.invoiceType === 'bireysel'
                  ? 'required|tckn'
                  : ''
              }`"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="TC Kimlik No"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.personIDNumber"
                  size="is-small"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </div>
          <!-- KURUMSAL FATURA -->
          <div v-show="radio === 'kurumsal'" class="my-5">
            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Firma Adı"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.companyName"
                  size="is-small"
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider rules="required|vkn" v-slot="{ errors, valid }">
              <b-field
                label="Vergi No"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.companyTaxNumber"
                  size="is-small"
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Vergi Dairesi"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.companyTaxOffice"
                  size="is-small"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </div>

          <p class="has-text-primary">Fatura Adres Bilgileri</p>

          <!-- YENİ FATURA ADRES ALANLARI -->
          <div>
            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="İl"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="billAddressData.province"
                      size="is-small"
                      placeholder="İl seçimi"
                      expanded
                      @input="getDistricts"
                    >
                      <option
                        v-for="(province, index) in $store.state.addresses
                          .provinces"
                        :key="index"
                        :value="province"
                      >
                        {{ province }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
              </div>
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="İlçe"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="billAddressData.district"
                      size="is-small"
                      placeholder="İlçe seçimi"
                      expanded
                      :disabled="!billAddressData.province"
                      @input="getNeighbourhoods"
                    >
                      <option
                        v-for="(district, index) in $store.state.addresses
                          .districts"
                        :key="index"
                        :value="district"
                      >
                        {{ district }}
                      </option>
                    </b-select>
                  </b-field>
                </ValidationProvider>
              </div>
            </div>

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                class="mb-5"
                label="Mahalle"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-select
                  v-model="billAddressData.neighbourhood"
                  size="is-small"
                  placeholder="Mahalle seçimi"
                  expanded
                  :disabled="!billAddressData.district"
                >
                  <option
                    v-for="(neighbourhood, index) in $store.state.addresses
                      .neighbourhoods"
                    :key="index"
                    :value="neighbourhood"
                  >
                    {{ neighbourhood }}
                  </option>
                </b-select>
              </b-field>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Açık Adres"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="billAddressData.fullAddress"
                  size="is-small"
                  type="textarea"
                  maxlength="200"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </div>

          <b-button
            class="mt-5 is-primary has-text-weight-bold is-small"
            :loading="isLoading"
            expanded
            @click="handleSubmit(updateBillAddress)"
            >Kaydet</b-button
          >
        </ValidationObserver>
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
  props: ['isOpen', 'billAddressData'],
  emits: ['close-modal'],
  data() {
    return {
      serverErrMsg: null,
      isLoading: false,
      radio: this.billAddressData.billType,
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$store.dispatch('addresses/getProvinces')
        this.getDistricts()
        this.getNeighbourhoods()
      }
    },
  },
  methods: {
    getDistricts() {
      this.$store.dispatch(
        'addresses/getDistricts',
        this.billAddressData.province
      )
    },
    getNeighbourhoods() {
      const data = {
        province: this.billAddressData.province,
        district: this.billAddressData.district,
      }
      this.$store.dispatch('addresses/getNeighbourhoods', data)
    },
    async updateBillAddress() {
      const newBillAddressToUpdate = {
        billType: this.radio,
        companyName:
          this.radio === 'kurumsal'
            ? capitalizeEachWord(this.billAddressData.companyName)
            : '',
        companyTaxNumber:
          this.radio === 'kurumsal'
            ? this.billAddressData.companyTaxNumber
            : '',
        companyTaxOffice:
          this.radio === 'kurumsal'
            ? capitalizeEachWord(this.billAddressData.companyTaxOffice)
            : '',
        personFullName:
          this.radio === 'bireysel'
            ? capitalizeEachWord(this.billAddressData.personFullName)
            : '',
        personIDNumber:
          this.radio === 'bireysel' ? this.billAddressData.personIDNumber : '',
        province: this.billAddressData.province,
        district: this.billAddressData.district,
        neighbourhood: this.billAddressData.neighbourhood,
        fullAddress: this.billAddressData.fullAddress,
      }
      this.isLoading = true
      let response = ''
      try {
        response = await this.$axios.$patch(
          `/users/billingAddresses/${this.billAddressData._id}`,
          newBillAddressToUpdate
        )
        if (response.error && response.error.name === 'TokenExpiredError') {
          return this.$store.commit('logout', {
            type: 'is-danger',
            duration: 7000,
            message: `Oturum süresi dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!`,
          })
        }
        if (response.success) {
          this.isLoading = false
          this.close()
          this.$buefy.toast.open({
            type: 'is-success',
            duration: 3000,
            message: response.message,
          })

          this.$store.commit(
            'addresses/setUserBillingAddress',
            response.updatedAddress
          )
        }
      } catch (error) {
        this.isLoading = false
        if (response.error) {
          this.serverErrMsg = response.error.data.message
        } else {
          this.serverErrMsg = error.message
          console.log(error)
        }
      }
    },
    close() {
      this.$emit('close-modal')
      // reset state pttaddress data after closing
      this.$store.commit('addresses/resetPttAddresses')

      this.isLoading = false
    },
  },
}
</script>
<style></style>
