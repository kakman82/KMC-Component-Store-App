<template>
  <section>
    <b-table
      :data="isEmpty ? [] : data"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="productId"
      show-detail-icon
      :detail-transition="transitionName"
    >
      <b-table-column field="productName" label="Ürün Kodu" width="50" v-slot="props">
        {{ props.row.productName }}
      </b-table-column>

      <!-- <b-table-column field="productManufacturer" label="Üretici" v-slot="props">
        {{ props.row.productManufacturer }}
      </b-table-column> -->

      <b-table-column field="productQuantity" label="Seçilen Adet" numeric centered v-slot="props">
        {{ niceFormat(props.row.productQuantity) }}
      </b-table-column>

      <b-table-column field="productUnitPrice" label="Birim Fiyat" numeric centered v-slot="props">
        {{ niceFormat(props.row.productUnitPrice, 4) }}
      </b-table-column>

      <b-table-column field="productCurrency" label="Döviz Cinsi" centered v-slot="props">
        {{ props.row.productCurrency }}
      </b-table-column>

      <b-table-column
        field="productTotalPrice"
        label="Tutar(Dövizli)"
        numeric
        centered
        v-slot="props"
      >
        {{ niceFormatWithCurr(props.row.productTotalPrice, 2) }}
      </b-table-column>

      <b-table-column field="productTotalPrice" label="Tutar(TL)" numeric centered v-slot="props">
        TL olacak {{ props.row.productTotalPrice }}
      </b-table-column>

      <b-table-column label="Teslim Süresi" centered>
        <span class="tag is-success"> Ort 2 hafta </span>
      </b-table-column>

      <b-table-column label="Sil" centered>
        <button class="button is-danger is-small">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
        <!-- <span>
          <b-icon pack="fas" icon="trash "> </b-icon>
        </span> -->
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">Kayıt yok</div>
      </template>
      <template #detail="props">
        <article class="media">
          <figure class="media-left mt-1">
            <p class="image is-96x96">
              <img class="zoom p-1" :src="props.row.productImage" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <b class="has-text-primary-dark">{{ props.row.productName }}</b>
                <br />
                <strong>{{ props.row.productManufacturer }}</strong>
                <br />
                <b
                  ><small
                    ><i class="fas fa-truck-moving"></i> {{ props.row.productSupplier }}</small
                  ></b
                >
                <br />
                {{ props.row.productDescription }}
              </p>
            </div>
          </div>
        </article>
      </template>
    </b-table>
  </section>
</template>

<script>
import * as module from '../formatHelper'
export default {
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
      defaultOpenedDetails: [0],
    }
  },
  computed: {
    data() {
      return this.$store.getters['cart/getCartProducts']
    },
    transitionName() {
      if (this.useTransition) {
        return 'fade'
      }
    },
  },
  methods: {
    niceFormat(val, digit) {
      return module.formatNumber(val, digit)
    },
    niceFormatWithCurr(val, digit) {
      return module.formatWithCurrencyAndDecimals(val, this.data[0].productCurrency, digit)
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

/* .image.is-64x64 {
  border: 1px solid #7957d5;
} */
</style>
