const mongoose = require("mongoose")

const blogShcema = new mongoose.Schema({
    autherName: {
        type: String,
        required: [true, "autherName is Require"],
    },
    autherId: {
        type: String,
        required: [true, "autherId is Require"],
    },
    title: {
        type: String,
        required: [true, "title is Require"],
    },
    image: {
        type: String,
        required: [true, "image is Require"],
    },
    description: {
        type: String,
        required: [true, "description is Require"],
    },
    category: {
        type: String,
        required: [true, "category is Require"],
    },
    like: {
        type: Array,
        default: [],
    }
}, {timestamps:true})

const blogModule = mongoose.model("blog", blogShcema)

module.exports = blogModule