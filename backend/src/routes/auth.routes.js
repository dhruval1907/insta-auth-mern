const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

authRouter.post("/register", async (req, res) => {
    const { email, username, password, bio, profileImage } = req.body

    const isEmailAlreadyExits = await 

    if (isUserAlreadyExits) {
        return res.status(409).json({
            message: "user already exits" + (isUserAlreadyExits.email === email ? "email already exits" : "username already exits")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")


    const user = await userModel.create({
        username, email, bio, profileImage, password: hash
    })

    const token = jwt.sign({
        id: user._id,

    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "user registred",
        user,
        token
    })

})

module.exports = authRouter