<template>
  <section>
    <div v-if="validErrMsg !== null">
      <b-message
        type="is-danger"
        has-icon
        icon-size="is-small"
        size="is-small"
        class="mb-2"
      >
        {{ validErrMsg }}
      </b-message>
    </div>
    <b-field label="Şirket Adı" custom-class="is-small">
      <b-input
        v-model="companyName"
        required
        validation-message="Bu alan zorunludur."
        size="is-small"
      ></b-input>
    </b-field>

    <div class="columns">
      <div class="column">
        <b-field label="Ad" custom-class="is-small">
          <b-input
            v-model="firstName"
            size="is-small"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Soyad" custom-class="is-small">
          <b-input
            v-model="lastName"
            size="is-small"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
       
    </div>

    <div class="columns">
      <div class="column">
        <b-field
          label="Telefon"
          custom-class="is-small"
          :type="phoneFieldValidation.type"
          :message="phoneFieldValidation.errMsg"
        >
          <b-input
            v-model="phone"
            v-cleave="phoneNumber"
            size="is-small"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="İl" custom-class="is-small">
          <b-select
            v-model="selectedProvince"
            size="is-small"
            placeholder="İl seçimi"
            expanded
            required
            validation-message="Bu alan zorunludur."
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
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <b-field label="İlçe" custom-class="is-small">
          <b-select
            v-model="selectedDistrict"
            size="is-small"
            placeholder="İlçe seçimi"
            expanded
            required
            validation-message="Bu alan zorunludur."
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
      </div>
      <div class="column">
        <b-field label="Mahalle" custom-class="is-small">
          <b-select
            v-model="selectedNeighbourhood"
            size="is-small"
            placeholder="Mahalle seçimi"
            expanded
            required
            validation-message="Bu alan zorunludur."
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
      </div>
    </div>

    <b-field label="Açık Adres" custom-class="is-small">
      <b-input
        v-model="fullAddress"
        size="is-small"
        maxlength="200"
        type="textarea"
        required
        validation-message="Bu alan zorunludur."
      ></b-input>
    </b-field>

    <b-field label="Adres Başlığı" custom-class="is-small">
      <b-input
        v-model="addressTitle"
        required
        validation-message="Bu alan zorunludur."
        size="is-small"
      ></b-input>
    </b-field>

    <b-button
      class="mt-6 is-primary has-text-weight-bold is-small"
      expanded
      @click="addAddress"
      >Adres Ekle</b-button
    >
  </section>
</template>

<script>
import Cleave from '../../node_modules/cleave.js' // npm install cleave.js
import '../../node_modules/cleave.js/dist/addons/cleave-phone.tr'
import Cookie from 'js-cookie'

const cleave = {
  name: 'cleave',
  bind(el, binding) {
    const input = el.querySelector('input')
    input._vCleave = new Cleave(input, binding.value)
  },
  unbind(el) {
    const input = el.querySelector('input')
    input._vCleave.destroy()
  },
}
export default {
  name: 'AddAddress',
  directives: { cleave },
  emits: ['closeAddAddressModal'],
  data() {
    return {
      validErrMsg: null,
      phoneFieldValidation: {
        type: '',
        errMsg: '',
      },
      companyName: '',
      firstName: '',
      lastName: '',
      phone: null,
      phoneNumber: {
        phone: true,
        phoneRegionCode: 'TR',
        blocks: [4, 3, 2, 2],
        prefix: '0',
      },
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
    checkPhoneFieldValidation(e) {
      console.log('event: ', e)
      console.log('v-model phone: ', this.phone)
      console.log('length: ', this.phone.length)
    },
    validation() {
      if (
        !this.companyName ||
        !this.firstName ||
        !this.lastName ||
        !this.phone ||
        this.phone.length < 14 ||
        !this.selectedProvince ||
        !this.selectedDistrict ||
        !this.selectedNeighbourhood ||
        !this.fullAddress ||
        !this.addressTitle
      ) {
        return false
      } else {
        return true
      }
    },
    async addAddress() {
      if (this.phone && this.phone.length !== 14) {
        const validationResult = {
          type: 'is-danger',
          errMsg: 'Başında 0 olarak 11 haneli tel no girilmelidir!',
        }
        return (this.phoneFieldValidation = validationResult)
      }

      if (!this.validation()) {
        return (this.validErrMsg =
          'Tüm alanlar istenen bilgiler ile doldurulmalıdır!')
      }

      let response = ''
      try {
        const newAddress = {
          firstName: this.firstName,
          lastName: this.lastName,
          companyName: this.companyName,
          phone: this.phone,
          province: this.selectedProvince,
          district: this.selectedDistrict,
          neighbourhood: this.selectedDistrict,
          fullAddress: this.fullAddress,
          title: this.addressTitle,
        }
        const token = Cookie.get('access_token')
        response = await this.$axios.$post('/users/addresses', newAddress, {
          // server tarafın user bilgisine ulaşabilmesi için -isLoggedIn metodu -
          // tokenı headers a set edip gönderiyorum
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        if (response.success) {
          this.$emit('closeAddAddressModal')
          this.$buefy.toast.open({
            type: 'is-success',
            message: response.message,
          })
          this.firstName = ''
          this.lastName = ''
          this.companyName = ''
          this.phone = ''
          this.selectedProvince = ''
          this.selectedDistrict = ''
          this.selectedDistrict = ''
          this.fullAddress = ''
          this.addressTitle = ''
        }
      } catch (error) {
        this.validErrMsg = response.message
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
