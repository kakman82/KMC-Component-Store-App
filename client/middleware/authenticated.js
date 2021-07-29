export default function ({ store, route, redirect }) {
  if (!store.getters['isLogin'] && route.path === '/placeorder') {
    return redirect('/')
  }
}
