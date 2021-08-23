const User = require('../models/userModel')

//* @desc: Get user profile
//* @route: POST /api/users/profile/:id
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

//* @desc: Update user profile
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
