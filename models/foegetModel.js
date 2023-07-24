const mongoose = require("mongoose")

const forgetShcema = new mongoose.Schema({
    userEmail: {
        type: String,
    },
    userId: {
        type: String,
    },
    OTP: {
        type: Number,
    },
    verifyStatus: {
        type: String,
        default: "pending"
    },
}, {timestamps:true})

const forgetModule = mongoose.model("forget", forgetShcema)

module.exports = forgetModule