<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Fatura Adresi Oluştur
        </p>

        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
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
            <ValidationProvider rules="required|vkn" v-slot="{ errors, valid }">
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
  name: 'AddBillAddress',
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
    isOpen() {
      return this.$store.state.addresses.modalForms.showAddBillingAddress
    },
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
  },
}
</script>
<style></style>
