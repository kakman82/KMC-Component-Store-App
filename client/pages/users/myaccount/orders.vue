<template>
  <div class="card" style="width: 95%">
    <header class="card-header">
      <p class="card-header-title has-text-primary-dark">Siparişlerim</p>
      <b-tooltip
        label="Sipariş son durum bilgisini görmek için yenile"
        type="is-primary is-light"
        position="is-left"
        size="is-small"
        multilined
      >
        <b-button
          class="m-3"
          type="is-primary"
          size="is-small"
          outlined
          icon-pack="fas"
          icon-left="sync-alt"
          @click="getUserOrders"
          >Yenile
        </b-button>
      </b-tooltip>
    </header>
    <div class="card-content">
      <div class="is-flex is-justify-content-space-between mb-3">
        <h2 v-show="orders.length > 0" class="subtitle is-size-7">
          *Sipariş içeriğindeki ürünleri ve detay bilgilerini görmek için "
          <i class="fas fa-chevron-right has-text-primary"></i>
          " simgesine tıkla
        </h2>
      </div>
      <div class="content">
        <b-table
          :data="isEmpty ? [] : orders"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :loading="isLoading"
          :focusable="isFocusable"
          :mobile-cards="hasMobileCards"
          :opened-detailed="defaultOpenedDetails"
          detailed
          detail-key="_id"
          show-detail-icon
          :detail-transition="transitionName"
          ref="table"
          paginated
          :pagination-simple="isSimple"
          pagination-size="is-small"
          pagination-position="both"
          per-page="5"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <b-table-column
            field="orderNo"
            label="Sipariş No."
            width="120px"
            v-slot="props"
          >
            {{ props.row.orderNo }}
          </b-table-column>

          <b-table-column
            field="createdAt"
            label="Sipariş Tarihi"
            numeric
            centered
            v-slot="props"
          >
            {{ niceDateFormat(props.row.createdAt) }}
          </b-table-column>

          <b-table-column label="Ürün Adedi" centered v-slot="props">
            {{ props.row.products.length }}
          </b-table-column>

          <b-table-column
            field="serviceFee"
            label="Hizmet Bedeli"
            numeric
            centered
            v-slot="props"
          >
            {{ niceFormat(props.row.serviceFee, 2) }} TL
          </b-table-column>
          <b-table-column
            field="tax"
            label="KDV"
            numeric
            centered
            v-slot="props"
          >
            {{ niceFormat(props.row.tax, 2) }} TL
          </b-table-column>
          <b-table-column
            field="sumTotal"
            label="Sipariş Toplamı"
            numeric
            centered
            v-slot="props"
          >
            {{ niceFormat(props.row.sumTotal, 2) }} TL
          </b-table-column>

          <b-table-column field="status" label="Durum" centered v-slot="props">
            <span class="tag" :class="tagType(props.row.status)">
              {{ props.row.status }}
            </span>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered has-text-primary-dark">
              <b>Henüz verilmiş bir sipariş bulunmuyor.</b> <br />
              Ana sayfamızdan istenilen ürünün kod numarası ile <br />
              arama yaparak sepete ekleme yapabilir ve sipariş verebilirsin.
            </div>
          </template>
          <template #detail="props">
            <template v-for="product in props.row.products">
              <div class="box" :key="product._id">
                <nav class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Ürün</p>
                      <p class="image is-32x32 mt-1">
                        <img class="zoom" :src="product.productImage" />
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Kod</p>
                      <p class="is-size-6">{{ product.productName }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Üretici</p>
                      <p class="is-size-6">{{ product.productManufacturer }}</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Adet</p>
                      <p class="is-size-6">
                        {{ niceFormat(product.productQuantity, 0) }}
                      </p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">Tutar</p>
                      <p class="is-size-6">
                        {{ niceFormat(product.productTotalPriceTL, 2) }} TL
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
            </template>
            <div class="card">
              <header class="card-header">
                <p class="card-header-title has-text-primary">
                  Teslimat Bilgileri
                </p>
              </header>
              <div class="card-content">
                <p class="subtitle is-capitalized">
                  {{ props.row.deliveryAddress.firstName }}
                  {{ props.row.deliveryAddress.lastName }}
                </p>
                <p class="is-size-6">
                  Tel: {{ props.row.deliveryAddress.phone }}
                </p>
                <p class="is-capitalized">
                  {{ props.row.deliveryAddress.neighbourhood }}
                  {{ props.row.deliveryAddress.fullAddress }}
                </p>
                <p>
                  {{ props.row.deliveryAddress.district }} /
                  {{ props.row.deliveryAddress.province }}
                </p>
              </div>
            </div>

            <div class="card mt-5">
              <header class="card-header">
                <p class="card-header-title has-text-primary">
                  Fatura Bilgileri
                </p>
              </header>
              <!-- Kurumsal Fatura Adres Bilgileri -->
              <div
                class="card-content"
                v-if="props.row.billingAddress.billType === 'kurumsal'"
              >
                <p class="has-text-weight-bold is-capitalized">
                  {{ props.row.billingAddress.companyName }}
                </p>
                <p class="has-text-weight-semibold">
                  {{ props.row.billingAddress.companyTaxOffice }} Vergi Dairesi,
                  VKNO:
                  {{ props.row.billingAddress.companyTaxNumber }}
                </p>
                <p class="is-capitalized">
                  {{ props.row.billingAddress.neighbourhood }}
                  {{ props.row.billingAddress.fullAddress }}
                </p>
                <p>
                  {{ props.row.billingAddress.district }} /
                  {{ props.row.billingAddress.province }}
                </p>
              </div>
              <!-- Bireysel Fatura Adres Bilgileri -->
              <div
                class="card-content"
                v-if="props.row.billingAddress.billType === 'bireysel'"
              >
                <p class="has-text-weight-bold">
                  {{ props.row.billingAddress.personFullName }}
                </p>
                <p class="has-text-weight-semibold">
                  TCNO: {{ tckn(props.row.billingAddress.personIDNumber) }}
                </p>
                <p class="is-capitalized">
                  {{ props.row.billingAddress.neighbourhood }}
                  {{ props.row.billingAddress.fullAddress }}
                </p>
                <p>
                  {{ props.row.billingAddress.district }} /
                  {{ props.row.billingAddress.province }}
                </p>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as module from '../../../plugins/formatHelper'
export default {
  layout: 'usermenu',
  middleware: 'authenticated',
  head: {
    title: 'Siparişlerim | KMC Elektronik',
  },
  data() {
    return {
      orders: [],

      isEmpty: false,
      isBordered: true,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: true,
      isSimple: true,
      defaultOpenedDetails: [0],
    }
  },
  computed: {
    sessionUserId() {
      return this.$store.getters['getUser'].id
    },
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    },
  },
  created() {
    this.getUserOrders()
  },
  methods: {
    niceFormat(val, digit) {
      return module.formatNumber(val, digit)
    },
    niceDateFormat(value) {
      return module.formatDateWithoutDay(value)
    },
    tagType(value) {
      if (value === 'Teslim Edildi') {
        return 'is-success'
      } else if (value === 'Tedarik Aşamasında') {
        return 'is-info'
      } else if (value === 'Yola Çıktı') {
        return 'is-dark'
      } else if (value === 'İptal Edildi') {
        return 'is-danger'
      } else if (value === 'Ödeme Bekliyor') {
        return 'is-warning'
      }
    },
    tckn(tcNumber) {
      let tcknArr = tcNumber.split('')
      for (let i = 3; i < 9; i++) {
        tcknArr[i] = '*'
      }
      return tcknArr.join('')
    },
    async getUserOrders() {
      try {
        const response = await this.$axios.$get(
          `/users/orders/${this.sessionUserId}`
        )
        if (response.success) {
          this.orders = response.orders
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.zoom:hover {
  transform: scale(
    2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
