import jwtDecode from 'jwt-decode' // npm i jwt-decode
import lodash from '../node_modules/lodash-es'
import Cookie from 'js-cookie' // npm i js-cookie
import { ToastProgrammatic as Toast } from '../node_modules/buefy'

export const state = () => ({
  user: {},
  userAddresses: [],
  selectedAddress: [],
  openAddAddressModal: false,
  openUpdateAddressModal: false,
  //addressIdToUpdate: null,
})

export const actions = {
  /* user token bilgilerinin sayfa açılışında cookie de var ya da yok 
  kontrol edip varsa tokeni okuması için nuxtServerInit den yararlandım. 
  Bu metodu kullanmak için nuxt/store da index.js dosyası oluşturmak zorunlu 
  bu nedenle haricen user için ayrı bir folder yaratmadım bu dosyada belirttim
  */
  nuxtServerInit({ commit }, { req }) {
    // headerda cookie yoksa çık
    if (!req.headers.cookie) return

    //cookie de bir kayıt varsa decode işlemi;
    const decoded = jwtDecode(req.headers.cookie)

    // decode işlemi oldu ise gerekli user bilgisinin state kaydı için mutationa gönder;
    if (decoded) {
      const userInfo = {
        id: decoded._id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        role: decoded.role,
        tokenExpiresIn: decoded.exp * 1000,
      }
      commit('setUser', userInfo)
    }
  },
}

export const mutations = {
  setUser(state, userData) {
    state.user = userData
  },
  setUserAddresses(state, payload) {
    state.userAddresses = payload
  },
  addUserAddress(state, newAddress) {
    state.userAddresses.unshift(newAddress)
  },
  // update edilecek adresi storedan getters ile çekebilmek için
  addressToUpdate(state, payload) {
    state.addressIdToUpdate = payload
  },
  updateUserAddress(state, payload) {
    const addressToUpdate = state.userAddresses.filter(
      (el) => el._id === payload._id
    )[0]
    addressToUpdate.firstName = payload.firstName
    addressToUpdate.lastName = payload.lastName
    addressToUpdate.companyName = payload.companyName
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
    state.userAddresses = state.userAddresses.filter((el) => el._id !== id)
    state.selectedAddress = state.selectedAddress.filter(
      (val) => val._id !== id
    )
  },
  setSelectedAddress(state, payload) {
    state.selectedAddress.unshift(payload)
  },
  setAddressModalStatus(state, payload) {
    if (payload === 'add') return (state.openAddAddressModal = true)
    if (payload === 'update') return (state.openUpdateAddressModal = true)
  },
  resetAddressModalStatus(state, payload) {
    if (payload === 'add') return (state.openAddAddressModal = false)
    if (payload === 'update') return (state.openUpdateAddressModal = false)
  },
  logout(state, payload) {
    state.user = {}
    Cookie.remove('access_token')
    this.$router.push('/')
    Toast.open({
      type: payload.type,
      duration: payload.duration,
      message: payload.message,
    })
    // user logout olduktan sonra hem vuex hem de daha önceden created ile
    // alınmış dataların refresh edilmesi için komple sayfayı reload etmek için;
    location.reload()
  },
}

export const getters = {
  isLogin(state) {
    if (lodash.isEmpty(state.user)) {
      return false
    } else {
      return true
    }
  },
  getUserAddresses(state) {
    return state.userAddresses
  },
  getModalType(state) {
    let type = ''
    if (state.openAddAddressModal === true) {
      type = 'add'
    }
    if (state.openUpdateAddressModal === true) {
      type = 'update'
    }
    return type
  },
  getAddressToUpdate(state) {
    const address = state.userAddresses.filter(
      (el) => el._id === state.addressIdToUpdate
    )
    return address
  },
  getSelectedAddress(state) {
    return state.selectedAddress
  },
}
