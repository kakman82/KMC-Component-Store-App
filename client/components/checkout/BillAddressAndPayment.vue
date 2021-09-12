<template>
  <div class="box">
    <article class="message is-info" v-show="$route.path === '/checkout'">
      <div class="message-body">
        Kayıtlı fatura adresi yoksa yenisi oluşturarak ve ödeme yöntemini de
        belirleyerek ilerleyebilirsin.
      </div>
    </article>

    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Fatura Adresi</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
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
                <b-radio
                  v-model="invoiceType"
                  native-value="kurumsal"
                  size="is-small"
                >
                  Kurumsal
                </b-radio>

                <b-radio
                  v-model="invoiceType"
                  native-value="bireysel"
                  size="is-small"
                >
                  Bireysel
                </b-radio>
              </b-field>
            </ValidationProvider>

            <!-- BİREYSEL FATURA -->
            <div v-if="invoiceType === 'bireysel'" class="my-5">
              <ValidationProvider
                :rules="`${invoiceType === 'bireysel' ? 'required' : ''}`"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Ad ve Soyad"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input v-model="fullName" size="is-small"></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                :rules="`${invoiceType === 'bireysel' ? 'required|tckn' : ''}`"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="TC Kimlik No"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input v-model="tcNumber" size="is-small"></b-input>
                </b-field>
              </ValidationProvider>
            </div>
            <!-- KURUMSAL FATURA -->
            <div v-if="invoiceType === 'kurumsal'" class="my-5">
              <ValidationProvider rules="required" v-slot="{ errors, valid }">
                <b-field
                  label="Firma Adı"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input v-model="companyName" size="is-small"></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required|vkn"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Vergi No"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input v-model="taxNumber" size="is-small"></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors, valid }">
                <b-field
                  label="Vergi Dairesi"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input v-model="taxOffice" size="is-small"></b-input>
                </b-field>
              </ValidationProvider>
            </div>

            <!-- TESLİMAT ADRESİ İLE AYNI MI SORUSU -->
            <p class="has-text-primary">Fatura Adres Bilgileri</p>

            <ValidationProvider
              rules="required|oneOf:evet,hayır"
              v-slot="{ errors, valid }"
            >
              <b-field
                class="mb-5"
                label="Fatura adresi teslimat adresi ile aynı mı?"
                custom-class="is-small"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-radio
                  v-model="sameAsDeliveryAddress"
                  native-value="evet"
                  size="is-small"
                >
                  Evet
                </b-radio>

                <b-radio
                  v-model="sameAsDeliveryAddress"
                  native-value="hayır"
                  size="is-small"
                >
                  Hayır
                </b-radio>
              </b-field>
            </ValidationProvider>

            <!-- FATURA ADRESİ İLE TESLİMAT ADRESİ AYNI ISE ADRES GÖSTERİMİ -->
            <div v-if="sameAsDeliveryAddress === 'evet'">
              <div class="columns">
                <div class="column">
                  <b-field label="İl" custom-class="is-small" disabled>
                    <b-input
                      :value="deliveryAddress.province"
                      disabled
                      size="is-small"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field label="İlçe" custom-class="is-small" disabled>
                    <b-input
                      :value="deliveryAddress.district"
                      disabled
                      size="is-small"
                    ></b-input>
                  </b-field>
                </div>
              </div>
              <b-field label="Mahalle" custom-class="is-small" disabled>
                <b-input
                  :value="deliveryAddress.neighbourhood"
                  disabled
                  size="is-small"
                ></b-input>
              </b-field>

              <b-field label="Açık Adres" custom-class="is-small">
                <b-input
                  :value="deliveryAddress.fullAddress"
                  size="is-small"
                  type="textarea"
                  disabled
                ></b-input>
              </b-field>
            </div>

            <!-- YENİ FATURA ADRES ALANLARI -->
            <div v-if="sameAsDeliveryAddress === 'hayır'">
              <div class="columns">
                <div class="column">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
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
                <div class="column">
                  <ValidationProvider
                    rules="required"
                    v-slot="{ errors, valid }"
                  >
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
                    v-model="selectedNeighbourhood"
                    size="is-small"
                    placeholder="Mahalle seçimi"
                    expanded
                    :disabled="!selectedDistrict"
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

              <ValidationProvider rules="required" v-slot="{ errors, valid }">
                <b-field
                  label="Açık Adres"
                  custom-class="is-small"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    v-model="selectedFullAddress"
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
              @click="handleSubmit(createBillAddress)"
              >Kaydet</b-button
            >
          </ValidationObserver>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">Save</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </b-collapse>

    <b-collapse class="card mt-6" animation="slide" aria-id="contentIdForA11y3">
      <template #trigger="props">
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
          <p class="card-header-title">Ödeme Türü</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
      </template>

      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
          <a>#buefy</a>.
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">Save</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </b-collapse>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'BillAddressAndPayment',
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      invoiceType: '',
      fullName: '',
      tcNumber: null,
      companyName: '',
      taxNumber: null,
      taxOffice: null,
      isLoading: false,
      sameAsDeliveryAddress: '',
      provinces: [],
      districts: [],
      neighbourhoods: [],
      selectedProvince: '',
      selectedDistrict: '',
      selectedNeighbourhood: '',
      fullAddress: '',
    }
  },
  computed: {
    deliveryAddress() {
      if (this.sameAsDeliveryAddress === 'evet') {
        return this.$store.getters['getSelectedAddress'][0]
      } else {
        return {}
      }
    },
  },
  watch: {
    sameAsDeliveryAddress(newVal) {
      newVal === 'hayır' ? this.getProvinces() : ''
    },
  },
  methods: {
    createBillAddress() {
      alert('metod çalıştı')
    },
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
  },
}
</script>
