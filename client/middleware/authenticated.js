export default function ({ store, route, redirect }) {
  if (!store.getters['isLogin'] && route.path === '/checkout') {
    return redirect('/')
  }

  if (store.state.user) {
    const timeValue = store.state.user.tokenExpiresIn
    const expirationTime = timeValue - Date.now()
    if (expirationTime < 0) {
      store.commit('logout', {
        type: 'is-danger',
        duration: 7000,
        message: 'Oturum süresi dolmuştur. Tekrar giriş yapılmalıdır!',
      })
    }
  }
}
