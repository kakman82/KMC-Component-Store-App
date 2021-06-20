<template>
  <div class="container ml-5">
    <aside class="menu">
      <p class="menu-label has-text-weight-bold">Filtreler</p>
      <!-- Stok Filtre -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Stok Uygun Olanları Göster</a>
          <ul>
            <b-field>
              <b-checkbox v-model="isStock" type="is-info" true-value="Evet" false-value="Hayır">
                {{ isStock }}
              </b-checkbox>
            </b-field>
            <!-- <b-field>
              <b-checkbox v-model="stockGroup" :native-value="false" type="is-info">
                Yok
              </b-checkbox>
            </b-field> -->
          </ul>
          <p class="content"><b>Selection:</b> {{ stockGroup }}</p>
        </li>
      </ul>
      <!-- Üretici Firma Filter -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Üretici Firma [A-Z]</a>
          <ul v-for="manufacturer in manufacturers" :key="manufacturer.id">
            <b-field>
              <b-checkbox
                v-model="mfrCheckboxGroup"
                :native-value="manufacturer.name"
                type="is-info"
              >
                {{ manufacturer.name }}
              </b-checkbox>
            </b-field>
          </ul>
          <p class="content"><b>Selection:</b> {{ mfrCheckboxGroup }}</p>
        </li>
      </ul>
      <!-- Tedarik Yeri Filter -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Tedarik Firma/Bölge [A-Z]</a>
          <ul v-for="supplier in suppliers" :key="supplier.id">
            <b-field>
              <b-checkbox
                v-model="supplierCheckboxGroup"
                :native-value="supplier.name"
                type="is-info"
              >
                {{ supplier.name }}
              </b-checkbox>
            </b-field>
          </ul>
          <p class="content"><b>Selection:</b> {{ supplierCheckboxGroup }}</p>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isStock: 'Evet',
      mfrCheckboxGroup: [],
      supplierCheckboxGroup: [],
    }
  },
  computed: {
    stockGroup() {
      if (this.isStock === 'Evet') {
        return true
      } else {
        return false
      }
    },
    manufacturers() {
      return this.$store.getters['products/getManufacturerNames']
    },
    suppliers() {
      return this.$store.getters['products/getSupplierNames']
    },
  },
  watch: {
    stockGroup(newVal, oldVal) {
      this.$store.commit('products/setStockCheckboxSelections', this.stockGroup)
    },
    mfrCheckboxGroup(newVal, oldVal) {
      this.$store.commit('products/setManufacturerCheckboxSelections', this.mfrCheckboxGroup)
    },
    supplierCheckboxGroup(newVal, oldVal) {
      this.$store.commit('products/setSupplierCheckboxSelections', this.supplierCheckboxGroup)
    },
  },
}
</script>
