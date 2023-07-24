const jwt = require("jsonwebtoken")
const secretKey = require("../secretKey")

function checktoken(req, res, next){
    try {
        const token =  req.headers.token
        let verifyToken = jwt.verify(token, secretKey)
        next()
    } catch (error) {
        return res.status(401).send({
            msg: "please log in first",
            success: false
        })
    }
}

module.exports = checktoken