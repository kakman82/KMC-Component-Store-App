const mutations = {
  addProductToCart(state, product) {
    state.cart.unshift(product)
  },
  deleteProductFromCart(state, id) {
    state.cart = state.cart.filter((el) => el.productCartId !== id)
  },
}

export default mutations
