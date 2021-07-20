export default function ({ $auth, route, redirect }) {
  //console.log($auth)
  if (!$auth.loggedIn && route.path === '/placeorder') {
    redirect('/')
  }
}
