const mutations = {
  setProvinces(state, payload) {
    state.provinces = payload
  },
  setDistricts(state, payload) {
    state.districts = payload
  },
  setNeighbourhoods(state, payload) {
    state.neighbourhoods = payload
  },
  resetPttAddresses(state) {
    state.provinces = []
    state.districts = []
    state.neighbourhoods = []
  },
  showModal(state, payload) {
    state.modalForms[payload.type] = payload.action
  },
  setSelectedDeliveryAddress(state, payload) {
    state.selectedDeliveryAddress = payload
  },
  resetSelectedAddress(state) {
    state.selectedDeliveryAddress = {}
  },
  setUserAllDeliveryAddresses(state, payload) {
    state.deliveryAddresses = payload
  },
  addUserDeliveryAddress(state, payload) {
    state.deliveryAddresses.unshift(payload)
  },
  updateUserDeliveryAddress(state, payload) {
    const addressToUpdate = state.deliveryAddresses.filter(
      (el) => el._id === payload._id
    )[0]
    addressToUpdate.firstName = payload.firstName
    addressToUpdate.lastName = payload.lastName
    addressToUpdate.phone = payload.phone
    addressToUpdate.province = payload.province
    addressToUpdate.district = payload.district
    addressToUpdate.neighbourhood = payload.neighbourhood
    addressToUpdate.fullAddress = payload.fullAddress
    addressToUpdate.title = payload.title
    addressToUpdate.createdAt = payload.createdAt
    addressToUpdate.updatedAt = payload.updatedAt
  },
  deleteAddress(state, id) {
    state.deliveryAddresses = state.deliveryAddresses.filter(
      (el) => el._id !== id
    )
  },
  setUserBillingAddress(state, payload) {
    state.billingAddress = payload
  },
}
export default mutations
