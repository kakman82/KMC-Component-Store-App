<template>
  <div>
    <div class="msg">
      <div
        class="
          notification
          is-success is-light
          p-3
          mx-3
          is-size-5-desktop is-size-6-mobile
        "
      >
        <b>" {{ $route.params.title }}"</b
        ><i>no.lu ürün için Arrow.com stokları gösteriliyor...</i>
      </div>
    </div>
    <section class="columns mb-5 mt-3">
      <!-- Checkbox Filterleme Bölümü -->
      <div class="column is-3 mr-5">
        <Checkboxes />
      </div>
      <!-- Tablo görünüm -->
      <div class="column is-9">
        <div
          class="card mx-1 mb-5"
          style="width: 95%"
          v-for="prod in products"
          :key="prod.itemId"
        >
          <!-- Ürün Giriş Bilgileri ProductInfoCard ve ProductTable -->
          <!-- <ProductInfoCard :prod="prod" /> -->
          <ProductTable :prod="prod" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Checkboxes from '../../components/search-result/Checkboxes.vue'
import ProductInfoCard from '../../components/search-result/table-view/ProductInfoCard.vue'
import ProductTable from '../../components/search-result/table-view/ProductTable.vue'

export default {
  components: {
    Checkboxes,
    ProductInfoCard,
    ProductTable,
  },

  data() {
    return {}
  },
  computed: {
    products() {
      return this.$store.getters['products/getProducts']
    },
  },
}
</script>

<style scoped>
div.msg {
  margin-top: 5rem !important;
}
</style>
