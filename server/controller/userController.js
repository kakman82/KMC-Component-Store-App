const User = require('../models/userModel')

//* @desc: Get user profile
//* @route: GET /api/users/profile/:id
//* @access: Private
exports.userProfile = async (req, res) => {
  try {
    const currentUser = await User.findById(req.decoded._id)
    if (currentUser) {
      res.status(200).json({
        success: true,
        user: currentUser,
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
//* @desc: Get All Users
//* @route: GET /api/users
//* @access: Private & Role Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('+active').sort({
      active: 'desc',
      role: 'asc',
      firstName: 'asc',
    })
    res.status(200).json({
      success: true,
      result: users.length,
      users: users,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Update user profile - request is by user
//* @route: PATCH /api/users/profile/:id
//* @access: Private
exports.updateUserProfile = async (req, res) => {
  try {
    //console.log('update profile için gelen req: ', req.body)
    const updatedUser = await User.findByIdAndUpdate(
      req.decoded._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    res.status(200).json({
      success: true,
      message: 'Bilgiler başarıyla güncellendi.',
      user: updatedUser,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Update one user - request is by ADMIN
//* @route: PATCH /api/users
//* @access: Private & ROLE ADMIN
exports.updateOneUserByAdmin = async (req, res) => {
  try {
    //console.log('update profile için gelen req: ', req.body)
    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      message: 'Kullanıcı bilgileri başarıyla güncellendi.',
      user: updatedUser,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
