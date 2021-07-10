const mongoose = require('mongoose');
// const Schema = mongoose.Schema();
const bcrypt = require('bcryptjs');

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
      default: () => {
        let currDate = new Date();
        let utc_offset = currDate.getTimezoneOffset();
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset);
        return result;
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
        let currDate = new Date();
        let utc_offset = currDate.getTimezoneOffset();
        let result = currDate.setMinutes(currDate.getMinutes() - utc_offset);
        return result;
      },
    },
  }
);

//* 1- Password Hash;
userSchema.pre('save', async function (next) {
  // eğer password de bir modify işlemi varsa ya da yeni kayıt ise 10 karakter olarak hash le ve çık
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    //
    next();
  } else {
    // değilse yani password de bir modify ya da yeni değer yoksa next ile çık
    return next();
  }
});

//* 2- PasswordChanged field update;
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    // eğer password de bir değişiklik oldu ise işlem tarihini ata
    // bazı durumlarda bilgisayar ya da server gecikmelerinden kaynaklı bir durum olur ise
    // ki token üretmek için biraz zaman gerekli, token userın şifresini değiştirmesinden hemen önce
    // üretilmiş olabilir bu durumda userın login olamamasını engellemek için 1 sn lik bir fark (-1000) oluşturmuş olduk...
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } else {
    return next();
  }
});

//* 3- Password Compare;
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
