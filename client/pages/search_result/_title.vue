<template>
  <section>
    <div class="columns mt-6 mx-3">
      <div class="column mt-5">
        <SearchBar />
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
          v-if="products === null || products.length === 0"
          class="column is-7"
        >
          <b-message type="is-warning" has-icon>
            <p class="is-size-5 has-text-weight-bold">
              Bu üründe stok yok ya da ürün bulunamamıştır.
            </p>
            <p class="is-size-8">
              Farklı bir ürün için yeniden arama yapabilir ya da
              <br />
              sol taraftaki menüden seçim kriterlerini değiştirebilirsin.
            </p>
          </b-message>
        </div>
        <div
          class="card mx-1 mb-5"
          style="width: 95%"
          v-for="prod in products"
          :key="prod.itemId"
        >
          <!-- Ürün Giriş Bilgileri ve ProductTable -->
          <ProductTable :prod="prod" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Checkboxes from '../../components/search-result/Checkboxes.vue'
import SearchBar from '../../components/search-result/SearchBar.vue'
import ProductInfoCard from '../../components/search-result/table-view/ProductInfoCard.vue'
import ProductTable from '../../components/search-result/table-view/ProductTable.vue'

export default {
  middleware: 'searched',
  components: {
    Checkboxes,
    ProductInfoCard,
    ProductTable,
    SearchBar,
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
