const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { login, reqister } = require("../controllers/auth");

router.post("/reqister", reqister);

router.post("/login", login);

module.exports = router;
