const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized accesss"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'test',
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })

}

module.exports = {
    createPostController
}

// const postModel = require("../models/post.model")
// const ImageKit = require("@imagekit/nodejs")
// const { toFile } = require("@imagekit/nodejs")
// const jwt = require("jsonwebtoken")


// const imagekit = new ImageKit({
//     privateKey: process.env.IMAGEKIT_PRIVATEKEY
// })

// async function createPostController(req, res) {
//     console.log(req.body, req.file)

//     const token = req.cookies.token

//     if (!token) {
//         return res.status(401).json({
//             message: "unauthorized access"
//         })
//     }


//     let decoded = null

//     try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET)
//     } catch {
//         return res.status(401).json({
//             message: "unauthorized access"
//         })
//     }

//     const file = await imagekit.files.upload({
//         file: await toFile(Buffer.from(req.file.buffer), 'file'),
//         fileName: "Test",
//         folder: "instaclone-post"
//     })

//     const post = await postModel.create({
//         caption: req.body.caption,
//         imageUrl: file.url,
//         user: decoded.id
//     })

//     res.status(201).json({
//         message: "post created successfully",
//         post
//     })
// }

