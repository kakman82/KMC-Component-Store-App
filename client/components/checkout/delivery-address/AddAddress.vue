<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Yeni Teslimat Adresi Ekle
        </p>

        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <section>
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

            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Teslim Edilecek Kişi Ad"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="firstName" size="is-small"></b-input>
                  </b-field>
                </ValidationProvider>
              </div>
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Teslim Edilecek Kişi Soyad"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="lastName" size="is-small"></b-input>
                  </b-field>
                </ValidationProvider>
              </div>
               
            </div>

            <div class="columns">
              <div class="column">
                <ValidationProvider
                  rules="required|phone"
                  v-slot="{ errors, valid }"
                >
                  <b-field
                    label="Telefon"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input v-model="phone" size="is-small"></b-input>
                  </b-field>
                </ValidationProvider>
              </div>
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="İl"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="selectedProvince"
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
            </div>

            <div class="columns">
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="İlçe"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="selectedDistrict"
                      size="is-small"
                      placeholder="İlçe seçimi"
                      expanded
                      :disabled="!selectedProvince"
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
              <div class="column">
                <ValidationProvider rules="required" v-slot="{ errors, valid }">
                  <b-field
                    label="Mahalle"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-select
                      v-model="selectedNeighbourhood"
                      size="is-small"
                      placeholder="Mahalle seçimi"
                      expanded
                      :disabled="!selectedDistrict"
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
              </div>
            </div>
            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Açık Adres"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="fullAddress"
                  size="is-small"
                  type="textarea"
                  maxlength="200"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider rules="required" v-slot="{ errors, valid }">
              <b-field
                label="Adres Başlığı"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  v-model="addressTitle"
                  size="is-small"
                  maxlength="25"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <b-button
              class="mt-5 is-primary has-text-weight-bold is-small"
              expanded
              :loading="isLoading"
              @click="handleSubmit(submit)"
              >Kaydet</b-button
            >
          </section>
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

export default {
  name: 'AddAddress',
  components: { ValidationObserver, ValidationProvider },

  data() {
    return {
      serverErrMsg: null,
      isLoading: false,
      firstName: '',
      lastName: '',
      phone: null,
      selectedProvince: '',
      selectedDistrict: '',
      selectedNeighbourhood: '',
      fullAddress: '',
      addressTitle: '',
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.addresses.modalForms.showAddDeliveryAddress
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal === true) {
        this.$store.dispatch('addresses/getProvinces')
      }
    },
  },
  created() {
    //this.$store.dispatch('addresses/getProvinces')
  },
  methods: {
    close() {
      this.$store.commit('addresses/showModal', {
        type: 'showAddDeliveryAddress',
        action: false,
      })
      // reset state pttaddress data after closing
      this.$store.commit('addresses/resetPttAddresses')
    },
    getDistricts() {
      this.$store.dispatch('addresses/getDistricts', this.selectedProvince)
    },
    getNeighbourhoods() {
      const data = {
        province: this.selectedProvince,
        district: this.selectedDistrict,
      }
      this.$store.dispatch('addresses/getNeighbourhoods', data)
    },
    async submit() {
      this.isLoading = true
      let response = ''
      try {
        const newDeliveryAddress = {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          province: this.selectedProvince,
          district: this.selectedDistrict,
          neighbourhood: this.selectedNeighbourhood,
          fullAddress: this.fullAddress,
          title: this.addressTitle,
        }
        response = await this.$axios.$post(
          '/users/deliveryAddresses',
          newDeliveryAddress
        )
        if (response.error && response.error.name === 'TokenExpiredError') {
          return this.$store.commit('logout', {
            type: 'is-danger',
            duration: 7000,
            message: `Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!`,
          })
        }

        if (response.success) {
          this.$store.commit(
            'addresses/addUserDeliveryAddress',
            response.address
          )
          this.isLoading = false
          this.$store.commit('addresses/showModal', {
            type: 'showAddDeliveryAddress',
            value: false,
          })
          this.$buefy.toast.open({
            type: 'is-success',
            duration: 3000,
            message: response.message,
          })
          this.firstName = ''
          this.lastName = ''
          this.phone = ''
          this.selectedProvince = ''
          this.selectedDistrict = ''
          this.selectedNeighbourhood = ''
          this.fullAddress = ''
          this.addressTitle = ''
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
  },
}
</script>

<style></style>
