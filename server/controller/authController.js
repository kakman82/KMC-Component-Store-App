const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Email = require('../utils/email')
const crypto = require('crypto') // core npm

const createSendToken = (user, status, res, message) => {
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  res.status(status).json({
    success: true,
    token: token,
    user: user,
    message: message,
  })
}

//* SIGN UP;
//* @route: POST /api/auth/signup
//* @access: Public
exports.signUpUser = async (req, res) => {
  // gelen req de hiç bir bilgi yok ise - aslında bunu frontend tarafında validate edip requesti gönderiyorum... bu if bloğuna çok gerek yok aslında ama yine de ekledim;
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    res.status(500).json({
      status: 'fail',
      message: 'Lütfen istenen bilgileri giriniz!',
    })
  } else {
    try {
      const newUser = new User()
      newUser.firstName = req.body.firstName
      newUser.lastName = req.body.lastName
      newUser.email = req.body.email
      // userModel içerisinde pre metodu ile hash uygulanacak
      newUser.password = req.body.password
      await newUser.save()

      // mail bodysinde yer alacak olan sitenin adresi için url tanımı
      const url = `${req.protocol}://${req.get('host')}`
      // ve welcome email gönderimi
      await new Email(newUser, url).sendWelcome()

      // DB ye kayıt sonrası token oluşturma ve gönderme
      createSendToken(
        newUser,
        201,
        res,
        'Kullanıcı hesabı başarıyla oluşturuldu.'
      )
    } catch (error) {
      console.log(error)

      res.status(500).json({
        success: false,
        message: error.message,
        messageTR: 'Belirtilen e-posta adresi ile daha önceden kayıt olunmuş!',
      })
    }
  }
}

//* LOGIN;
//* @route: POST /api/auth/login
//* @access: Public
exports.loginUser = async (req, res) => {
  try {
    // +password ile- Çünkü model tanımında passwordun query sonucunda gözükmemesi
    // için select: false demiştik şimdi esasen passwordu almak istediğimiz
    // için bu şekilde çağırdık, daha sonra bu passwordu aşağıda compare edeceğiz
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    )
    //console.log('server foundUser: ', foundUser);
    // comparePassword userModel den geliyor, foundUser değişkeni de userModel den geldiği için func çağrılabilir
    // bu comparePassword bize true ya da false dönecek - şifreyi compare edip
    // aslında ayrı ayrı da kontrol edip user yoksa email hatalı, şifre hatalı ise bunun mesajını da döndürebilirdim
    // fakat hangisinin doğru olduğu anlaşılmasın diye ikisini bir if bloğunda veya || şeklinde tanıladım
    if (!user || !user.comparePassword(req.body.password)) {
      // email ya da şifreden birisi ya da her ikisi birden false ise;
      res.status(403).json({
        success: false,
        message: 'E-posta ya da şifre hatalı!',
      })
      // eğer email ve şifre her ikisi de doğru ise;
    } else {
      // login için gerekli olacak olan token ı üretim res ile gönderiyoruz
      const msg = `Merhaba ${user.firstName}, <br /> Uygulamaya başarıyla giriş yapıldı.`
      createSendToken(user, 200, res, msg)
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* IS LOGGED IN? - Verify token func;
//* @desc: check the user si logged in
exports.isLoggedIn = (req, res, next) => {
  // token bilgisi requestin x-access-token ya da authorization parametresinde yer alıyor
  // client tarafından servera gönderirken parametre adını tanımlayabiliyoruz
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1]
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message:
            'Failed to authenticate! The user belonging to this token does no longer exist!',
          error: err,
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.json({
      success: false,
      message: 'No token provided',
    })
  }
}

//* FORGOT PASSWORD
//* @route: POST /api/users/forgotPassword
//* @access: Public
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(401).json({
      message: 'Bu e-posta adresine sahip kayıtlı kullanıcı bulunamadı!',
    })
  }
  // Generate random token
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // Send token to user email address;
  try {
    // const resetURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/users/resetPassword/${resetToken}`
    // yukarıdaki yapı aynı server içinde template oluşturuken işe yarar
    // ama client farklı bir adreste ise origin kullanmak daha elverişli ve api ifadesi client da yok
    const resetURL = `${req.get('origin')}/users/resetPassword/${resetToken}`

    await new Email(user, resetURL).sendPasswordReset()

    res.status(200).json({
      success: true,
      message:
        'Şifre sıfırlama linki e-posta adresine gönderilmiştir. <br /> E-posta adresini kontrol et, link <b>10 dakika</b> süreliğine geçerlidir!',
    })
  } catch (error) {
    // mail gönderimde hata olur ise yani gitmezde user modelde tanımladığımız
    // token alanlarını undefined yapıp db ye bu şekilde kaydetmeliyiz
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return res.status(400).json({
      message:
        'E-posta gönderiminde hata oluştu, lütfen daha sonra tekrar deneyin!',
    })
  }
}
//* RESET PASSWORD
//* @route: PATCH /api/users/resetPassword/:token'
//* @access: Public
exports.resetPassword = async (req, res, next) => {
  // req ile gelen tokeni yeniden encrypte edip db deki kayıtlı encrypte hali ile karşılaştırdım
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
  // user var mı ve token geçerli mi yani şimdi tarih ve saat den büyük mü
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) {
    return res.status(401).json({
      message:
        'Şifre yenileme linki geçersiz ya da süresi dolmuş! Şifremi unuttum adımından yeniden istek yapılmalıdır.',
    })
  }
  // herşey ok ise;
  user.password = req.body.password

  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  // burada validate istediğimiz için ek false tanımı yapmadık
  await user.save()

  // login için gerekli olacak olan token ı üretim res ile gönderiyoruz
  const msg = `Merhaba ${user.firstName}, <br /> Şifre başarıyla değiştirildi ve uygulamaya giriş yapıldı.`
  createSendToken(user, 200, res, msg)
}

//* UPDATE PASSWORD by already loggedin user;
//* @route: PATCH /api/users/profile/updateMyPassword
//* @access: Private
exports.updatePassword = async (req, res) => {
  //console.log('servera gelen reg.body: ', req.body)

  const user = await User.findById(req.body.userId).select('+password')

  if (!(await user.comparePassword(req.body.currentPassword))) {
    return res.status(401).json({
      message: 'Mevcut şifre hatalıdır!',
    })
  }
  // herşey ok ise;
  user.password = req.body.newPassword

  await user.save()

  createSendToken(user, 200, res, 'Şifre başarıyla değiştirilmiştir!')
}
