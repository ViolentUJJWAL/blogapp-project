const mongoose = require("mongoose")

const userShcema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true
    },
    name: {
        type: String,
        required :[true, "Name is required"],
    },
    email: {
        type: String,
        required : [true, "E-Mail is required"],
        unique: true
    },
    password: {
        type: String,
        required : [true, "Password is required"]
    },
    role: {
        type: String,
        default: function(){return "user"}
    },
    date: {
        type: String,
        default: function(){
            const date =  new Date()
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        
        }
    }
}, {timestamps:true})

const userModule = mongoose.model("user", userShcema)

module.exports = userModule