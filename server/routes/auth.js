const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/reqister", async (req, res) => {
  const { username, email, password, profilePicture } = req.body;
  console.log(req.body);
  try {
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
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    !user && res.status(404).json("user not fond");

    //validate password
    const validpswd = await bcrypt.compare(password, user.password);
    console.log(validpswd);
    !validpswd && res.status(400).json("Password is incorrect");
    const updateduser = await User.findOne({ email });
    console.log(updateduser);
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
