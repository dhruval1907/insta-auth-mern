require("dotenv").config()
const express = require('express');
const authRoutes = require("../src/routes/auth.routes")
const postRouter = require("../src/routes/post.routes")

const app = express()
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/post", postRouter)


module.exports = app