const getters = {
  getCartProducts(state) {
    return state.cart
  },
  getCartLength(state) {
    if (state.cart) {
      return state.cart.length
    } else {
      return 0
    }
  },
  getCartTotal(state) {
    if (state.cart) {
      let total = 0
      for (let i = 0; i < state.cart.length; i++) {
        total += state.cart[i].productTotalPrice
      }
      return total
    } else {
      return 0
    }
  },
  getCartCurrencyInfo(state) {
    // if (state.cart) {
    //   let currArr = []
    //   for (let i = 0; i < state.cart.length; i++) {
    //     const curr = state.cart[i].productCurrency
    //     currArr.push(curr)
    //   }
    //   const removeDuplicates = [...new Set(currArr)]
    //   if (removeDuplicates.length === 1) {
    //     return removeDuplicates
    //   } else {
    //     console.log('Sepette birden fazla döviz cinsine sahip ürün var!!!')
    //     return null
    //   }
    // }
  },
}
export default getters
