const userModel = require("../models/user.model")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")


async function registerUser(req, res) {
    const { email, password, bio, profileImage, username } = req.body

    const isUseralreadyExits = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUseralreadyExits) {
        return res.status(409).json({
            message: "user already exits"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email, username, bio, profileImage, password: hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user,
    })
}

async function loginUser(req, res) {
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

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "unauthorized access "
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "user logged in",
        user: {
            emial: user.email,
            password: user.password,
            username: user.username
        },
    })

}


module.exports = {
    registerUser,
    loginUser
}





















// const userModel = require('../models/user.model')
// const crypto = require('crypto')
// const jwt = require("jsonwebtoken")

// // ---------------- REGISTER ----------------

// async function registerController(req, res) {

//     console.log("REQ BODY:", req.body)

//     try {
//         const { email, username, password, bio, profileImage } = req.body

//         if (!email || !username || !password) {
//             return res.status(400).json({
//                 message: "Email, username and password are required"
//             })
//         }

//         const isUserAlreadyExists = await userModel.findOne({
//             $or: [{ username }, { email }]
//         })

//         if (isUserAlreadyExists) {
//             return res.status(409).json({
//                 message:
//                     isUserAlreadyExists.email === email
//                         ? "Email already exists"
//                         : "Username already exists"
//             })
//         }

//         const hash = crypto
//             .createHash('sha256')
//             .update(password.trim())
//             .digest('hex')

//         const user = await userModel.create({
//             username,
//             email,
//             bio,
//             profileImage,
//             password: hash
//         })

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         )

//         res.cookie("token", token, {
//             httpOnly: true
//         })

//         return res.status(201).json({
//             message: "User registered successfully",
//             user: {
//                 email: user.email,
//                 username: user.username,
//                 bio: user.bio,
//                 profileImage: user.profileImage
//             }
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error",
//             error: error.message
//         })
//     }
// }


// // ---------------- LOGIN ----------------

// async function loginController(req, res) {
//     try {
//         const { username, email, password } = req.body

//         if (!password || (!username && !email)) {
//             return res.status(400).json({
//                 message: "Username or email and password are required"
//             })
//         }

//         const query = username ? { username } : { email }

//         const user = await userModel.findOne(query)

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }

//         const hash = crypto
//             .createHash('sha256')
//             .update(password.trim())
//             .digest('hex')

//         if (hash !== user.password) {
//             return res.status(401).json({
//                 message: "Invalid password"
//             })
//         }

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         )

//         res.cookie("token", token, {
//             httpOnly: true
//         })

//         return res.status(200).json({
//             message: "User logged in successfully",
//             user: {
//                 username: user.username,
//                 email: user.email,
//                 bio: user.bio,
//                 profileImage: user.profileImage
//             }
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: "Server error",
//             error: error.message
//         })
//     }
// }

// module.exports = {
//     registerController,
//     loginController
// }
