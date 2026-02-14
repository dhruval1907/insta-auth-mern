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
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "user created successfully",
        user
    })

}

async function loginUser(req, res) {

    const { username, password, email } = req.body

    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    const isPasswordInvalid = await bcrypt.compare(password, user.password)

    if (!isPasswordInvalid) {
        return res.status(401).json({
            message: "unauthorized accesss"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)


    res.status(200)
        .json({
            message: "User loggedIn successfully.",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

}


module.exports = {
    registerUser, loginUser
}

// const userModel = require("../models/user.model")
// const jwt = require("jsonwebtoken")
// const cookie = require("cookie-parser")
// const bcrypt = require("bcryptjs")

// async function registerUser(req, res) {
//     const { username, email, bio, password, profileImage } = req.body
//     const isUserAlreadyExits = await userModel.findOne({
//         $or: [
//             { username },
//             { email }
//         ]
//     })
//     if (isUserAlreadyExits) {
//         return res.status(409).json({
//             message: "user already exits"
//         })
//     }
//     const hash = await bcrypt.hash(password, 10)
//     const user = await userModel.create({
//         email, username, password: hash, bio, profileImage
//     })
//     const token = jwt.sign({
//         id: user._id,
//     }, process.env.JWT_SECRET, { expiresIn: "1d" })
//     res.cookie("token", token)
//     res.status(201).json({
//         message: "user created successfully",
//         user
//     })
// }

// async function loginUser(req, res) {
//     const { username, password, email } = req.body

//     const user = await userModel.findOne({
//         $or: [
//             { username },
//             { email }
//         ]
//     })

//     if (!user) {
//         return res.status(404).json({
//             message: "user not found "
//         })
//     }

//     const isPasswordInvalid = await bcrypt.compare(password, user.password)

//     if (!isPasswordInvalid) {
//         return res.status(401).json({
//             message: "unauthorized access"
//         })
//     }

//     const token = jwt.sign({
//         id: user._id
//     }, process.env.JWT_SECRET, { expiresIn: "1d" })

//     res.cookie("token", token)


//     res.status(200)
//         .json({
//             message: "User loggedIn successfully.",
//             user: {
//                 username: user.username,
//                 email: user.email,
//                 bio: user.bio,
//                 profileImage: user.profileImage
//             }
//         })
// }


// module.exports = {
//     registerUser,
//     loginUser
// }

