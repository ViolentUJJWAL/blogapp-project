const userModule = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_key = require("../secretKey")
const forgetModule = require("../models/foegetModel")
const nodemailer = require("nodemailer")

// SignupUser => name, userName, email, password
exports.SignupUser = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body

        // check all fields is present
        if (!userName || !name || !email || !password) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }

        // check user is unique
        const existUserbyemail = await userModule.find({ email: { $eq: email } })
        const existUserbyusername = await userModule.find({ userName: { $eq: userName } })
        if (existUserbyemail.length > 0) {
            return res.status(400).send({
                msg: `error User aleady exist`,
                success: false,
                error: `Email`,
            })
        }
        if (existUserbyusername.length > 0) {
            return res.status(400).send({
                msg: `Enter unique UserName`,
                success: false,
                error: `userName`,
            })
        }

        // pasword to HashPassword
        const HashPassword = await bcrypt.hash(password, 10, async function (err, hash) {
            // ckech error
            if (err) {
                return res.status(500).send({
                    msg: "Internal server err",
                    success: false,
                    error: err
                })
            }

            // data are save in DB
            const userData = await new userModule({ userName, name, email, password: hash }).save()
            console.log(userData)
            return res.status(201).send({
                msg: "user created successfully",
                success: true,
                data: userData
            })
        })
    }
    catch (err) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in SingupUser",
            success: false,
            error: err,
        })
    }
}

const sendEmail = async (userEmail, sub, msg) => {
    const transport = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        sender: true,
        auth: {
            user: process.env.EMAIL_FOR_NODEMAILER,
            pass: process.env.APP_PASS
        }
    })
    try {
        const info = await transport.sendMail({
            from: '"ViolentUjjwal"<2108ujjwal2108@gmail.com>',
            to: userEmail,
            subject: sub,
            text: msg
        })
        console.log("Msg send: ", info.messageId)
        return "mail_send"
    } catch (error) {
        console.log(error)
        return "not_send"
    }
}


// forget = Email
exports.forgetPass = async (req, res) => {
    try {
        const email = req.body.email
        if (!email) {
            return res.status(400).send({
                msg: "enter email",
                success: false,
            })
        }
        const userdata = await userModule.find({ email: { $eq: email } })
        if (userdata.length === 0) {
            return res.status(404).send({
                msg: "user not found",
                success: false,
            })
        }
        const genOTP = await Math.floor(Math.random() * (100000 - 90000 + 1)) + 100000;
        const msg = await `forget password your OTP is ${genOTP}`
        const emailSender = await sendEmail(email, "OTP", msg)
        if (emailSender === "not_send") {
            return res.status(500).send({
                msg: "Email not send",
                success: false,
            })
        }
        const userForgetData = await new forgetModule({
            userEmail: userdata[0].email,
            userId: userdata[0]._id,
            OTP: genOTP,
        }).save()

        return res.status(200).send({
            msg: "OTP send",
            success: true,
            id: userForgetData._id
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in forget",
            success: false,
            error: error,
        })
    }
}

exports.forgetOtpVerify = async (req, res) => {
    try {
        const email = req.body.email
        const otp = req.body.otp
        const id = req.body.id
        if (!email || !otp) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }
        const userdata = await forgetModule.findById(id)
        console.log(userdata)
        if (userdata.length === 0) {
            return res.status(404).send({
                msg: "time expair",
                success: false,
            })
        }
        console.log(otp, userdata.OTP)
        if (otp !== userdata.OTP) {
            return res.status(400).send({
                msg: "Wrong otp",
                success: false,
            })
        }
        const verifyOTPdata = await forgetModule.findByIdAndUpdate(userdata._id, { verifyStatus: "verify" }, { new: true })
        return res.status(200).send({
            msg: "otp verify",
            success: true,
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in forget",
            success: false,
            error: error,
        })
    }
}

