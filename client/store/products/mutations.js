const mutations = {
  setApiProducts(state, apiResponse){
    state.products = apiResponse
  },
  resetValuesForNewSeach(state){
    state.products = []
    state.showOnlyHasStock = true
    state.mfrCheckboxGroup = []
    state.supplierCheckboxGroup = []
  },
  addProductToCart(state, product) {
    // en son sepete eklenen arrayda en üstte -> unshift()
    state.cart.unshift(product)
  },
  setStockCheckboxSelections(state, selection) {
    state.showOnlyHasStock = selection
  },
  setManufacturerCheckboxSelections(state, selection) {
    state.mfrCheckboxGroup = selection
  },
  setSupplierCheckboxSelections(state, selection) {
    state.supplierCheckboxGroup = selection
  },
}

export default mutations
