const User = require('../models/userModel');

//* USER PROFILE;
exports.userProfile = async (req, res) => {
  try {
    const currentUser = await User.findById(req.decoded._id);
    if (currentUser) {
      res.status(200).json({
        status: 'success',
        user: currentUser,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