// changePassWord => email, password, id
exports.changePassWord = async (req, res) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
        if (!email || !password || !id) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }
        const userdata = await forgetModule.findById(id)
        if (!userdata) {
            return res.status(404).send({
                msg: "time expair",
                success: false,
            })
        }
        if (userdata.verifyStatus !== "verify" || userdata.userEmail !== email) {
            return res.status(400).send({
                msg: "Wrong otp",
                success: false,
            })
        }
        const HashPassword = await bcrypt.hash(password, 10, async function (err, hash) {
            // ckech error
            if (err) {
                return res.status(500).send({
                    msg: "Internal server err",
                    success: false,
                    error: err
                })
            }

            // data are save in DB
            const userData = await userModule.findOneAndUpdate(
                { email: { $eq: email } },
                { password: hash }, { new: true })
            console.log(userData)
            const msg = `${userData.name} your password changed userName is ${userData.userName}`
            const emailSender = await sendEmail(email, "password change", msg)
            if (emailSender === "not_send") {
                return res.status(201).send({
                    msg: "change password successfully but Email not send",
                    success: true,
                })
            }
            return res.status(201).send({
                msg: "change password successfully",
                success: true,
                data: userData
            })
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in forget",
            success: false,
            error: error,
        })
    }
}



// loginUser => userName, password
exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body

        // check all fields is present
        if (!userName | !password) {
            return res.status(400).send({
                msg: "please fill all fields",
                success: false,
            })
        }

        // find user in database
        const findUser = await userModule.find({ userName: { $eq: userName } })
        if (findUser.length === 0) {
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }

        // check user password
        const checkIsUser = await bcrypt.compare(password, findUser[0].password, function (err, result) {
            if (err) {
                return res.status(500).send({
                    msg: "Internal server err",
                    success: false,
                    error: err
                })
            }

            // if password is worng
            if (result === false) {
                return res.status(403).send({
                    msg: "Wrong password",
                    success: false,
                })
            }

            // confirm password and send res.
            // create JWT signature
            let token = jwt.sign({ id: findUser[0]._id }, secret_key)
            console.log(token)
            return res.status(200).send({
                msg: "Log in successfully",
                success: true,
                token: token,
                data: findUser[0]
            })
        })
    }
    catch (err) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${err}\n)`)
        return res.status(500).send({
            msg: "error in loginUser",
            success: false,
            error: err,
        })
    }
}


// getAllUser
exports.getAllUser = async (req, res) => {
    try {
        const { userName } = req.params
        if (!userName) {
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        const userData = await userModule.find({ userName: { $eq: userName } })
        if (userData.length === 0) {
            return res.status(404).send({
                msg: "user not found",
                success: false,
            })
        }
        if (userData[0].role === "user") {
            return res.status(401).send({
                msg: "user cannot get all user, only admin get all user",
                success: false,
            })
        }
        const allUserData = await userModule.find()
        return res.status(200).send({
            msg: "all users",
            success: true,
            totalUser: allUserData.length,
            userData: allUserData
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in likeBlog",
            success: false,
            error: error,
        })
    }
}


exports.userToAdmin = async (req, res) => {
    try {
        const { userName } = req.params
        const { id: _id } = req.query
        if (!userName || !_id) {
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        const AdminData = await userModule.find({ userName: { $eq: userName } })
        const userData = await userModule.find({ _id })
        if (userData.length === 0 || AdminData.length === 0) {
            return res.status(404).send({
                msg: "user not found",
                success: false,
            })
        }
        if (AdminData[0].role === "user") {
            return res.status(401).send({
                msg: "user cannot get all user, only admin get all user",
                success: false,
            })
        }
        const toAdmin = await userModule.findByIdAndUpdate({ _id }, { role: "admin" }, { new: true })
        return res.status(200).send({
            msg: "user convert to Admin",
            success: true,
            userData: toAdmin
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in userToAdmin",
            success: false,
            error: error,
        })
    }
}

exports.adminToUser = async (req, res) => {
    try {
        const { userName } = req.params
        const { id: _id } = req.query
        if (!userName || !_id) {
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        const AdminData = await userModule.find({ userName: { $eq: userName } })
        const userData = await userModule.find({ _id })
        if (userData.length === 0 || AdminData.length === 0) {
            return res.status(404).send({
                msg: "user not found",
                success: false,
            })
        }
        if (AdminData[0].role === "user") {
            return res.status(401).send({
                msg: "user cannot get all user, only admin get all user",
                success: false,
            })
        }
        const toUser = await userModule.findByIdAndUpdate({ _id }, { role: "user" }, { new: true })
        return res.status(200).send({
            msg: "admin convert to user",
            success: true,
            userData: toUser
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in adminToUser",
            success: false,
            error: error,
        })
    }
}
