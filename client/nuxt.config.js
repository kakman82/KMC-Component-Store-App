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
  plugins: [],

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
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    //! Heroku deploy için bu tanım önemli fakat heroku tanımadığı için BASE_URL manuel tanımladım https://kmc-arrow-store.herokuapp.com/api olarak. ref video-> https://www.youtube.com/watch?v=nngsKhTb2BA&t=946s
    //*TODO 'https://kmc-store-app.herokuapp.com/api' || 'http://localhost:5000/api', bu eklenecek deploy sonrası, şimdilik sadece localhostu bırakıyorum
    baseUrl: 'http://localhost:5000/api',
  },

  //* auth yapısı için tanım: ref-> https://auth.nuxtjs.org/schemes/local/
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          // axios baseUrl tanımında /api yi belirttiğimiz için tekrar api ye burada gerek yok. Yoksa /api/api/auth gibi olur route
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
        },
      },
    },
    // bu şekilde bir tanım yapmazsam sepet sayfasında login olunduğunda direkt ana sayfaya yönlendirme yapıyor kendi. Bu şekilde kendim yönetebiliyorum LoginForm.vue da -  aynı zaman router/middleware ile de login değilse kullanıcı sayfaya gidememesine yönelik yönetim de sağlıyorum aşağıdaki router ile middleware dosyası içindeki authenticated.js ile
    redirect: false,
  },
  router: {
    middleware: ['authenticated'],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
