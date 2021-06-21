<template>
  <div class="container ml-5">
    <aside class="menu">
      <p class="menu-label has-text-weight-bold">Filtreler</p>
      <!-- Stok Filtre -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Yalnızca Stoğu Olanları Göster</a>
          <ul>
            <b-field>
              <b-checkbox v-model="stockCheckboxValue" type="is-info"> Evet </b-checkbox>
            </b-field>
          </ul>
          <!-- <p class="content"><b>Selection:</b> {{ stockCheckboxValue }}</p> -->
        </li>
      </ul>
      <!-- Üretici Firma Filter -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Üretici Firma [A-Z]</a>
          <ul v-for="(manufacturer, i) in manufacturers" :key="i">
            <b-field>
              <b-checkbox v-model="mfrCheckboxGroup" :native-value="manufacturer" type="is-info">
                {{ manufacturer }}
              </b-checkbox>
            </b-field>
          </ul>
          <!-- <p class="content"><b>Selection:</b> {{ mfrCheckboxGroup }}</p> -->
        </li>
      </ul>
      <!-- Tedarik Yeri Filter -->
      <ul class="menu-list">
        <li>
          <a class="is-active has-text-weight-bold">Tedarik Firma/Bölge [A-Z]</a>
          <ul v-for="(supplier, i) in suppliers" :key="i">
            <b-field>
              <b-checkbox v-model="supplierCheckboxGroup" :native-value="supplier" type="is-info">
                {{ supplier }}
              </b-checkbox>
            </b-field>
          </ul>
          <!-- <p class="content"><b>Selection:</b> {{ supplierCheckboxGroup }}</p> -->
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stockCheckboxValue: true,
      mfrCheckboxGroup: [],
      supplierCheckboxGroup: [],
    }
  },
  computed: {
    manufacturers() {
      return this.$store.getters['products/getManufacturerNames']
    },
    suppliers() {
      return this.$store.getters['products/getSupplierNames']
    },
  },
  watch: {
    stockCheckboxValue(newVal, oldVal) {
      //console.log('old: ', oldVal, 'new: ', newVal)
      this.$store.commit('products/setStockCheckboxSelections', newVal)
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
