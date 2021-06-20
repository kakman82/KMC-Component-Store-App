<template>
  <!-- 11 Haziranda card infoyu table row a almadan önce yedek aldım!! -->
  <table class="table is-bordered is-striped mx-3" style="width: 98%">
    <thead>
      <tr class="has-text-centered has-background-primary">
        <th class="has-text-white">Tedarik WebSite ve Firma/Bölge</th>
        <th class="has-text-white">Toplam Stok ve Paket İçeriği</th>
        <th class="has-text-white">Birim Fiyatlar ve Sipariş Oluşturma</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="web in prod.InvOrg.webSites">
        <template v-for="supplier in web.sources">
          <tr v-for="source in supplier.sourceParts" :key="source.sourcePartId">
            <td style="width: 20%">
              <div class="column has-text-centered-mobile">
                <span class="icon-text mb-2 has-text-centered-mobile">
                  <span class="icon has-text-primary-dark has-text-centered-mobile">
                    <i class="fas fa-at"></i>
                  </span>
                  <span>{{ web.name }}</span>
                </span>
                <br />
                <span class="icon-text">
                  <span class="icon has-text-primary-dark">
                    <i class="far fa-building"></i>
                  </span>
                  <span>{{ supplier.displayName }}</span>
                </span>
              </div>
            </td>
            <td style="width: 30%" v-for="(aval, i) in source.Availability" :key="i">
              <div class="container mt-3 has-text-centered has-text-centered-mobile">
                <span class="icon-text">
                  <span class="icon has-text-primary-dark">
                    <i class="fas fa-boxes"></i>
                  </span>
                  <span>Toplam Stok: {{ getNiceNumberFormat(aval.fohQty) }} adet</span>
                </span>
                <br />
                <span v-if="aval.fohQty > 0" class="tag is-success mt-2 is-medium">
                  <i class="mr-2 fas fa-check"></i>
                  Stok Mevcut!
                </span>
                <span v-if="aval.fohQty <= 0" class="tag is-danger mt-4 is-medium">
                  <i class="mr-2 fas fa-times"></i>
                  Stok Bulunmuyor!
                </span>
                <br />
                <span v-if="aval.fohQty > 0" class="icon-text mt-2">
                  <span class="icon has-text-primary-dark">
                    <i class="fas fa-dolly-flatbed"></i>
                  </span>
                  <span>Paket içeriği: {{ getNiceNumberFormat(source.packSize) }} adet </span>
                </span>
                <br />
                <b-tooltip
                  v-show="aval.pipeline.length > 0"
                  class="mt-5"
                  position="is-bottom"
                  multilined
                >
                  <i class="fas fa-shipping-fast fa-2x has-text-primary-dark"></i>
                  <template v-slot:content v-if="aval.pipeline.length > 0">
                    <b>{{ getNiceDateFormat(aval.pipeline[0].delivery) }} </b>
                    <i>tarihinde stoklara</i>
                    <b> {{ getNiceNumberFormat(aval.pipeline[0].quantity) }} adet</b>
                    <i>ilave giriş yapılması durumu bulunuyor.</i>
                  </template>
                </b-tooltip>
              </div>
            </td>
            <td style="width: 50%" v-for="(aval, i) in source.Availability" :key="i + 1">
              <!-- Stok varsa -->
              <div class="columns mt-2" v-if="aval.fohQty > 0">
                <div class="column is-6">
                  <div
                    v-for="price in source.Prices.resaleList"
                    :key="price.displayPrice"
                    class="columns mb-2"
                  >
                    <div
                      class="column my-2 mr-3 is-paddingless is-6 has-text-right has-text-primary"
                    >
                      <p>{{ getNiceNumberFormat(price.minQty) }}+</p>
                    </div>
                    <div
                      class="
                        column
                        my-2
                        ml-3
                        is-paddingless is-6
                        has-text-left has-text-weight-bold
                      "
                    >
                      <p>
                        {{ getPriceWithCurrency(price.price, supplier.currency) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-6">
                  <!-- Adet Seçim Bölümü -->
                  <AddToCart
                    :maxStock="aval.fohQty"
                    :minQty="source.minimumOrderQuantity"
                    :packSize="source.packSize"
                    :product="prod"
                    :prices="source.Prices"
                    :currency="supplier.currency"
                    :supplier="supplier.displayName"
                  />
                </div>
              </div>
              <!-- Stok yoksa -->
              <div v-else class="column has-text-info has-text-centered">
                <b>İletişim için;</b>
                <br />
                <span class="icon-text m-2">
                  <span class="icon">
                    <i class="fas fa-at"></i>
                  </span>
                  <span
                    ><a class="has-text-info" href="mailto:info@kmc-grup.com"
                      >info@kmc-grup.com</a
                    ></span
                  >
                </span>
                <br />
                <span class="icon-text m-2">
                  <span class="icon">
                    <i class="fas fa-phone-volume"></i>
                  </span>
                  <span>+90 216 527 36 41</span>
                </span>
              </div>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script>
import AddToCart from '../table-view/AddToCart.vue'
import * as myModule from '../../helper.js'
import { format } from 'date-fns'

export default {
  name: 'ProductTable',
  components: { AddToCart },
  props: {
    prod: {
      type: Object,
    },
  },
  data() {
    return {
      quantity: 0,
      errorMsg: '',
      fieldType: 'is-default',
      buttonDisable: true,
    }
  },

  methods: {
    getNiceNumberFormat(value) {
      return myModule.formatNumber(value)
    },
    getNiceDateFormat(apiTextDate) {
      const niceFormat = format(new Date(apiTextDate), 'dd.MM.yyyy')
      return niceFormat
    },
    getPriceWithCurrency(price, curr) {
      const currFormat = Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: curr,
        maximumSignificantDigits: 4,
      }).format(price)
      return currFormat
    },
  },
}
</script>

<style scoped>
/* min adet ve tutarlar arasındaki boşluğu almak için kullandım */
.my-2 {
  margin-bottom: -0.5rem !important;
}
</style>
