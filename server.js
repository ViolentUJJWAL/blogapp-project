const express = require("express")
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const connectDB = require("./db")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const authrouter = require("./routes/authRoute")

// dotenv configer
require("dotenv").config()

const PORT = process.env.PORT || 8000

// rest object
const app = express()

// run only in heroku server
if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
}

// connect mongoDB
let dbUserName = process.env.DB_USERNAME
let dbPassword = process.env.DB_PASSWORD
const URL = `mongodb+srv://${dbUserName}:${dbPassword}@violentujjwal.hgckwza.mongodb.net/bolgapp`
connectDB(URL)

// middelware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/api/v1/auth", authrouter)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)


// server listen
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} on Post- ${PORT}`.bgBlue.black)
})