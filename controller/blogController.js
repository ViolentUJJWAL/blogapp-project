const blogModule = require("../models/blogModel")
const userModule = require("../models/userModel")
const mongoose = require("mongoose")



// getallBlog
exports.getAllBlog = async(req, res)=>{
    try {
        const allBlog = await blogModule.find()
        return res.status(200).send({
            msg: "get All Blogs",
            success: true,
            blogCount: allBlog.length,
            data: allBlog,
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in getAllBlog",
            success: false,
            error: error,
        })
    }
}

exports.loginUserData = async(req, res)=>{
    try {
        const userData = await userModule.find({userName: {$eq: req.params.userName}})
        if(userData.length === 0){
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }
        return res.status(200).send({
            msg: "user Data",
            success: true,
            user: userData
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in getUserProfil",
            success: false,
            error: error,
        })
    }
}

// get userProfile
exports.getUserProfil = async(req, res)=>{
    try {
        const userData = await userModule.find({userName: {$eq: req.params.userName}})
        if(userData.length === 0){
            return res.status(404).send({
                msg: "User not found",
                success: false,
            })
        }
        const userBlog = await blogModule.find({autherId: {$eq: userData[0]._id}})
        return res.status(200).send({
            msg: "user profile",
            success: true,
            user: {
                name: userData[0].name,
                userName: userData[0].userName,
                email: userData[0].email,
                role: userData[0].role
            },
            blog: userBlog
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in getUserProfil",
            success: false,
            error: error,
        })
    }
}

// createBlog =>{title, despription, image, autherName, autherId}
exports.createBlog = async (req, res) => {
    try {
        const { title, description, image, category, autherName, autherId } = req.body

        if (!title || !description || !image || !category || !autherId || !autherName) {
            return res.status(400).send({
                msg: "fill all fields",
                success: false,
            })
        }

        const verifyId = await userModule.find({ _id: autherId })
        if (verifyId.length === 0) {
            return res.status(404).send({
                msg: "user not found so you cannot create bolg",
                success: false,
            })
        }
        const createUserBlog = await new blogModule({ title, description, image, category, autherName, autherId }).save()
        return res.status(201).send({
            msg: "blog created successfully",
            success: true,
            data: createUserBlog
        })
    }
    catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in createBlog",
            success: false,
            error: error,
        })
    }
}


// updateBlog => req.params = {userName}, req.query = {blogId}
exports.updateBlog = async (req, res) => {
    try {
        const { userName } = req.params
        const {id: _id} = req.query
        const updateBlog = req.body
        if(!userName || !_id || !updateBlog){
            return res.status(400).send({
                msg: "request not valid check API URL and update data",
                success: false,
            })
        }
        existUser = await userModule.find({ userName: { $eq: userName } })
        if (existUser.length === 0) {
            return res.status(404).send({
                msg: "user Not found for blog update",
                success: false,
            })
        }
        const existBlog = await blogModule.find({_id})
        if (existBlog.length === 0) {
            return res.status(404).send({
                msg: "blog not found",
                success: false,
            })
        }
        if (existBlog[0].autherId != existUser[0]._id && existUser[0].role != "admin") {
            return res.status(401).send({
                msg: "user cannot edit auther user blog",
                success: false,
            })
        }

        const updateDate = await blogModule.findByIdAndUpdate({_id}, updateBlog, {new:true})
        return res.status(200).send({
            msg: "done update",
            success: true,
            data: updateDate
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in updateBlog",
            success: false,
            error: error,
        })
    }
}


// deleteBlog => req.params = {userName}, req.query = {blogId}
exports.deleteBlog = async (req, res) => {
    try {
        const { userName } = req.params
        const {id: _id} = req.query
        if(!userName || !_id){
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        existUser = await userModule.find({ userName: { $eq: userName } })
        if (existUser.length === 0) {
            return res.status(404).send({
                msg: "user Not found for blog delete",
                success: false,
            })
        }
        const existBlog = await blogModule.find({_id})
        if (existBlog.length === 0) {
            return res.status(404).send({
                msg: "blog not found",
                success: false,
            })
        }
        if (existBlog[0].autherId != existUser[0]._id && existUser[0].role != "admin") {
            return res.status(401).send({
                msg: "user cannot delete auther user blog",
                success: false,
            })
        }

        const deleteDate = await blogModule.findByIdAndDelete({_id})
        return res.status(200).send({
            msg: "done delete",
            success: true,
            data: deleteDate
        })
    } catch (error) {
        // when occur err so run this code and send res.
        console.log(`error in this req (\n${req}\n)\nerror is (\n${error}\n)`)
        return res.status(500).send({
            msg: "error in deleteBlog",
            success: false,
            error: error,
        })
    }
}


// linkBlog
exports.likeBlog = async(req, res)=>{
    try {
        const { userName } = req.params
        const {id: _id} = req.query
        if(!userName || !_id){
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        existUser = await userModule.find({ userName: { $eq: userName } })
        if (existUser.length === 0) {
            return res.status(404).send({
                msg: "user Not found",
                success: false,
            })
        }
        const existBlog = await blogModule.find({_id})
        if (existBlog.length === 0) {
            return res.status(404).send({
                msg: "blog not found",
                success: false,
            })
        }
        if(existBlog[0].like.indexOf(existUser[0]._id) !== -1){
            return res.status(400).send({
                msg: "user aleary like",
                success: false,
            })
        }
        const like = await existBlog[0].like
        like.push(existUser[0]._id)
        console.log(like)
        const likedDate = await blogModule.findByIdAndUpdate({_id}, {like}, {new:true})
        return res.status(200).send({
            msg: "done like",
            success: true,
            data: likedDate
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

// dislinkBlog
exports.dislikeBlog = async(req, res)=>{
    try {
        const { userName } = req.params
        const {id: _id} = req.query
        if(!userName || !_id){
            return res.status(400).send({
                msg: "request not valid check API URL",
                success: false,
            })
        }
        existUser = await userModule.find({ userName: { $eq: userName } })
        if (existUser.length === 0) {
            return res.status(404).send({
                msg: "user Not found",
                success: false,
            })
        }
        const existBlog = await blogModule.find({_id})
        if (existBlog.length === 0) {
            return res.status(404).send({
                msg: "blog not found",
                success: false,
            })
        }
        if(existBlog[0].like.indexOf(existUser[0]._id) === -1){
            return res.status(400).send({
                msg: "first like then dislike",
                success: false,
            })
        }
        const like = await existBlog[0].like
        like.splice(like.indexOf(existUser[0]._id), 1)
        console.log(like)
        const dislikedDate = await blogModule.findByIdAndUpdate({_id}, {like}, {new:true})
        return res.status(200).send({
            msg: "done like",
            success: true,
            data: dislikedDate
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
