const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../error");
const jwt = require("jsonwebtoken");

const reqister = async (req, res, next) => {
  const { username, email, password, profilePicture } = req.body;
  console.log(req.body);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return next(createError(404, "User Exists"));
    }
    if (!username || !email || !password || !profilePicture) {
      return next(createError(404, "Please enter all the fields"));
    }
    //generate a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new User({
      username,
      email,
      profilePicture,
      password: hashedPassword,
    });
    console.log(newUser);
    //save user and send response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return next(createError(404, "Please enter all the fields"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createError(404, "user not fond"));

    //validate password
    const validpswd = await bcrypt.compare(password, user.password);
    console.log(validpswd);
    if (!validpswd) return next(createError(400, "Password is incorrect"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const updateduser = await User.findOne({ email });
    console.log(updateduser);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(updateduser);
    //res.status(200).json(updateduser);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, reqister };
