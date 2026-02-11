const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const cookie = require("cookie-parser")

const app = express()
app.use(express.json())
app.use("/api/auth", authRouter)
app.use(cookie())

module.exports = app