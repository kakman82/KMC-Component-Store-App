<template>
  <section class="section mt-6">
    <div class="container">
      <!-- <div>
        <h1 class="title">Testing Page</h1>
        <hr />
        <p>Fiyat Sayısı: {{ filtered.length }}</p>
        <div v-for="sr in filtered" :key="sr.sourcePartId">
          <hr />
          <b>{{ sr.sourcePartId }}</b>
          <ul v-for="pr in sr.Prices.resaleList" :key="pr.displayPrice">
            <li>Fiyat {{ pr.price }} - MinAdet: {{ pr.minQty }}</li>
          </ul>
        </div>

        <hr />
      </div> -->
      <h1 class="title">Testing Page</h1>
      <p>Result:</p>
      <hr />
      <p class="has-text-primary">{{ filtered }}</p>
      <hr />
      <b>All Products</b>
      <br />
      {{ product }}
    </div>
  </section>
</template>

<script>
import lodash from '../node_modules/lodash-es'
import deepdash from '../node_modules/deepdash-es'
const _ = deepdash(lodash)
export default {
  data() {
    return {
      product: [],
    }
  },
  computed: {
    filtered() {
      const check = [false, 'Arrow Americas', 'Molex']

      let res = _.filterDeep(
        this.product,
        function (value, key, parent) {
          return _.includes(
            check,
            key === 'mfrName' && parent.manufacturer.mfrName && value.inStock && value.displayName
          )
        },
        { childrenPath: ['InvOrg.webSites', 'sources', 'sourceParts'] }
      )

      return res
    },
    countProduct() {
      //const c = this.filtered.map((el) => el.partNum)
      //return c
    },
  },

  created() {
    this.product = this.$store.getters['products/getProducts']
    //console.log(this.product)
  },
}
</script>
