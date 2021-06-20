const actions = {
  // Actions methods
  sendCheckboxSelections({ commit }, selection) {
    commit('setCheckboxSelections', selection)
  },
}

export default actions
