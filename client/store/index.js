import jwtDecode from 'jwt-decode' // npm i jwt-decode
import lodash from '../node_modules/lodash-es'

export const state = () => ({
  user: {},
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
      }
      commit('setUser', userInfo)
    }
  },
}

export const mutations = {
  setUser(state, userData) {
    state.user = userData
  },
  removeUser(state) {
    state.user = {}
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
}
