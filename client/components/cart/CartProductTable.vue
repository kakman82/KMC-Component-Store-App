<template>
  <section>
    <div class="column has-text-left" v-if="$store.state.products.search">
      <b-button
        tag="router-link"
        :to="{ path: `/search_result/${$store.state.products.search}` }"
        type="is-primary"
        pack="fas"
        icon-left="arrow-left"
        size="is-small"
      >
        Arama Sonuçlarına Dön
      </b-button>
    </div>
    <b-table
      class="fontSize"
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
      <b-table-column
        field="productName"
        label="Ürün Kodu"
        width="200px"
        v-slot="props"
      >
        {{ props.row.productName }}
      </b-table-column>

      <b-table-column
        field="productQuantity"
        label="Seçilen Adet"
        numeric
        centered
        v-slot="props"
      >
        {{ niceFormat(props.row.productQuantity) }}
      </b-table-column>

      <b-table-column
        field="productUnitPrice"
        label="Birim Fiyat"
        numeric
        centered
        v-slot="props"
      >
        {{ niceFormat(props.row.productUnitPrice, 4) }}
      </b-table-column>

      <b-table-column
        field="productCurrency"
        label="Döviz Cinsi"
        centered
        v-slot="props"
      >
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

      <b-table-column
        field="productTotalPrice"
        label="Tutar(TL)"
        numeric
        centered
        v-slot="props"
      >
        {{
          calcTLPrice(
            props.row.productCartId,
            props.row.productTotalPrice,
            props.row.productCurrency
          )
        }}
      </b-table-column>

      <b-table-column label="Teslim Süresi" centered>
        <span class="tag is-success"> Ort 2 hafta </span>
      </b-table-column>

      <b-table-column label="Sil" centered v-slot="props">
        <DialogConfirm
          :prodCartId="props.row.productCartId"
          :productName="props.row.productName"
        />
      </b-table-column>

      <template #empty>
        <div class="has-text-centered has-text-primary-dark">
          <b>Sepette ürün bulunmuyor.</b> <br />
          Ana sayfamızdan istenilen ürünün kod numarası ile <br />
          arama yaparak sepete ekleme yapabilirsin.
        </div>
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
                    ><i class="fas fa-truck-moving"></i>
                    {{ props.row.productSupplier }}</small
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
import DialogConfirm from '../DialogConfirm.vue'
import * as module from '../../plugins/formatHelper'
export default {
  name: 'CartProductTable',
  components: { DialogConfirm },
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
      currErrMsg: 'Kur bilgisi alınamadı!',
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
      return module.formatWithCurrencyAndDecimals(
        val,
        this.data[0].productCurrency,
        digit
      )
    },
    calcTLPrice(cartId, price, curr) {
      const apiCurrRateResult = this.$store.getters['cart/getCurrRates']

      if (apiCurrRateResult && apiCurrRateResult.exchanges.length > 0) {
        const apiCurrArray = apiCurrRateResult.exchanges
        const currInfo = apiCurrArray.filter((el) => el.code === curr)[0]
        const priceTL = price * currInfo.selling

        const dataToSendMutation = {
          id: cartId,
          productTotalPriceTL: priceTL.toFixed(2) * 1,
          productCurrencyValue: currInfo.selling,
          productCurrencyDate: apiCurrRateResult.currDate,
        }
        this.$store.commit(
          'cart/setTLPriceAndCurrInfoToCartProduct',
          dataToSendMutation
        )

        return module.formatWithCurrencyAndDecimals(priceTL, 'TRY', 2)
      } else {
        return this.currErrMsg
      }
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
.b-table.fontSize {
  font-size: smaller;
}

/* .image.is-64x64 {
  border: 1px solid #7957d5;
} */
</style>
