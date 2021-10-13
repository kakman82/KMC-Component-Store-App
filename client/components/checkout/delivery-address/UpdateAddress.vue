<template>
  <div
    class="modal"
    :class="{
      'is-active': isOpen,
    }"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-text-centered">
        <p class="modal-card-title is-size-5 has-text-weight-bold">
          Teslimat Adresini Düzenle
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
                    label="Ad"
                    custom-class="is-small"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <b-input
                      v-model="addressData.firstName"
                      size="is-small"
                    ></b-input>
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
                    <b-input
                      v-model="addressData.lastName"
                      size="is-small"
                    ></b-input>
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
                    <b-input
                      v-model="addressData.phone"
                      size="is-small"
                    ></b-input>
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
                      v-model="addressData.province"
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
                      v-model="addressData.district"
                      size="is-small"
                      placeholder="İlçe seçimi"
                      expanded
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
                      v-model="addressData.neighbourhood"
                      size="is-small"
                      placeholder="Mahalle seçimi"
                      expanded
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
                  v-model="addressData.fullAddress"
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
                  v-model="addressData.title"
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
  name: 'UpdateAddress',
  components: { ValidationObserver, ValidationProvider },
  props: ['isOpen', 'addressData'],
  emits: ['close-modal'],

  data() {
    return {
      serverErrMsg: null,
      isLoading: false,
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal === true) {
        this.$store.dispatch('addresses/getProvinces')

        this.$store.dispatch(
          'addresses/getDistricts',
          this.addressData.province
        )
        const data = {
          province: this.addressData.province,
          district: this.addressData.district,
        }
        this.$store.dispatch('addresses/getNeighbourhoods', data)
      }
    },
  },

  methods: {
    close() {
      this.$emit('close-modal')
      // reset state pttaddress data after closing
      this.$store.commit('addresses/resetPttAddresses')
    },
    getDistricts() {
      this.$store.dispatch('addresses/getDistricts', this.addressData.province)
    },
    getNeighbourhoods() {
      const data = {
        province: this.addressData.province,
        district: this.addressData.district,
      }
      this.$store.dispatch('addresses/getNeighbourhoods', data)
    },
    async submit() {
      this.isLoading = true
      let response = ''
      try {
        const addressToUpdate = {
          firstName: capitalizeEachWord(this.addressData.firstName),
          lastName: capitalizeEachWord(this.addressData.lastName),
          phone: this.addressData.phone,
          province: this.addressData.province,
          district: this.addressData.district,
          neighbourhood: this.addressData.neighbourhood,
          fullAddress: this.addressData.fullAddress,
          title: this.addressData.title,
        }
        response = await this.$axios.$patch(
          `/users/deliveryAddresses/${this.addressData._id}`,
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
          this.$store.commit(
            'addresses/updateUserDeliveryAddress',
            response.updatedAddress
          )
          this.isLoading = false
          this.close()
          this.$buefy.toast.open({
            type: 'is-success',
            duration: 3000,
            message: response.message,
          })
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
