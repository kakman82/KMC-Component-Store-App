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
      <ValidationProvider rules="required" v-slot="{ errors, valid }">
        <b-field
          label="Şirket Adı"
          custom-class="is-small"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input v-model="companyName" size="is-small"></b-input>
        </b-field>
      </ValidationProvider>

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
          <b-input v-model="addressTitle" size="is-small"></b-input>
        </b-field>
      </ValidationProvider>

      <b-button
        class="mt-6 is-primary has-text-weight-bold is-small"
        expanded
        @click="handleSubmit(submit)"
        >Adres Güncelle</b-button
      >
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cookie from 'js-cookie'
import lodash from '../../node_modules/lodash-es'

export default {
  name: 'UpdateAddress',
  components: { ValidationObserver, ValidationProvider },

  data() {
    return {
      serverErrMsg: null,
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
  async created() {
    try {
      const res = await this.$axios.$get('/pttAddresses/provinces')
      if (res.success) {
        this.provinces = res.provinces
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async getDistricts() {
      try {
        const res = await this.$axios.$get(
          `/pttAddresses/${this.selectedProvince}`
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
          `/pttAddresses/${this.selectedProvince}/${this.selectedDistrict}`
        )
        if (res.success) {
          this.neighbourhoods = res.neighbourhoods
        }
      } catch (error) {
        console.log(error)
      }
    },
    async submit() {
      let response = ''
      try {
        const newAddress = {
          firstName: lodash.capitalize(this.firstName),
          lastName: lodash.capitalize(this.lastName),
          companyName: lodash.capitalize(this.companyName),
          phone: this.phone,
          province: lodash.capitalize(this.selectedProvince),
          district: lodash.capitalize(this.selectedDistrict),
          neighbourhood: lodash.capitalize(this.selectedNeighbourhood),
          fullAddress: lodash.capitalize(this.fullAddress),
          title: lodash.capitalize(this.addressTitle),
        }
        const token = Cookie.get('access_token')
        response = await this.$axios.$post('/users/addresses', newAddress, {
          // server tarafın user bilgisine ulaşabilmesi için -isLoggedIn metodu -
          // tokenı headers a set edip gönderiyorum
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        if (response.error && response.error.name === 'TokenExpiredError') {
          return this.$store.commit('logout', {
            type: 'is-danger',
            duration: 7000,
            message: `Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!`,
          })
        }
        if (response.success) {
          this.$store.commit('addUserAddress', newAddress)
          this.$store.commit('resetAddressModalStatus', 'add')
          this.$buefy.toast.open({
            type: 'is-success',
            duration: 3000,
            message: response.message,
          })
          this.firstName = ''
          this.lastName = ''
          this.companyName = ''
          this.phone = ''
          this.selectedProvince = ''
          this.selectedDistrict = ''
          this.selectedNeighbourhood = ''
          this.fullAddress = ''
          this.addressTitle = ''
        }
      } catch (error) {
        if (response.error) {
          this.serverErrMsg = response.error.data.message
        }
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
