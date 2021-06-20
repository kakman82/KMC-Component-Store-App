<template>
  <section>
    <Navbar />
    <Nuxt />
    <Footer />
  </section>
</template>
<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Footer,
  },
}
</script>
