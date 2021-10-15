<template>
  <section>
    <Navbar />

    <Nuxt keep-alive />

    <Footer />
  </section>
</template>
<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cookie from 'js-cookie' // npm i js-cookie
import jwtDecode from 'jwt-decode' // npm i jwt-decode
export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
  },
  created() {
    const token = Cookie.get()
    if (token) {
      const decoded = jwtDecode(token.access_token)
      this.$store.commit('setUser', decoded)
    }
  },
}
</script>
