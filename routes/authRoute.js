const express = require("express");
const { SignupUser, loginUser, forgetPass, forgetOtpVerify, changePassWord, } = require("../controller/userController");

const authrouter = express.Router()


// forgetPassword - forget {POST}
authrouter.post("/forget", forgetPass)
authrouter.post("/forgetOtpVerify", forgetOtpVerify)
authrouter.post("/changepassword", changePassWord)

// Create User - signup {POST}
authrouter.post("/signup", SignupUser);

// Login User - login {POST}
authrouter.post("/login", loginUser);


module.exports = authrouter