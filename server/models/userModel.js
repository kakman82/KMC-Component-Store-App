const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') // npm i bcryptjs
const crypto = require('crypto') // core npm

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Lütfen adınızı giriniz!'],
    },
    lastName: {
      type: String,
      required: [true, 'Lütfen soyadınızı giriniz!'],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Lütfen email adresinizi giriniz!'],
      unique: true,
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    role: {
      type: String,
      enum: ['customer', 'employee', 'admin'],
      default: 'customer',
    },
    password: {
      type: String,
      required: [true, 'Lütfen parola giriniz!'],
      minLength: 6,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      currentTime: () => {
        let currDate = new Date()
        let utc_offset = currDate.getTimezoneOffset()
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset)
        return result
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    // created ve updated at alanlarında tam gmt saati göstermesi için;
    timestamps: {
      currentTime: () => {
        let currDate = new Date()
        let utc_offset = currDate.getTimezoneOffset()
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset)
        return result
      },
    },
  }
)

//* 1- Password Hash;
userSchema.pre('save', async function (next) {
  // eğer password de bir modify işlemi varsa ya da yeni kayıt ise 10 karakter olarak hash le ve çık
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
    //
    next()
  } else {
    // değilse yani password de bir modify ya da yeni değer yoksa next ile çık
    return next()
  }
})

//* 2- PasswordChanged field update;
userSchema.pre('save', function (next) {
  // eğer password modify edilmemiş -başında ! var-
  // ya da bu doküman yeni bir kayıt ise -isNew yapıyor
  // passwordChangedAt alanını değiştirmeden devam et demiş oluyoruz;
  // sonuçta değişiklik yok ise passwordChangedAt alanında bir değişklik yapmaya da
  // gerek yok ya da yeni bir dokuman ise yani yeni bir user tanımlanıyor ise
  // şifre değişikliği değildir bu
  if (!this.isModified('password') || this.isNew) return next()

  // eğer password de bir değişiklik oldu ise işlem tarihini ata
  // bazı durumlarda bilgisayar ya da server gecikmelerinden kaynaklı bir durum olur ise
  // ki token üretmek için biraz zaman gerekli,
  // token userın şifresini değiştirmesinden hemen önce
  // üretilmiş olabilir bu durumda userın login olamamasını engellemek için
  // 1 sn lik bir fark (-1000) oluşturmuş olduk...
  this.passwordChangedAt = Date.now() - 1000
  next()
})

//* 3- Password Compare;
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

//* 4- Password Reset Token
// yeni bir password oluşturmak için kullanıcıya mail ile gönderilecek tokenı üreten fonksiyon;
userSchema.methods.createPasswordResetToken = function () {
  // 32 karakterlik bir random hex token üretiyorum
  const resetToken = crypto.randomBytes(32).toString('hex')
  // daha sonra bu tokeni encryp te ediyorum yine hex decimal olarak;
  // ve bunu db ye kaydetmek için -hep encryptli hali kaydedilmeli attacklar için -
  // user modelde oluşturduğum değere eşitliyorum - token karşılaştırması için;
  //! DB ye kayıt komutunu authController içinde veriyorum!!! req ile gelen useri bulduktan sonra!
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  console.log({ resetToken }, this.passwordResetToken)
  // tokenin geçerlilik süresi için modeldeki alanın tanımlanması 10 dakika miliseconde cinsinden
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  // email ile kullanıcıya link ile göndereceğim plain tokeni dönüyorum;
  return resetToken
}

module.exports = mongoose.model('User', userSchema)
