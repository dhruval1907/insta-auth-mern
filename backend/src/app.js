require("dotenv").config()
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// required routes
const postRouter = require("../src/routes/post.routes")
const authRouter = require("../src/routes/auth.routes");
const userRouter = require("../src/routes/user.routes")

// using routes
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)


module.exports = app