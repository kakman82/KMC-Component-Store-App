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
  //* Dövizli tutar toplamı
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
  //* TL tutar toplamı
  getCartTotalTL(state) {
    if (state.cart) {
      console.log('cart: ', state.cart)
      let total = 0
      for (let i = 0; i < state.cart.length; i++) {
        total += state.cart[i].productTotalPriceTL
      }
      console.log('cart TL tutar: ', total)
      return total
    } else {
      return 0
    }
  },
  getCurrRates(state) {
    if (state.currRates) {
      return state.currRates.exchanges
    }
  },
  getCartCurrencyInfo(state) {
    if (state.cart) {
      let currArr = []
      for (let i = 0; i < state.cart.length; i++) {
        const curr = state.cart[i].productCurrency
        currArr.push(curr)
      }
      const removeDuplicates = [...new Set(currArr)]
      if (removeDuplicates.length === 1) {
        return removeDuplicates
      } else {
        console.log('Sepette birden fazla döviz cinsine sahip ürün var!!!')
        return null
      }
    }
  },
}
export default getters
