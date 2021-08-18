const mutations = {
  setOrderAmounts(state, data) {
    state.amounts = data
  },
  resetOrderAmounts(state) {
    state.amounts = null
  },
}

export default mutations
