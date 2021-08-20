<template>
  <div class="box">
    <article class="message is-info">
      <div class="message-body">
        Aşağıda sipariş detayları belirtilmiştir. Onay verildiğinde sipariş bize
        ulaşacaktır.
      </div>
    </article>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-primary">Teslimat Bilgileri</p>
        <b-button
          class="button is-primary m-2"
          size="is-small"
          icon-pack="far"
          icon-left="arrow-alt-circle-left"
          @click="goPreviousStep"
        >
          Değiştir
        </b-button>
      </header>
      <div class="card-content" v-if="selectedAddress">
        <p class="subtitle">
          {{ selectedAddress.firstName }} {{ selectedAddress.lastName }}
        </p>
        <p>{{ selectedAddress.companyName }}</p>
        <p class="is-capitalized">
          {{ selectedAddress.neighbourhood }}
          {{ selectedAddress.fullAddress }}
        </p>
        <p>{{ selectedAddress.district }}/{{ selectedAddress.province }}</p>
        <p class="is-size-7">{{ selectedAddress.phone }}</p>
      </div>
    </div>

    <div class="card mt-5">
      <header class="card-header">
        <p class="card-header-title has-text-primary">Sipariş Bilgileri</p>
      </header>
      <div class="card-content">
        <b-table
          :data="isEmpty ? [] : data"
          :bordered="isBordered"
          :striped="isStriped"
          :narrowed="isNarrowed"
          :hoverable="isHoverable"
          :loading="isLoading"
          :focusable="isFocusable"
          :mobile-cards="hasMobileCards"
        >
          <b-table-column
            field="productImage"
            label="Ürün"
            width="40"
            numeric
            v-slot="props"
          >
            <div class="card-image">
              <figure class="image">
                <p class="image is-32x32">
                  <img class="zoom" :src="props.row.productImage" />
                </p>
              </figure>
            </div>
          </b-table-column>

          <b-table-column field="productName" label="Kod" v-slot="props">
            <p class="is-size-7">
              {{ props.row.productName }}
            </p>
          </b-table-column>

          <b-table-column
            field="productManufacturer"
            label="Üretici"
            v-slot="props"
          >
            <p class="is-size-7">
              {{ props.row.productManufacturer }}
            </p>
          </b-table-column>

          <b-table-column
            field="productQuantity"
            label="Adet"
            centered
            v-slot="props"
          >
            <p class="is-size-7">
              {{ props.row.productQuantity }}
            </p>
          </b-table-column>

          <b-table-column
            field="productTotalPriceTL"
            label="Tutar(TL)"
            centered
            v-slot="props"
          >
            <p class="is-size-7 has-text-right">
              {{ niceFormat(props.row.productTotalPriceTL) }}
            </p>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>

          <template #footer>
            <th class="is-hidden-mobile" style="width: 40px">
              <div class="th-wrap"></div>
            </th>
            <th class="is-hidden-mobile">
              <div class="th-wrap">Toplam:</div>
            </th>
            <th class="is-hidden-mobile">
              <div class="th-wrap"></div>
            </th>
            <th class="is-hidden-mobile">
              <div class="th-wrap is-centered"></div>
            </th>
            <th class="is-hidden-mobile" v-if="totalTL">
              <div class="th-wrap is-justify-content-flex-end">
                {{ niceFormat(totalTL.cartTotalTL) }}
              </div>
            </th>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as module from '../../plugins/formatHelper'
export default {
  name: 'StepOrderDetails',
  emits: ['go-previous'],
  data() {
    return {
      isEmpty: false,
      isBordered: true,
      isStriped: true,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: true,
    }
  },
  computed: {
    selectedAddress() {
      return this.$store.getters['getSelectedAddress'][0]
    },
    data() {
      return this.$store.getters['cart/getCartProducts']
    },
    totalTL() {
      return this.$store.state.order.amounts
    },
  },
  methods: {
    niceFormat(value) {
      return module.formatNumber(value, 2)
    },
    goPreviousStep() {
      this.$emit('go-previous')
    },
  },
}
</script>

<style scoped>
.zoom:hover {
  transform: scale(
    1.8
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
.card {
  border: 1px solid #7957d5;
}
</style>
