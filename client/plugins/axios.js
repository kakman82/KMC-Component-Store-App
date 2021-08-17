import Cookie from 'js-cookie'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    //console.log('Making request to ' + config.url)
    if (config.url.startsWith('/users')) {
      const token = Cookie.get('access_token')
      $axios.setHeader('Authorization', token)
    }
  })
}
