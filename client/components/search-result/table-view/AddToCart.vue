<template>
  <div class="container mr-3">
    <b-field class="mb-6" :message="errorMsg" :type="fieldTypeObject">
      <b-tooltip
        position="is-top"
        :triggers="['click']"
        :auto-close="['outside', 'escape']"
      >
        <template v-slot:content>
          <p>{{ calcMessage }}</p>
        </template>
        <b-numberinput
          v-model="quantity"
          controls-position="compact"
          placeholder="Adet Giriniz"
          @input="qtyInputValidation($event), getQtyPrice()"
          @click="getQtyPrice()"
        >
        </b-numberinput>
      </b-tooltip>
    </b-field>
    <b-button
      class="mb-4"
      type="is-primary"
      outlined
      expanded
      icon-left="cart"
      :disabled="!valid"
      @click="addToCart"
    >
      Sepete Ekle
    </b-button>
    <!-- Bulma Modal - Sepete Eklendi Mesajı -->
    <ModalAddToCart :isActive="modalActive" @closeModal="closeModal" />
  </div>
</template>

<script>
import ModalAddToCart from './ModalAddToCart.vue'
import * as module from '../../../plugins/formatHelper.js'

export default {
  name: 'AddToCart',
  components: { ModalAddToCart },
  props: {
    maxStock: null,
    minQty: null,
    packSize: null,
    product: null,
    prices: null,
    currency: '',
    supplier: '',
  },
  data() {
    return {
      errorMsg: `Min: ${module.formatNumber(
        this.minQty,
        0
      )}  &  Max:${module.formatNumber(this.maxStock, 0)} `,
      valid: null,
      quantity: null,
      productPrice: this.prices.resaleList[0].price,
      modalActive: false,
    }
  },

  computed: {
    // bu yapı çok güzel aşağıdaki valid durumlarına göre field type dönüyor
    fieldTypeObject() {
      return {
        'is-primary': this.valid === null,
        'is-danger': this.valid === false,
        'is-success': this.valid === true,
      }
    },
    calcMessage() {
      if (this.quantity === null) {
        return 0
      }
      const msg = `
          ${module.formatNumber(this.quantity, 0)} 
          x 
          ${module.formatNumber(this.productPrice, 4)} 
          = 
          ${module.formatNumber(this.quantity * this.productPrice, 2)}
          `
      return msg
    },
  },

  methods: {
    qtyInputValidation() {
      if (this.quantity < this.minQty) {
        this.valid = false
        this.errorMsg = `Min adetten (${this.minQty}) daha az olamaz!`
      } else if (this.quantity > this.maxStock) {
        this.valid = false
        this.errorMsg = `Toplam stoktan (${this.maxStock}) fazla olamaz!`
      } else if (this.quantity % this.packSize !== 0) {
        this.valid = false
        this.errorMsg = `Paketin (${this.packSize}) katları kadar olmalı`
      } else {
        this.valid = true
        this.errorMsg = 'Adet uygun, sepete ekleyebilirsiniz.'
      }
    },
    getQtyPrice() {
      if (this.quantity > 0) {
        const priceArray = this.prices.resaleList
        for (let i = 0; i < priceArray.length; i++) {
          if (this.quantity <= this.minQty) {
            this.productPrice = priceArray[0].price
          } else if (
            this.quantity >= priceArray[i].minQty &&
            this.quantity <= priceArray[i].maxQty
          ) {
            this.productPrice = priceArray[i].price
          }
        }
      }
    },

    addToCart() {
      if (this.valid) {
        const cartProductData = {
          productCartId: Date.now(),
          productId: this.product.itemId,
          productName: this.product.partNum,
          productManufacturer: this.product.manufacturer.mfrName,
          productDescription: this.product.desc,
          productCategory: this.product.categoryName,
          productImage: this.product.hasDatasheet
            ? this.product.resources[2].uri
            : null,
          productSupplier: this.supplier,
          productUnitPrice: this.productPrice,
          productCurrency: this.currency,
          productTotalPrice: (this.quantity * this.productPrice).toFixed(2) * 1,
          productTotalPriceTL: 0,
          productCurrencyValue: 0,
          productCurrencyDate: '',
          productQuantity: this.quantity,
        }
        //console.log('Sepete Eklenen Product Object: ', cartProductData)
        // Mutationa product gönderimi ve modal gösterimi;
        this.$store.commit('cart/addProductToCart', cartProductData)
        // Modal componentin beklediği active propu true olarak set ediyorum
        this.modalActive = true
      }
    },
    closeModal() {
      this.modalActive = false
    },
  },
}
</script>
