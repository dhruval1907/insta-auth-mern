const express = require("express")
const userModel = require("../models/user.model")
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExits = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExits) {
        return res.status(409).json({
            message: "user already exits"
        })
    }

})
