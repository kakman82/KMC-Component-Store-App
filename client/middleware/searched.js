export default function ({ store, route, redirect }) {
  if (
    store.state.products.search === null &&
    route.name === 'search_result-title'
  ) {
    return redirect('/')
  }
}
