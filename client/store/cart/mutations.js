const mutations = {
  addProductToCart(state, product) {
    state.cart.unshift(product)
  },
  deleteProductFromCart(state, id) {
    state.cart = state.cart.filter((el) => el.productCartId !== id)
  },
  setExhanges(state, data) {
    state.currRates = data
  },
  setTLPriceToCartProduct(state, data) {
    // kurları apiden geldikten sonra sepette TL tutarını hesaplayıp
    //store cart product update etmek için;
    // önce gönderdiğimi id ile hangi ürünü update edeceğimizi buluyorum
    const foundCartProduct = state.cart.filter(
      (el) => el.productCartId === data.id
    )[0]
    // sonra bu ürüne yeni bir key value olarak ekliyoruz
    foundCartProduct.productTotalPriceTL = data.productTotalPriceTL
  },
}

export default mutations
