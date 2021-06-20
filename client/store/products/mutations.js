const mutations = {
  addProductToCart(state, product) {
    // en son sepete eklenen arrayda en üstte -> unshift()
    state.cart.unshift(product)
  },
  setStockCheckboxSelections(state, selection) {
    state.stockGroup = selection
  },
  setManufacturerCheckboxSelections(state, selection) {
    state.mfrCheckboxGroup = selection
  },
  setSupplierCheckboxSelections(state, selection) {
    state.supplierCheckboxGroup = selection
  },
}

export default mutations
