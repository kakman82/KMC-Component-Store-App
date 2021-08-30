<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">
        Hizmet Bedeli Tanımlama
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <article class="message is-info">
          <div class="message-body">
            En son kaydedilen hizmet bedeli oranı
            <b>kullanımda olandır.</b> <br />
            Önceki girilen değerler bilgilendirme amaçlı tutulmaktadır.
          </div>
        </article>
        <b-message
          class="mt-2"
          v-if="serverErrMsg"
          type="is-danger"
          has-icon
          icon-size="is-medium"
        >
          {{ serverErrMsg }}
        </b-message>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <ValidationProvider
            rules="required|double:2"
            v-slot="{ errors, valid }"
          >
            <b-field
              label="Mevcut kullanımda olan"
              label-position="on-border"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                v-model="newServiceFee"
                icon-pack="fas"
                icon="percent"
              ></b-input>
              <p class="control">
                <b-button
                  label="Yeni Ekle"
                  type="is-primary"
                  :loading="isLoading"
                  @click="handleSubmit(addServiceFee)"
                />
              </p>
            </b-field>
          </ValidationProvider>
        </ValidationObserver>
        <div class="mt-6" style="width: 300px">
          <b-table
            :data="allServiceFees"
            bordered
            striped
            narrowed
            hoverable
            focusable
            :row-class="(row, index) => index === 0 && 'is-info'"
          >
            <b-table-column
              field="serviceFee"
              label="Değer %"
              width="40"
              centered
              sortable
              numeric
              v-slot="props"
            >
              {{ props.row.serviceFee.$numberDecimal }}
            </b-table-column>
            <b-table-column
              field="createdAt"
              label="Kayıt Tarihi"
              centered
              sortable
              width="50"
              v-slot="props"
            >
              {{ niceDate(props.row.createdAt) }}
            </b-table-column>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as module from '../../../../plugins/formatHelper'
import Cookie from 'js-cookie'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  head: {
    title: 'Hizmet Bedel Yön. | KMC Elektronik',
  },
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      newServiceFee: '',
      currentServiceFee: 'kerem',
      serverErrMsg: '',
      allServiceFees: [],
      isLoading: false,
    }
  },
  created() {
    this.getAllServiceFees()
  },
  methods: {
    niceDate(value) {
      return module.formatDateWithoutDay(value)
    },
    async getAllServiceFees() {
      try {
        const response = await this.$axios.$get('/serviceFee')
        if (response.success) {
          // db den dönen veri en son kaydedilen sıralamasında - 0 index en son olan
          this.newServiceFee = response.fees[0].serviceFee.$numberDecimal
          this.currentServiceFee = response.fees[0].serviceFee.$numberDecimal
          this.allServiceFees = response.fees
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addServiceFee() {
      if (this.newServiceFee === this.currentServiceFee) {
        return this.$buefy.dialog.alert({
          title: 'Hata',
          message:
            'Bu değer hali hazırda kullanımdadır. <br /> Farklı bir değer girilmelidir.',
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
      }
      this.isLoading = true
      let response = ''
      try {
        const token = Cookie.get('access_token')
        response = await this.$axios.$post(
          '/serviceFee',
          {
            serviceFee: this.newServiceFee,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.success) {
          this.isLoading = false
          this.getAllServiceFees()
          this.$buefy.toast.open({
            duration: 5000,
            message: response.message,
            type: 'is-success',
          })
        }
      } catch (error) {
        this.isLoading = false
        if (error.response) {
          return (this.serverErrMsg = error.response.data.message)
        } else {
          this.serverErrMsg = error.message
          console.log(error)
        }
      }
    },
  },
}
</script>

<style scoped>
tr.is-info {
  background: #167df0;
  color: #fff;
}
</style>
