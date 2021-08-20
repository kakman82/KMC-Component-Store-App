const nodemailer = require('nodemailer') // npm install nodemailer
const hbs = require('nodemailer-express-handlebars') // npm i nodemailer-express-handlebars
const path = require('path')

//* Gönderilecek emailler için genel bir constructor class tanımı
// bu class altında nodemailer config yapısı
module.exports = class Email {
  constructor(user, url, order, address) {
    this.to = user.email
    this.firstName = user.firstName
    this.url = url
    this.from = `KMC Elektronik <${process.env.EMAIL_FROM}>`
    this.order = order
    this.address = address
  }
  //yeni bir mail transport tanımı yapıyoruz. Bu tanım production ve development ortamında göre değişiklik gösteriyor;
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //TODO Buradaki kısım Emre'den alacağım mail host bilgileri olacak prod ortamı için şimdilik bu şekilde bıraktım
      //! ek olarak Jonas dan farklı olarak handlebars kullandığım için tanım biraz farklı https://www.youtube.com/watch?v=38aE1lSAJZ8
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'kofisoftteam@gmail.com',
          pass: 'kofisoft2019',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extname: '.hbs',
            partialsDir: path.join(__dirname, '../views/email/'),
            defaultLayout: false,
          },
          viewPath: path.join(__dirname, '../views/email/'),
          extName: '.hbs',
        })
      )
      return transporter
    } else {
      // dev ortamı -test- için mailtrap tanımı
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extname: '.hbs',
            partialsDir: path.join(__dirname, '../views/email/'),
            defaultLayout: false,
          },
          viewPath: path.join(__dirname, '../views/email/'),
          extName: '.hbs',
        })
      )
      return transporter
    }
  }

  async send(template, subject) {
    //Email options;
    const mailOptions = {
      from: this.from,
      to: this.to,
      //TODO bilgi için eklemiştim, sonradan silinecek cc kısmı!
      cc: 'akmankerem@gmail.com',
      subject: subject,
      template: template,
      context: {
        firstName: this.firstName,
        url: this.url,
        order: this.order,
        deliveryAddress: this.address,
        // bu şekilde template içinde kullanılabilecek helper func tanımlamak mümkün
        // ref https://www.youtube.com/watch?v=WaetjCYgB4U
        helpers: {
          niceFormatTL: (value, digits) => {
            const formatted = Intl.NumberFormat('tr-TR', {
              minimumFractionDigits: digits,
              maximumFractionDigits: digits,
            }).format(value)
            return formatted
          },
        },
      },
    }
    // Transportun create edilip mailin gönderilmesi; sendMail nodemailer den geliyor
    await this.newTransport().sendMail(mailOptions)
  }
  // bu sendWelcome authController içindeki signUp içinde çağırdık çünkü o zaman gidecek bu mail
  async sendWelcome() {
    await this.send('welcome', 'KMC Elektronik Sitesine Hoşgeldiniz!')
  }
  // şifre değişikliği için gönderilen email func;
  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Şifre sıfırlama talebi (Sıfırlama linki 10 dakika için geçerlidir!)'
    )
  }
  async sendOrderInfo(orderNumber) {
    await this.send('order', `Sipariş alındı (#:${orderNumber})`)
  }
}
