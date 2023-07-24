const express = require("express");
const { getAllUser, userToAdmin, adminToUser, } = require("../controller/userController");
const checktoken = require("../middelware/checkToken");

const router = express.Router()

// getAllUser - allUser {get}
router.use(checktoken)
router.get("/allUser/:userName", getAllUser)

// user To admin - /userToAdmin/:userName?id=_id
router.get("/userToAdmin/:userName", userToAdmin)

// admin To user - /adminToUser/:userName?id=_id
router.get("/adminToUser/:userName", adminToUser)


module.exports = router