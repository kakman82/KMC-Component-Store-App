const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Email = require('../utils/email');

//* SIGN UP;
exports.signUpUser = async (req, res) => {
  // gelen req de hiç bir bilgi yok ise - aslında bunu frontend tarafında validate edip requesti gönderiyorum... bu if bloğuna çok gerek yok aslında ama yine de ekledim;
  if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
    res.status(500).json({
      status: 'fail',
      message: 'Lütfen istenen bilgileri giriniz!',
    });
  } else {
    try {
      const newUser = new User();
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.email = req.body.email;
      // userModel içerisinde pre metodu ile hash uygulanacak
      newUser.password = req.body.password;
      await newUser.save();

      // welcome email gönderimi
      await new Email(newUser).sendWelcome();

      // DB ye kayıt sonrası token oluşturma
      const token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      //console.log('jwt token: ', token);
      res.status(200).json({
        success: true,
        token: token,
        message: 'Kullanıcı hesabı başarıyla oluşturuldu.',
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
        messageTR: 'Belirtilen e-posta adresi ile daha önceden kayıt olunmuş!',
      });
    }
  }
};

//* LOGIN;
exports.loginUser = async (req, res) => {
  try {
    // +password ile- Çünkü model tanımında passwordun query sonucunda gözükmemesi
    // için select: false demiştik şimdi esasen passwordu almak istediğimiz
    // için bu şekilde çağırdık, daha sonra bu passwordu aşağıda compare edeceğiz
    const foundUser = await User.findOne({ email: req.body.email }).select('+password');
    // comparePassword userModel den geliyor, foundUser değişkeni de userModel den geldiği için func çağrılabilir
    // bu comparePassword bize true ya da false dönecek - şifreyi compare edip
    // aslında ayrı ayrı da kontrol edip user yoksa email hatalı, şifre hatalı ise bunun mesajını da döndürebilirdim fakat hangisinin doğru olduğu anlaşılmasın diye ikisini bir if bloğunda veya || şeklinde tanıladım
    if (!foundUser || !foundUser.comparePassword(req.body.password)) {
      // email ya da şifreden birisi ya da her ikisi birden false ise;
      res.status(403).json({
        status: 'failed',
        message: 'Giriş başarısız. E-posta ya da şifre hatalı!',
      });
      // eğer email ve şifre her ikisi de doğru ise;
    } else {
      // login için gerekli olacak olan token ı üretim res ile gönderiyoruz
      const token = jwt.sign(foundUser.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 604800, // 1 week
      });
      res.status(200).json({
        success: true,
        token: token,
        message: 'Başarıyla giriş yapıldı',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

//* IS LOGGED IN? - Verify token;
exports.isLoggedIn = (req, res, next) => {
  // token bilgisi requestin x-access-token ya da authorization parametresinde yer alıyor
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1];
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          status: 'failed',
          message: 'Failed to authenticate! The user belonging to this token does no longer exist!',
          error: err,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: 'failed',
      message: 'No token provided',
    });
  }
};
