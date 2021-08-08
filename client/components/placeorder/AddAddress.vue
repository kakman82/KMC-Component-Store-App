<template>
  <section>
    <div>
      <b-message
        v-if="serverErrMsg"
        type="is-danger"
        has-icon
        icon-size="is-medium"
      >
        Hata Mesajı!
      </b-message>
    </div>
    <b-field label="Şirket Adı" custom-class="is-small">
      <b-input
        required
        validation-message="Bu alan zorunludur."
        size="is-small"
      ></b-input>
    </b-field>

    <div class="columns">
      <div class="column">
        <b-field label="Ad" custom-class="is-small">
          <b-input
            size="is-small"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Soyad" custom-class="is-small">
          <b-input
            size="is-small"
            required
            validation-message="Bu alan zorunludur."
          ></b-input>
        </b-field>
      </div>
       
    </div>

    <div class="columns">
      <div class="column">
        <b-field label="Telefon" custom-class="is-small">
          <b-input
            v-cleave="phoneNumber"
            size="is-small"
            required
            minlength="14"
            maxlength="14"
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
          <b-select size="is-small" placeholder="Mahalle seçimi" expanded>
            <option value="flint">Adil Mah</option>
            <option value="silver">Güçlü Kaya</option>
          </b-select>
        </b-field>
      </div>
    </div>

    <b-field label="Açık Adres" custom-class="is-small">
      <b-input
        size="is-small"
        maxlength="200"
        type="textarea"
        required
        validation-message="Bu alan zorunludur."
      ></b-input>
    </b-field>

    <b-field label="Adres Başlığı (İş yeri, depo, ...)" custom-class="is-small">
      <b-input
        required
        validation-message="Bu alan zorunludur."
        size="is-small"
      ></b-input>
    </b-field>

    <b-button class="mt-6 is-primary has-text-weight-bold is-small" expanded
      >Adres Ekle</b-button
    >
  </section>
</template>

<script>
import Cleave from '../../node_modules/cleave.js' // npm install cleave.js
import '../../node_modules/cleave.js/dist/addons/cleave-phone.tr'

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
  data() {
    return {
      serverErrMsg: '',
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
  },
}
</script>

<style></style>
