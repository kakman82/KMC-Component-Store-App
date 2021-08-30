// https://codesandbox.io/s/veevalidate-components-buefy-znj4u?file=/src/components/Form.vue
import {
  required,
  confirmed,
  length,
  email,
  double,
} from 'vee-validate/dist/rules' //  npm i vee-validate@^3
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'Bu alan zorunludur!',
})

extend('email', {
  ...email,
  message: 'Geçerli bir e-posta adresi girilmelidir!',
})

extend('confirmed', {
  ...confirmed,
  message: 'Yeni şifre ile aynı olmalıdır!',
})

extend('length', {
  ...length,
  message: 'This field must have 2 options',
})

extend('double', {
  ...double,
  message:
    'Değer sayısal olmalı ve ondalık kısım nokta ile belirtilerek iki basamaklı olmalıdır - %14.75 veya %10.00 gibi...',
})

extend('passwordLength', {
  message: 'En az 6 en çok 10 karakter içermelidir',
  validate: (value) => value.length >= 6 && value.length <= 10,
})

extend('phone', {
  message: '05231231212 veya 0523 123 12 12 şeklinde girilmelidir!',
  validate: (value) =>
    // https://github.com/mgulener/turkiye-regex-kaliplari
    // diğer tel no ları için;
    /^(0)([0-9]{3})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/.test(value) ||
    // cep noları için;
    /^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/.test(value),
})
