<template>
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
              label="Ad"
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
              label="Soyad"
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
          <ValidationProvider rules="required|phone" v-slot="{ errors, valid }">
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
                  v-for="(province, index) in provinces"
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
                @input="getNeighbourhoods"
              >
                <option
                  v-for="(district, index) in districts"
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
              >
                <option
                  v-for="(neighbourhood, index) in neighbourhoods"
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
        class="mt-6 is-primary has-text-weight-bold is-small"
        expanded
        :loading="isLoading"
        @click="handleSubmit(submit)"
        >Kaydet</b-button
      >
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'UpdateAddress',
  components: { ValidationObserver, ValidationProvider },

  data() {
    return {
      serverErrMsg: null,
      isLoading: false,
      companyName: '',
      firstName: '',
      lastName: '',
      phone: null,
      provinces: [],
      districts: [],
      neighbourhoods: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedNeighbourhood: '',
      fullAddress: '',
      addressTitle: '',
    }
  },
  computed: {
    currentAddress() {
      return this.$store.getters['getAddressToUpdate'][0]
    },
  },
  created() {
    this.firstName = this.currentAddress.firstName
    this.lastName = this.currentAddress.lastName
    this.phone = this.currentAddress.phone
    this.selectedProvince = this.currentAddress.province
    this.selectedDistrict = this.currentAddress.district
    this.selectedNeighbourhood = this.currentAddress.neighbourhood
    this.fullAddress = this.currentAddress.fullAddress
    this.addressTitle = this.currentAddress.title

    this.getProvinces()
    this.getDistricts()
    this.getNeighbourhoods()
  },

  methods: {
    async getProvinces() {
      try {
        const res = await this.$axios.$get('/users/pttAddresses/provinces')
        if (res.success) {
          this.provinces = res.provinces
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getDistricts() {
      try {
        const res = await this.$axios.$get(
          `/users/pttAddresses/${this.selectedProvince}`
        )
        if (res.success) {
          this.districts = res.districts
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getNeighbourhoods() {
      try {
        const res = await this.$axios.$get(
          `/users/pttAddresses/${this.selectedProvince}/${this.selectedDistrict}`
        )
        if (res.success) {
          this.neighbourhoods = res.neighbourhoods
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submit() {
      this.isLoading = true
      let response = ''
      try {
        const addressToUpdate = {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          province: this.selectedProvince,
          district: this.selectedDistrict,
          neighbourhood: this.selectedNeighbourhood,
          fullAddress: this.fullAddress,
          title: this.addressTitle,
        }

        response = await this.$axios.$patch(
          `/users/address/${this.currentAddress._id}`,
          addressToUpdate
        )

        if (response.error && response.error.name === 'TokenExpiredError') {
          return this.$store.commit('logout', {
            type: 'is-danger',
            duration: 7000,
            message: `Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!`,
          })
        }
        if (response.success) {
          this.$store.commit('updateUserAddress', response.updatedAddress)
          this.$store.commit('resetAddressModalStatus', 'update')
          this.isLoading = false
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
          return (this.serverErrMsg = response.error.data.message)
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
