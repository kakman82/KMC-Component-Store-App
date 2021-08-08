<template>
  <div v-if="product" class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>

    <div class="modal-card" style="width: 640px">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-success-dark is-success">
          <i class="far fa-check-circle mr-2"></i>Ürün sepetinize eklenmiştir.
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-2 mr-2">
            <div class="media">
              <div class="media-left">
                <figure class="image is-96x96 p-1">
                  <img
                    v-if="product.productImage"
                    :src="product.productImage"
                    alt="Image"
                  />
                  <div v-else class="mt-3 has-text-centered">
                    <i class="far fa-image fa-4x has-text-centered"></i>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div class="column is-5">
            <div class="container">
              <p class="is-6">
                <i class="fas fa-hashtag mr-2"></i>
                {{ product.productName }}
              </p>
              <p class="is-6">
                <i class="fas fa-industry mr-2"></i>
                {{ product.productManufacturer }}
              </p>
              <p class="is-6">
                <i class="fas fa-truck-moving mr-2"></i>
                {{ product.productSupplier }}
              </p>
              <p class="is-7 mt-5"><b>Tutar: </b>{{ oneProductTotalPrice }}</p>
              <h1 class="is-size-7">
                <i>
                  ({{ product.productQuantity }} adet x
                  {{ product.productUnitPrice }})
                </i>
              </h1>
            </div>
          </div>
          <div class="column is-5">
            <div class="card has-background-grey-lighter" style="width: 250px">
              <div class="card-content">
                <h1 class="is-size-6 mb-2 has-text-centered">
                  <b> Sepet Toplamı</b>
                  <br />
                  <b>{{ cartTotalPrice }} </b>
                </h1>

                <button
                  class="button is-primary is-fullwidth"
                  @click="goToCart"
                >
                  Sepete Git ({{ $store.getters['cart/getCartLength'] }} ürün)
                </button>
                <button
                  class="button is-outlined is-default is-fullwidth mt-3"
                  @click="closeModal"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import * as module from '../../../plugins/formatHelper'
export default {
  name: 'ModalAddToCart',
  props: { isActive: Boolean },
  emits: ['closeModal'],

  computed: {
    product() {
      // modal da sen eklenen ürünün gösterimi için 0 index
      // carta eklersen unshift ile son ekleneni arrayın başına aldım
      return this.$store.getters['cart/getCartProducts'][0]
    },
    cartTotalPrice() {
      // Farklı döviz cinsleri olursa diye sepet toplamında döviz simgesi gösterilmedi...
      const value = this.$store.getters['cart/getCartTotal']
      const niceFormat = module.formatWithCurrencyAndDecimals(
        value,
        this.cartCurrency,
        2
      )
      return niceFormat
    },
    oneProductTotalPrice() {
      const value = this.product.productTotalPrice
      const niceFormat = module.formatWithCurrencyAndDecimals(
        value,
        this.product.productCurrency,
        2
      )
      return niceFormat
    },
    cartCurrency() {
      return this.$store.getters['cart/getCartCurrencyInfo'][0]
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    goToCart() {
      this.$router.push({ path: '/cart' })
      this.closeModal()
    },
  },
}
</script>
