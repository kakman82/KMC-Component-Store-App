import jwtDecode from 'jwt-decode' // npm i jwt-decode
import lodash from '../node_modules/lodash-es'
import Cookie from 'js-cookie' // npm i js-cookie
import { ToastProgrammatic as Toast } from '../node_modules/buefy'

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
    if (!req && !req.headers.cookie) return

    const token = Cookie.get('access_token')
    //cookie de bir kayıt varsa decode işlemi;
    let decoded = ''
    if (token) {
      decoded = jwtDecode(token)
    }
    // decode işlemi oldu ise gerekli user bilgisinin state kaydı için mutationa gönder;
    if (decoded) {
      commit('setUser', decoded)
    }
  },
}

export const mutations = {
  setUser(state, payload) {
    const userData = {
      id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      role: payload.role,
      tokenExpiresIn: payload.exp * 1000,
    }
    state.user = userData
  },
  logout(state, payload) {
    state.user = ''
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
  getUser(state) {
    return state.user
  },
}
// chrome consolda Error: [vuex] Do not mutate vuex store state outside mutation handlers hatasını almamak için nuxt daki store.js deki strict tanımını false yaparak override ettim. Normal de production modunda zaten false oluyor
// https://github.com/nuxt/nuxt.js/issues/1521
// https://vuex.vuejs.org/guide/strict.html
export const strict = false
