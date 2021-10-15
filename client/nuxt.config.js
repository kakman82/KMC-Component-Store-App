export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KMC Elektronik',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/kmc-elektronik-logo.gif' },
      //! fontawesome için eklenen tanım; https://buefy.org/documentation/start#icons
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/badge.js', mode: 'client' },
    { src: '~/plugins/formatHelper.js', mode: 'client' },
    { src: '~/plugins/vee-validate.js', mode: 'client' },
    { src: '~/plugins/axios.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //* npm install --save-exact @nuxtjs/auth-next ile auth paketi eklendi
    //* ref: https://auth.nuxtjs.org/guide/setup
    //'@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //! Heroku deploy için bu tanım önemli fakat heroku tanımadığı için BASE_URL ref video-> https://www.youtube.com/watch?v=nngsKhTb2BA&t=946s

    baseUrl:
      'https://kmc-server-app.herokuapp.com/' || 'http://localhost:5000/api',
  },
  router: {
    middleware: ['authenticated', 'searched'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
