export default function ({ store, route, redirect }) {
  if (!store.getters['isLogin'] && route.path === '/checkout') {
    return redirect('/')
  }

  if (!store.getters['isLogin'] && route.path.startsWith('/users')) {
    return redirect('/')
  }

  if (
    store.getters['isLogin'] &&
    store.state.user.role !== 'admin' &&
    route.path.includes('admin')
  ) {
    return redirect('/')
  }

  if (store.state.user) {
    const sessioUserTokenTimeValue = store.state.user.tokenExpiresIn

    const expirationTime = sessioUserTokenTimeValue - Date.now()

    // login sırasında vuex de set edilen token exp süresi şimdiki zamandan
    // küçük ise yani farkları < 0 ise user logout olacak..
    if (expirationTime < 0) {
      store.commit('logout', {
        type: 'is-danger',
        duration: 7000,
        message: 'Oturum süresi dolmuştur. Tekrar giriş yapılmalıdır!',
      })
    }
  }
}
