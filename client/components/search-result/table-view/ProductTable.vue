<template>
  <div class="table-container">
    <table class="table is-bordered is-striped is-fullwidth">
      <thead>
        <tr class="has-text-centered has-background-primary">
          <th class="has-text-white">Ürün Bilgileri</th>
          <th class="has-text-white">Stok ve Paket Bilgileri</th>
          <th class="has-text-white">Birim Fiyatlar ve Sepete Ekle</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="web in prod.InvOrg.webSites">
          <template v-for="supplier in web.sources">
            <tr
              v-for="source in supplier.sourceParts"
              :key="source.sourcePartId"
            >
              <td style="width: 35%">
                <div class="colums is-flex">
                  <div class="column is-4">
                    <figure class="image is-96x96 p-1">
                      <img
                        class="zoom"
                        v-if="prod.resources[2]"
                        :src="prod.resources[2].uri"
                        alt="Image"
                      />
                      <div v-else class="mt-3 has-text-centered">
                        <i class="far fa-image fa-4x has-text-centered"></i>
                      </div>
                    </figure>
                    <a
                      v-if="prod.hasDatasheet"
                      :href="prod.resources[0].uri"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="
                        button
                        mt-2
                        is-primary is-outlined is-small
                        has-text-weight-bold
                      "
                    >
                      <span class="icon">
                        <i class="far fa-file-pdf"></i>
                      </span>
                      <span>Doküman</span>
                    </a>
                  </div>
                  <div class="column is-8 ml-2">
                    <div class="container mb-5">
                      <span class="icon-text">
                        <span class="icon has-text-primary-dark">
                          <i class="fas fa-industry"></i>
                        </span>
                        <b>{{ prod.manufacturer.mfrName }}</b>
                      </span>
                      <br />
                      <span class="icon-text">
                        <span class="icon has-text-primary-dark">
                          <i class="fas fa-hashtag"></i>
                        </span>
                        <strong class="has-text-primary">{{
                          prod.partNum
                        }}</strong>
                      </span>
                    </div>

                    <div class="container">
                      <span class="icon-text">
                        <span class="icon has-text-primary-dark">
                          <i class="fas fa-at"></i>
                        </span>
                        <span>{{ web.name }}</span>
                      </span>

                      <br />
                      <span class="icon-text">
                        <span class="icon has-text-primary-dark">
                          <i class="fas fa-truck-moving"></i>
                        </span>
                        <span>{{ supplier.displayName }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-flex-direction-row is-flex-wrap-nowrap">
                  <span>{{ prod.desc }}</span>
                  <br />
                  <strong>Kategori: </strong
                  >{{
                    prod.categoryName ? prod.categoryName : 'Bilgi mevcut değil'
                  }}
                </div>
              </td>
              <td
                style="width: 20%"
                v-for="(aval, i) in source.Availability"
                :key="i"
              >
                <div
                  class="
                    container
                    mt-3
                    has-text-centered has-text-centered-mobile
                  "
                >
                  <span class="icon-text">
                    <span class="icon has-text-primary-dark">
                      <i class="fas fa-boxes"></i>
                    </span>
                    <span>Toplam Stok</span>
                  </span>

                  <p class="has-text-weight-bold">
                    {{ getNiceNumberFormat(aval.fohQty) }}
                  </p>

                  <span
                    v-if="aval.fohQty > 0"
                    class="tag my-3 is-success is-medium"
                  >
                    <i class="mr-2 fas fa-check"></i>
                    Stok Mevcut!
                  </span>
                  <span
                    v-if="aval.fohQty <= 0"
                    class="tag is-danger mt-4 is-medium"
                  >
                    <i class="mr-2 fas fa-times"></i>
                    Stok Bulunmuyor!
                  </span>
                  <br />
                  <span v-if="aval.fohQty > 0" class="icon-text mt-2">
                    <span class="icon has-text-primary-dark">
                      <i class="fas fa-dolly-flatbed"></i>
                    </span>
                    <span>Paket İçeriği</span>
                  </span>
                  <p v-if="aval.fohQty > 0" class="has-text-weight-bold">
                    {{ getNiceNumberFormat(source.packSize) }}
                  </p>

                  <b-tooltip
                    v-show="aval.pipeline.length > 0"
                    class="mt-5"
                    position="is-bottom"
                    multilined
                  >
                    <i
                      class="fas fa-shipping-fast fa-2x has-text-primary-dark"
                    ></i>
                    <template v-slot:content v-if="aval.pipeline.length > 0">
                      <i>Stoklara</i>
                      <br />
                      <b>{{ getNiceDateFormat(aval.pipeline[0].delivery) }} </b>
                      <i>tarihinde</i>
                      <br />
                      <b>
                        {{ getNiceNumberFormat(aval.pipeline[0].quantity) }}
                        adet</b
                      >
                      <br />
                      <i>ek giriş yapılması bekleniyor.</i>
                    </template>
                  </b-tooltip>
                </div>
              </td>
              <td
                style="width: 45%"
                v-for="(aval, i) in source.Availability"
                :key="i + 1"
              >
                <!-- Stok varsa -->
                <div class="columns mt-2" v-if="aval.fohQty > 0">
                  <div class="column is-6">
                    <div
                      v-for="price in source.Prices.resaleList"
                      :key="price.displayPrice"
                      class="columns mb-2"
                    >
                      <div
                        class="
                          column
                          my-2
                          mr-3
                          is-paddingless is-6
                          has-text-right has-text-primary
                        "
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
                          {{
                            getPriceWithCurrency(
                              price.price,
                              supplier.currency,
                              4
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="column is-6 ml-3">
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
                  <span class="icon-text mt-2">
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
                  <span class="icon-text mt-2">
                    <span class="icon">
                      <i class="fas fa-phone-volume"></i>
                    </span>
                    <span> +90 216 527 36 41</span>
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import AddToCart from '../table-view/AddToCart.vue'
import * as module from '../../formatHelper.js'
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
      return module.formatNumber(value)
    },
    getNiceDateFormat(apiTextDate) {
      const niceFormat = format(new Date(apiTextDate), 'dd.MM.yyyy')
      return niceFormat
    },
    getPriceWithCurrency(price, curr, digit) {
      return module.formatWithCurrencyAndDecimals(price, curr, digit)
    },
  },
}
</script>

<style scoped>
/* min adet ve tutarlar arasındaki boşluğu almak için kullandım */
.my-2 {
  margin-bottom: -0.5rem !important;
}

.table {
  border: 2px solid #7957d5;
}

.table-container {
  overflow: hidden;
}

.image.is-96x96 {
  border: 1px solid #7957d5;
}

/* ürün fotosunun üzerinde gelindiğindeki zoom hover ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_zoom_hover */
.zoom:hover {
  transform: scale(
    1.8
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

@media only screen and (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: sticky;
    padding-left: 0px;
    margin-left: 180px;
  }
  td:before {
    position: absolute;
    top: 12px;
    left: 6px;
    width: 200px;
    padding-right: 40px;
    white-space: nowrap;
    margin-left: -150px;
  }
  td:nth-of-type(1):before {
    content: 'Ürün Bilgileri';
  }
  td:nth-of-type(2):before {
    content: 'Stok ve Paket Bilgileri';
  }
  td:nth-of-type(3):before {
    content: 'Birim Fiyatlar ve Sepete Ekle';
  }
}
</style>
