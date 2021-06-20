const mutations = {
  addProductToCart(state, product) {
    state.cart.unshift(product)
  },
}

export default mutations
