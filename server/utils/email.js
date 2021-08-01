const nodemailer = require('nodemailer'); // npm install nodemailer
const hbs = require('nodemailer-express-handlebars'); // npm i nodemailer-express-handlebars
const htmlToText = require('html-to-text'); // npm i html-to-text
const path = require('path');

//* Gönderilecek emailler için genel bir constructor class tanımı
// bu class altında nodemailer config yapılacak

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.from = `KMC Elecktronik <${process.env.EMAIL_FROM}>`;
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
      });

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
      );
      return transporter;
    } else {
      // dev ortamı -test- için mailtrap tanımı
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
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
      );
      return transporter;
    }
  }

  async send(template, subject) {
    //Email options;
    const mailOptions = {
      from: this.from,
      to: this.to,
      cc: 'akmankerem@gmail.com',
      subject: subject,
      template: template,
      context: {
        firstName: this.firstName,
      },
      //TODO burası sililenebilir gerek olmayabilir maillerin spama düşmemesi için html i normal plain text e çevirmemiz önemli. Bunun için html-to-text paketinden yararlandım: npm i html-to-text
      //text: htmlToText.convert(html),
    };
    // Transportun create edilip mailin gönderilmesi; sendMail nodemailer den geliyor
    await this.newTransport().sendMail(mailOptions);
  }
  // bu sendWelcome authController içindeki signUp içinde çağırdık çünkü o zaman gidecek bu mail
  async sendWelcome() {
    await this.send('welcome', 'KMC Elektronik Sitesine Hoşgeldiniz!');
  }
};