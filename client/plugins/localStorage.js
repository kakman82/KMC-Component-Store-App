// npm i vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'cart',
      paths: ['cart.cart', 'order.amounts'],
    })(store)
  })
}
