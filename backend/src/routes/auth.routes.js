const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
// const userModel = require("../models/user.model")

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser  )




module.exports = authRouter