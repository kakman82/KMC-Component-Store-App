const actions = {
  async getProvinces({ commit }) {
    try {
      const res = await this.$axios.$get('/users/pttAddresses/provinces')
      if (res.success) {
        commit('setProvinces', res.provinces)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getDistricts({ commit }, province) {
    try {
      const res = await this.$axios.$get(`/users/pttAddresses/${province}`)
      if (res.success) {
        commit('setDistricts', res.districts)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getNeighbourhoods({ commit }, payload) {
    try {
      const res = await this.$axios.$get(
        `/users/pttAddresses/${payload.province}/${payload.district}`
      )
      if (res.success) {
        commit('setNeighbourhoods', res.neighbourhoods)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getUserDeliveryAddresses({ commit }) {
    try {
      const response = await this.$axios.$get('/users/deliveryAddresses')

      if (response.error && response.error.name === 'TokenExpiredError') {
        return this.$store.commit('logout', {
          type: 'is-danger',
          duration: 7000,
          message:
            'Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!',
        })
      }
      if (response.success) {
        const activeAddresses = response.addresses.filter(
          (el) => el.active === true
        )
        commit('setUserAllDeliveryAddresses', activeAddresses)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getUserBillingAddress({ commit }) {
    try {
      const response = await this.$axios.$get('users/billingAddresses')

      if (response.error && response.error.name === 'TokenExpiredError') {
        return this.$store.commit('logout', {
          type: 'is-danger',
          duration: 7000,
          message:
            'Oturum süreniz dolmuştur. Uygulamaya tekrar giriş yapılmalıdır!',
        })
      }
      if (response.success) {
        commit('setUserBillingAddress', response.userBillAddress[0])
      }
    } catch (error) {
      console.log(error)
    }
  },
}
export default actions
