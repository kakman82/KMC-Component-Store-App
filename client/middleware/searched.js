export default function ({ store, route, redirect }) {
  //console.log(route)
  if (
    store.state.products.search === null &&
    route.name === 'search_result-title'
  ) {
    return redirect('/')
  }
}
