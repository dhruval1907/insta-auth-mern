const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const userModel = require("../models/user.model")
const crypto = require("crypto")
const e = require("express")

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", async (req, res) => {
    const { username, password, email } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordMatched = hash == user.password

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "unauthorized access "
        })
    }

    res.status(200).json({
        message: "user logged in",
        user: {
            emial: user.email,
            password: user.password,
            username: user.username
        }
    })

})




module.exports = authRouter