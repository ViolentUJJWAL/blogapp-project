const express = require("express");
const checkToken = require("../middelware/checkToken");
const { createBlog, updateBlog, deleteBlog, getAllBlog, getUserProfil, likeBlog, dislikeBlog, loginUserData } = require("../controller/blogController");

const router = express.Router()

// middelware
router.use(checkToken)


// getAllBlog - GET"/allblog"
router.get("/allblog", getAllBlog)

// userinfo - get "/userinfo/:userName"
router.get("/userInfo/:userName", loginUserData)

// get userProfile - GET"/userName"
router.get("/:userName", getUserProfil);

// Create blog - POST"/create"
router.post("/create", createBlog);

// like blog - PUT"/like/<userName>?id=blogId"
router.put("/like/:userName", likeBlog)

// dislike blog - PUT"/dislike/<userName>?id=blogId"
router.put("/dislike/:userName", dislikeBlog)

// update blog - PUT"/update/<userName>?id=blogId"
router.put("/update/:userName", updateBlog);

// delete blog - DELETE"/delete/<userName>?id=blogId"
router.delete("/delete/:userName", deleteBlog);



module.exports = router