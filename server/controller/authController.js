const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//* SIGN UP;
exports.signUpUser = async (req, res) => {
  // gelen req de hiç bir bilgi yok ise;
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
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
