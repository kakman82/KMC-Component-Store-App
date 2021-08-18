import lodash from '../../node_modules/lodash-es'

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
    let isCurrArrEmpty = lodash.isEmpty(state.currRates)

    if (state.cart && !isCurrArrEmpty) {
      let total = 0
      for (let i = 0; i < state.cart.length; i++) {
        total += state.cart[i].productTotalPriceTL
      }
      return total
    } else {
      while (!isCurrArrEmpty) {
        location.reload()
      }
    }
  },
  getCurrRates(state) {
    if (lodash.isEmpty(state.currRates)) {
      return null
    } else {
      return state.currRates
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
