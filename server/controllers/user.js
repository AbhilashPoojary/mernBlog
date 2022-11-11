const User = require("../models/User");
const { createError } = require("../error");

const updateUser = async (req, res, next) => {
  const {
    username,
    coverPicture,
    email,
    profilePicture,
    phoneNo,
    education,
    city,
    town,
    relationStatus,
    _id,
  } = req.body;
  try {
    const findUser = await User.findOne({ _id });
    if (findUser) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id },
        {
          username,
          coverPicture,
          email,
          profilePicture,
          phoneNo,
          education,
          city,
          town,
          relationStatus,
        },
        { new: true }
      );
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    } else {
      return next(
        createError(404, "Something went wrong please try again later")
      );
    }
  } catch (err) {
    next(createError(err));
  }
};

module.exports = { updateUser };
