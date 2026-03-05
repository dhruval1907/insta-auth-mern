const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")

async function registerUser(req, res) {

    const { email, username, password, bio, profileImage } = req.body

    const isUserAlredyExits = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (isUserAlredyExits) {
        return res.status(409).json({
            message: "user already exits"
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email, bio, password: hash, profileImage, username
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET)


    res.cookie("token", token)

    res.status(201).json({
        message: "user created successfully",
        user
    })

}

async function loginUser(req, res) {
    try {

        const { email, password } = req.body

        // check if user exists
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        // create token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // send cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}

module.exports = {
    registerUser, loginUser
}
