const express = require("express")
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const connectDB = require("./db")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const authrouter = require("./routes/authRoute")
const path = require('path')

// dotenv configer
require("dotenv").config()

const PORT = process.env.PORT || 8000

// rest object
const app = express()

// run only in heroku server
if(process.env.NODE_ENV==="production"){
    app.get('/', (req, res)=>{
        app.use(express.static(path.resolve(__dirname, "client", 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

// connect mongoDB

const URL = process.env.DB_URL
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