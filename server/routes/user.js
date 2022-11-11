const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { updateUser } = require("../controllers/user");

router.post("/updateuser", updateUser);

module.exports = router;
